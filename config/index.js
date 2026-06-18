const isDev = process.env.NODE_ENV === 'development'

export default {
	baseURL: isDev ? 'https://api.example.com' : 'https://api.example.com',
	storagePrefix: 'ftb_',
	upxCacheDir: 'static/cache',
	upxLocalDir: 'static/subpackages',
	versionName: '1.0.0',
	versionCode: 100
}
