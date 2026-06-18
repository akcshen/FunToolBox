<template>
	<page-shell>
		<view class="home-page">
			<view class="home-page__search">
				<uni-search-bar
					v-model="keyword"
					placeholder="搜索工具"
					cancel-button="none"
					@confirm="onSearch"
				/>
			</view>

			<view class="home-page__section ftb-card">
				<view class="home-page__section-title">常用工具</view>
				<uni-grid :column="4" :show-border="false" :square="false">
					<uni-grid-item v-for="tool in filteredTools" :key="tool.id">
						<tool-grid-item :tool="tool" @click="handleOpenTool" />
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
	</page-shell>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getFeaturedTools } from '@/data/tools.js'
import { openTool } from '@/utils/subpackage.js'

const keyword = ref('')
const toolList = getFeaturedTools()

const filteredTools = computed(() => {
	if (!keyword.value.trim()) {
		return toolList
	}
	const key = keyword.value.trim().toLowerCase()
	return toolList.filter((item) => item.name.toLowerCase().includes(key))
})

function handleOpenTool(tool) {
	openTool(tool)
}

function onSearch() {
	// 搜索由 computed 实时过滤
}
</script>

<style scoped>
.home-page {
	padding: 24rpx;
}

.home-page__search {
	margin-bottom: 24rpx;
}

.home-page__section {
	padding: 24rpx 16rpx 8rpx;
}

.home-page__section-title {
	font-size: 30rpx;
	font-weight: 600;
	color: var(--ftb-text);
	margin-bottom: 16rpx;
	padding: 0 8rpx;
}
</style>
