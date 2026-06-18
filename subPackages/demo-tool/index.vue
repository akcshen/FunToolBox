<template>
	<page-shell>
		<view class="demo-tool">
		<view class="demo-tool__card ftb-card">
			<view class="demo-tool__icon">
				<uni-icons type="gear" color="#2979ff" :size="48" />
			</view>
			<text class="demo-tool__title">{{ toolName }}</text>
			<text class="demo-tool__desc">工具子包演示页</text>
			<text class="demo-tool__hint">正式环境将通过 uni.openSubPackage 打开本地或远程 upx 子包</text>
			<text class="demo-tool__id">ID: {{ toolId }}</text>
		</view>
		<button class="demo-tool__back" @click="goBack">返回</button>
		</view>
	</page-shell>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const toolId = ref('')
const toolName = ref('工具演示')

onLoad((query) => {
	toolId.value = query.toolId || 'demo'
	toolName.value = query.toolName ? decodeURIComponent(query.toolName) : '工具演示'
})

function goBack() {
	uni.navigateBack()
}
</script>

<style scoped>
.demo-tool {
	padding: 48rpx 32rpx;
	box-sizing: border-box;
}

.demo-tool__card {
	padding: 48rpx 32rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.demo-tool__icon {
	margin-bottom: 24rpx;
}

.demo-tool__title {
	font-size: 36rpx;
	font-weight: 600;
	color: var(--ftb-text);
	margin-bottom: 16rpx;
}

.demo-tool__desc {
	font-size: 28rpx;
	color: var(--ftb-text-secondary);
	margin-bottom: 24rpx;
}

.demo-tool__hint {
	font-size: 24rpx;
	color: var(--ftb-text-secondary);
	line-height: 1.6;
	margin-bottom: 16rpx;
}

.demo-tool__id {
	font-size: 22rpx;
	color: var(--ftb-text-secondary);
}

.demo-tool__back {
	margin-top: 48rpx;
	background-color: #2979ff;
	color: #fff;
	border-radius: 16rpx;
	font-size: 30rpx;
}

.demo-tool__back::after {
	border: none;
}
</style>
