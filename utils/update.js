import config from '@/config/index.js'
import { get } from '@/utils/request.js'

function compareVersion(v1, v2) {
	const a = String(v1).split('.').map(Number)
	const b = String(v2).split('.').map(Number)
	const len = Math.max(a.length, b.length)
	for (let i = 0; i < len; i++) {
		const x = a[i] || 0
		const y = b[i] || 0
		if (x > y) return 1
		if (x < y) return -1
	}
	return 0
}

function showUpdateModal(updateInfo) {
	const content = updateInfo.description || `发现新版本 ${updateInfo.versionName}，是否更新？`
	uni.showModal({
		title: '版本更新',
		content,
		confirmText: '立即更新',
		success: (res) => {
			if (res.confirm && updateInfo.downloadUrl) {
				// #ifdef APP-PLUS
				plus.runtime.openURL(updateInfo.downloadUrl)
				// #endif
				// #ifndef APP-PLUS
				uni.setClipboardData({
					data: updateInfo.downloadUrl,
					success: () => {
						uni.showToast({ title: '下载链接已复制', icon: 'none' })
					}
				})
				// #endif
			}
		}
	})
}

function checkMiniProgramUpdate(manual) {
	// #ifdef MP-WEIXIN
	if (typeof uni.getUpdateManager !== 'function') {
		if (manual) {
			uni.showToast({ title: '当前已是最新版本', icon: 'none' })
		}
		return
	}
	const updateManager = uni.getUpdateManager()
	updateManager.onCheckForUpdate((res) => {
		if (manual && !res.hasUpdate) {
			uni.showToast({ title: '当前已是最新版本', icon: 'none' })
		}
	})
	updateManager.onUpdateReady(() => {
		uni.showModal({
			title: '更新提示',
			content: '新版本已准备好，是否重启应用？',
			success: (res) => {
				if (res.confirm) {
					updateManager.applyUpdate()
				}
			}
		})
	})
	// #endif

	// #ifndef MP-WEIXIN
	if (manual) {
		uni.showToast({ title: '当前已是最新版本', icon: 'none' })
	}
	// #endif
}

function checkAppUpdate(manual) {
	// #ifdef APP-PLUS
	plus.runtime.getProperty(plus.runtime.appid, (info) => {
		const localVersion = info.version || config.versionName
		get('/api/app/version', { platform: uni.getSystemInfoSync().platform }, {
			showLoading: manual,
			showError: manual
		})
			.then((data) => {
				if (data && compareVersion(data.versionName, localVersion) > 0) {
					showUpdateModal(data)
				} else if (manual) {
					uni.showToast({ title: '当前已是最新版本', icon: 'none' })
				}
			})
			.catch(() => {
				if (manual) {
					uni.showToast({ title: '检查更新失败', icon: 'none' })
				}
			})
	})
	// #endif

	// #ifndef APP-PLUS
	checkMiniProgramUpdate(manual)
	// #endif
}

export function checkUpdate(manual = false) {
	try {
		checkAppUpdate(manual)
	} catch (e) {
		if (manual) {
			uni.showToast({ title: '检查更新失败', icon: 'none' })
		}
	}
}

export default {
	checkUpdate
}
