import storage from '@/utils/storage.js'

const TOKEN_KEY = 'token'
const USER_KEY = 'user_info'

export function getToken() {
	return storage.get(TOKEN_KEY, '')
}

export function setToken(token) {
	return storage.set(TOKEN_KEY, token || '')
}

export function removeToken() {
	return storage.remove(TOKEN_KEY)
}

export function getUserInfo() {
	return storage.get(USER_KEY, null)
}

export function setUserInfo(userInfo) {
	return storage.set(USER_KEY, userInfo)
}

export function removeUserInfo() {
	return storage.remove(USER_KEY)
}

export function getAuthHeader() {
	const token = getToken()
	if (!token) {
		return {}
	}
	return {
		Authorization: `Bearer ${token}`
	}
}

export function isLoggedIn() {
	return !!getToken()
}

export default {
	getToken,
	setToken,
	removeToken,
	getUserInfo,
	setUserInfo,
	removeUserInfo,
	getAuthHeader,
	isLoggedIn
}
