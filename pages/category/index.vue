<template>
	<page-shell>
		<view class="category-page">
			<view class="category-page__tabs">
				<uni-segmented-control
					:current="currentIndex"
					:values="categoryNames"
					style-type="text"
					active-color="#2979ff"
					@click-item="onTabChange"
				/>
			</view>

			<view class="category-page__list ftb-card">
				<uni-list :border="false">
					<uni-list-item
						v-for="tool in currentTools"
						:key="tool.id"
						:title="tool.name"
						:note="getCategoryName(tool.category)"
						:show-extra-icon="true"
						:extra-icon="{ type: tool.icon, color: tool.iconColor, size: 22 }"
						show-arrow
						clickable
						@click="handleOpenTool(tool)"
					/>
				</uni-list>
				<view v-if="!currentTools.length" class="category-page__empty">暂无工具</view>
			</view>
		</view>
	</page-shell>
</template>

<script setup>
import { ref, computed } from 'vue'
import { categories, getToolsByCategory } from '@/data/tools.js'
import { openTool } from '@/utils/subpackage.js'

const currentIndex = ref(0)
const categoryNames = categories.map((item) => item.name)

const currentTools = computed(() => {
	const category = categories[currentIndex.value]
	return category ? getToolsByCategory(category.id) : []
})

function getCategoryName(categoryId) {
	return categories.find((item) => item.id === categoryId)?.name || ''
}

function onTabChange(e) {
	currentIndex.value = e.currentIndex
}

function handleOpenTool(tool) {
	openTool(tool)
}
</script>

<style scoped>
.category-page {
	padding: 24rpx;
}

.category-page__tabs {
	margin-bottom: 24rpx;
}

.category-page__list {
	overflow: hidden;
}

.category-page__empty {
	padding: 80rpx 0;
	text-align: center;
	color: var(--ftb-text-secondary);
	font-size: 28rpx;
}
</style>
