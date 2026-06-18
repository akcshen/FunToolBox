<template>
	<view class="tool-grid-item" @click="handleClick">
		<view class="tool-grid-item__icon-wrap">
			<uni-icons :type="tool.icon" :color="tool.iconColor || '#2979ff'" :size="28" />
		</view>
		<text class="tool-grid-item__name">{{ tool.name }}</text>
	</view>
</template>

<script setup>
const props = defineProps({
	tool: {
		type: Object,
		required: true
	}
})

const emit = defineEmits(['click'])

function handleClick() {
	emit('click', props.tool)
}
</script>

<style scoped>
.tool-grid-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 24rpx 8rpx;
	box-sizing: border-box;
}

.tool-grid-item__icon-wrap {
	width: 96rpx;
	height: 96rpx;
	border-radius: 24rpx;
	background-color: var(--ftb-card);
	box-shadow: 0 4rpx 16rpx var(--ftb-shadow);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 16rpx;
}

.tool-grid-item__name {
	font-size: 24rpx;
	color: var(--ftb-text);
	text-align: center;
	line-height: 1.4;
}
</style>
