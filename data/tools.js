export const categories = [
	{ id: 'daily', name: '日常', icon: 'home' },
	{ id: 'efficiency', name: '效率', icon: 'calendar' },
	{ id: 'fun', name: '趣味', icon: 'star' }
]

const fallbackPage = '/subPackages/demo-tool/index'

export const tools = [
	{
		id: 'qr-code',
		name: '二维码',
		icon: 'scan',
		iconColor: '#2979ff',
		category: 'daily',
		featured: true,
		openType: 'page',
		localPath: '',
		remoteUrl: '',
		fallbackPage
	},
	{
		id: 'calculator',
		name: '计算器',
		icon: 'plusempty',
		iconColor: '#18bc37',
		category: 'daily',
		featured: true,
		openType: 'page',
		localPath: '',
		remoteUrl: '',
		fallbackPage
	},
	{
		id: 'unit-convert',
		name: '单位换算',
		icon: 'loop',
		iconColor: '#f3a73f',
		category: 'daily',
		featured: true,
		openType: 'page',
		localPath: '',
		remoteUrl: '',
		fallbackPage
	},
	{
		id: 'memo',
		name: '备忘录',
		icon: 'compose',
		iconColor: '#2979ff',
		category: 'efficiency',
		featured: true,
		openType: 'page',
		localPath: '',
		remoteUrl: '',
		fallbackPage
	},
	{
		id: 'countdown',
		name: '倒计时',
		icon: 'calendar',
		iconColor: '#e43d33',
		category: 'efficiency',
		featured: true,
		openType: 'page',
		localPath: '',
		remoteUrl: '',
		fallbackPage
	},
	{
		id: 'random',
		name: '随机数',
		icon: 'refresh',
		iconColor: '#8f939c',
		category: 'fun',
		featured: true,
		openType: 'page',
		localPath: '',
		remoteUrl: '',
		fallbackPage
	},
	{
		id: 'color-picker',
		name: '颜色拾取',
		icon: 'color',
		iconColor: '#9c27b0',
		category: 'fun',
		featured: true,
		openType: 'page',
		localPath: '',
		remoteUrl: '',
		fallbackPage
	},
	{
		id: 'timestamp',
		name: '时间戳',
		icon: 'calendar-filled',
		iconColor: '#00bcd4',
		category: 'efficiency',
		featured: false,
		openType: 'page',
		localPath: '',
		remoteUrl: '',
		fallbackPage
	}
]

export function getFeaturedTools() {
	return tools.filter((item) => item.featured)
}

export function getToolsByCategory(categoryId) {
	return tools.filter((item) => item.category === categoryId)
}

export function getToolById(id) {
	return tools.find((item) => item.id === id)
}

export default {
	categories,
	tools,
	getFeaturedTools,
	getToolsByCategory,
	getToolById
}
