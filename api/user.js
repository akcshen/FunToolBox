import { post } from '@/utils/request.js'

export function login(data) {
	return post('/api/user/login', data)
}

export function getUserProfile() {
	return post('/api/user/profile')
}

export default {
	login,
	getUserProfile
}
