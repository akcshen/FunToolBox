import storage from '@/utils/storage.js'
import { reactive } from 'vue'

const THEME_KEY = 'theme_mode'

export const themeState = reactive({
	mode: storage.get(THEME_KEY, 'light'),
	resolved: 'light'
})

const THEME_STYLES = {
	light: {
		navBg: '#FFFFFF',
		navText: 'black',
		tabColor: '#999999',
		tabSelected: '#2979ff',
		tabBg: '#FFFFFF'
	},
	dark: {
		navBg: '#2C2C2C',
		navText: 'white',
		tabColor: '#A0A0A0',
		tabSelected: '#4D9AFF',
		tabBg: '#1A1A1A'
	}
}

function getSystemTheme() {
	try {
		const info = uni.getSystemInfoSync()
		return info.theme === 'dark' ? 'dark' : 'light'
	} catch (e) {
		return 'light'
	}
}

function getResolvedTheme() {
	if (themeState.mode === 'auto') {
		return getSystemTheme()
	}
	return themeState.mode === 'dark' ? 'dark' : 'light'
}

export function getThemeMode() {
	return themeState.mode
}

export function getResolvedThemeMode() {
	return getResolvedTheme()
}

export function setThemeMode(mode) {
	themeState.mode = mode
	storage.set(THEME_KEY, mode)
	applyTheme()
}

export function applyTheme() {
	const resolved = getResolvedTheme()
	themeState.resolved = resolved
	const style = THEME_STYLES[resolved]

	// #ifdef APP-PLUS || H5 || MP
	uni.setNavigationBarColor({
		frontColor: style.navText,
		backgroundColor: style.navBg,
		animation: {
			duration: 200,
			timingFunc: 'easeIn'
		}
	})
	// #endif

	// #ifdef APP-PLUS || H5 || MP-WEIXIN
	try {
		uni.setTabBarStyle({
			color: style.tabColor,
			selectedColor: style.tabSelected,
			backgroundColor: style.tabBg,
			borderStyle: resolved === 'dark' ? 'white' : 'black'
		})
	} catch (e) {
		// tabBar 未就绪时忽略
	}
	// #endif

	return resolved
}

export function initTheme() {
	const saved = storage.get(THEME_KEY, 'light')
	themeState.mode = saved
	return applyTheme()
}

export function watchSystemTheme() {
	// #ifdef APP-PLUS || MP-WEIXIN
	if (typeof uni.onThemeChange === 'function') {
		uni.onThemeChange(() => {
			if (themeState.mode === 'auto') {
				applyTheme()
			}
		})
	}
	// #endif
}

export default {
	getThemeMode,
	getResolvedThemeMode,
	setThemeMode,
	applyTheme,
	initTheme,
	watchSystemTheme
}
