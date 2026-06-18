import { get } from '@/utils/request.js'

export function fetchToolList() {
	return get('/api/tools/list')
}

export function fetchCategories() {
	return get('/api/tools/categories')
}

export default {
	fetchToolList,
	fetchCategories
}
