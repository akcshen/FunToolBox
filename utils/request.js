import config from '@/config/index.js'
import auth from '@/utils/auth.js'
import { useUserStore } from '@/stores/user.js'

function handleUnauthorized() {
	const { logout } = useUserStore()
	logout()
	uni.showToast({
		title: '登录已过期',
		icon: 'none'
	})
}

export function request(options = {}) {
	const {
		url,
		method = 'GET',
		data = {},
		header = {},
		showLoading = false,
		loadingText = '加载中...',
		showError = true
	} = options

	if (!url) {
		return Promise.reject(new Error('request url is required'))
	}

	if (showLoading) {
		uni.showLoading({ title: loadingText, mask: true })
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: url.startsWith('http') ? url : `${config.baseURL}${url}`,
			method,
			data,
			header: {
				'Content-Type': 'application/json',
				...auth.getAuthHeader(),
				...header
			},
			success: (res) => {
				const { statusCode, data: body } = res
				if (statusCode === 401) {
					handleUnauthorized()
					reject(new Error('Unauthorized'))
					return
				}
				if (statusCode >= 200 && statusCode < 300) {
					if (body && typeof body === 'object' && 'code' in body) {
						if (body.code === 0 || body.code === 200) {
							resolve(body.data !== undefined ? body.data : body)
						} else if (body.code === 401) {
							handleUnauthorized()
							reject(new Error(body.message || 'Unauthorized'))
						} else {
							const msg = body.message || '请求失败'
							if (showError) {
								uni.showToast({ title: msg, icon: 'none' })
							}
							reject(new Error(msg))
						}
					} else {
						resolve(body)
					}
				} else {
					const msg = `请求失败(${statusCode})`
					if (showError) {
						uni.showToast({ title: msg, icon: 'none' })
					}
					reject(new Error(msg))
				}
			},
			fail: (err) => {
				if (showError) {
					uni.showToast({ title: '网络异常', icon: 'none' })
				}
				reject(err)
			},
			complete: () => {
				if (showLoading) {
					uni.hideLoading()
				}
			}
		})
	})
}

export function get(url, data, options = {}) {
	return request({ url, method: 'GET', data, ...options })
}

export function post(url, data, options = {}) {
	return request({ url, method: 'POST', data, ...options })
}

export default request
