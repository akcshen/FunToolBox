import config from '@/config/index.js'

const prefix = config.storagePrefix

function buildKey(key) {
	return `${prefix}${key}`
}

export function get(key, defaultValue = null) {
	try {
		const value = uni.getStorageSync(buildKey(key))
		if (value === '' || value === undefined || value === null) {
			return defaultValue
		}
		return value
	} catch (e) {
		return defaultValue
	}
}

export function set(key, value) {
	try {
		uni.setStorageSync(buildKey(key), value)
		return true
	} catch (e) {
		return false
	}
}

export function remove(key) {
	try {
		uni.removeStorageSync(buildKey(key))
		return true
	} catch (e) {
		return false
	}
}

export function clearAll() {
	try {
		const info = uni.getStorageInfoSync()
		;(info.keys || []).forEach((key) => {
			if (key.startsWith(prefix)) {
				uni.removeStorageSync(key)
			}
		})
		return true
	} catch (e) {
		return false
	}
}

export default {
	get,
	set,
	remove,
	clearAll
}
