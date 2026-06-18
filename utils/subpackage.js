import storage from '@/utils/storage.js'
import config from '@/config/index.js'

const CACHE_META_KEY = 'upx_cache_meta'

function getCacheMeta() {
	return storage.get(CACHE_META_KEY, {})
}

function setCacheMeta(meta) {
	storage.set(CACHE_META_KEY, meta)
}

function getCachedPath(toolId) {
	const meta = getCacheMeta()
	return meta[toolId]?.path || ''
}

function saveCacheMeta(toolId, path) {
	const meta = getCacheMeta()
	meta[toolId] = {
		path,
		updatedAt: Date.now()
	}
	setCacheMeta(meta)
	return path
}

function navigateToPage(path, tool) {
	const url = path.includes('?')
		? `${path}&toolId=${tool.id}&toolName=${encodeURIComponent(tool.name)}`
		: `${path}?toolId=${tool.id}&toolName=${encodeURIComponent(tool.name)}`
	uni.navigateTo({ url })
}

function openSubPackageByPath(path, tool) {
	// #ifdef APP-PLUS
	if (typeof uni.openSubPackage === 'function') {
		return new Promise((resolve, reject) => {
			uni.openSubPackage({
				path,
				extraData: {
					toolId: tool.id,
					toolName: tool.name
				},
				success: resolve,
				fail: reject
			})
		})
	}
	// #endif
	return Promise.reject(new Error('openSubPackage not supported'))
}

function downloadRemoteUpx(tool) {
	return new Promise((resolve, reject) => {
		if (!tool.remoteUrl) {
			reject(new Error('remoteUrl is empty'))
			return
		}
		uni.showLoading({ title: '加载工具...', mask: true })
		uni.downloadFile({
			url: tool.remoteUrl,
			success: (res) => {
				if (res.statusCode !== 200) {
					reject(new Error(`download failed: ${res.statusCode}`))
					return
				}
				const savedPath = saveCacheMeta(tool.id, res.tempFilePath)
				resolve(savedPath)
			},
			fail: reject,
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}

async function openUpxTool(tool) {
	// #ifdef APP-PLUS
	try {
		if (tool.localPath) {
			await openSubPackageByPath(tool.localPath, tool)
			return
		}
		const cached = getCachedPath(tool.id)
		if (cached) {
			await openSubPackageByPath(cached, tool)
			return
		}
		if (tool.remoteUrl) {
			const path = await downloadRemoteUpx(tool)
			await openSubPackageByPath(path, tool)
			return
		}
	} catch (e) {
		console.warn('openSubPackage failed, fallback to page:', e)
	}
	// #endif

	if (tool.fallbackPage) {
		navigateToPage(tool.fallbackPage, tool)
		return
	}
	uni.showToast({ title: '暂不支持打开该工具', icon: 'none' })
}

export async function openTool(tool) {
	if (!tool) {
		return
	}
	if (tool.openType === 'webview' && tool.remoteUrl) {
		uni.navigateTo({
			url: `/subPackages/demo-tool/index?toolId=${tool.id}&mode=webview&url=${encodeURIComponent(tool.remoteUrl)}`
		})
		return
	}
	if (tool.openType === 'page' || !tool.localPath) {
		if (tool.fallbackPage) {
			navigateToPage(tool.fallbackPage, tool)
			return
		}
	}
	await openUpxTool(tool)
}

export function getUpxCacheDir() {
	return config.upxCacheDir
}

export default {
	openTool,
	getUpxCacheDir
}
