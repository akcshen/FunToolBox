import { reactive } from 'vue'
import auth from '@/utils/auth.js'

const state = reactive({
	token: auth.getToken(),
	userInfo: auth.getUserInfo()
})

export function useUserStore() {
	function login(token, userInfo = null) {
		state.token = token
		state.userInfo = userInfo
		auth.setToken(token)
		if (userInfo) {
			auth.setUserInfo(userInfo)
		}
	}

	function logout() {
		state.token = ''
		state.userInfo = null
		auth.removeToken()
		auth.removeUserInfo()
	}

	function restore() {
		state.token = auth.getToken()
		state.userInfo = auth.getUserInfo()
	}

	function mockLogin() {
		login('mock_token_' + Date.now(), {
			nickname: '趣用用户',
			avatar: ''
		})
	}

	return {
		state,
		login,
		logout,
		restore,
		mockLogin,
		isLoggedIn: () => !!state.token
	}
}

export default useUserStore
