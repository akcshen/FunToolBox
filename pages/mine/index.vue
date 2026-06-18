<template>
	<page-shell>
		<view class="mine-page">
			<view class="mine-page__header ftb-card" @click="handleUserClick">
				<view class="mine-page__avatar">
					<uni-icons type="person-filled" color="#2979ff" :size="36" />
				</view>
				<view class="mine-page__user-info">
					<text class="mine-page__nickname">{{ displayName }}</text>
					<text class="mine-page__desc">{{ loginDesc }}</text>
				</view>
				<uni-icons type="right" color="#c0c4cc" :size="16" />
			</view>

			<view class="mine-page__section ftb-card">
				<uni-list :border="false">
					<uni-list-item title="主题模式" :right-text="themeLabel" show-arrow clickable @click="showThemePicker" />
					<uni-list-item title="检查更新" show-arrow clickable @click="handleCheckUpdate" />
					<uni-list-item title="关于趣用工具箱" :right-text="versionName" show-arrow clickable @click="showAbout" />
				</uni-list>
			</view>

			<view v-if="userStore.isLoggedIn()" class="mine-page__logout">
				<button class="mine-page__logout-btn" @click="handleLogout">退出登录</button>
			</view>
		</view>
	</page-shell>
</template>

<script setup>
import { computed } from 'vue'
import config from '@/config/index.js'
import { useUserStore } from '@/stores/user.js'
import { getThemeMode, setThemeMode } from '@/stores/theme.js'
import { checkUpdate } from '@/utils/update.js'

const userStore = useUserStore()
const versionName = config.versionName

const displayName = computed(() => {
	return userStore.state.userInfo?.nickname || '点击登录'
})

const loginDesc = computed(() => {
	return userStore.isLoggedIn() ? '已登录' : '登录后同步更多功能'
})

const themeLabel = computed(() => {
	const map = { light: '浅色', dark: '深色', auto: '跟随系统' }
	return map[getThemeMode()] || '浅色'
})

function handleUserClick() {
	if (!userStore.isLoggedIn()) {
		userStore.mockLogin()
		uni.showToast({ title: '登录成功', icon: 'success' })
	}
}

function showThemePicker() {
	uni.showActionSheet({
		itemList: ['浅色模式', '深色模式', '跟随系统'],
		success: (res) => {
			const modes = ['light', 'dark', 'auto']
			setThemeMode(modes[res.tapIndex])
		}
	})
}

function handleCheckUpdate() {
	checkUpdate(true)
}

function showAbout() {
	uni.showModal({
		title: '关于趣用工具箱',
		content: `趣用工具箱 v${versionName}\n综合多功能工具 App`,
		showCancel: false
	})
}

function handleLogout() {
	uni.showModal({
		title: '提示',
		content: '确定退出登录？',
		success: (res) => {
			if (res.confirm) {
				userStore.logout()
				uni.showToast({ title: '已退出', icon: 'none' })
			}
		}
	})
}
</script>

<style scoped>
.mine-page {
	padding: 24rpx;
}

.mine-page__header {
	display: flex;
	align-items: center;
	padding: 32rpx 24rpx;
	margin-bottom: 24rpx;
}

.mine-page__avatar {
	width: 96rpx;
	height: 96rpx;
	border-radius: 50%;
	background-color: var(--ftb-bg);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 24rpx;
	flex-shrink: 0;
}

.mine-page__user-info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.mine-page__nickname {
	font-size: 32rpx;
	font-weight: 600;
	color: var(--ftb-text);
	margin-bottom: 8rpx;
}

.mine-page__desc {
	font-size: 24rpx;
	color: var(--ftb-text-secondary);
}

.mine-page__section {
	overflow: hidden;
	margin-bottom: 24rpx;
}

.mine-page__logout {
	padding: 24rpx 0;
}

.mine-page__logout-btn {
	background-color: var(--ftb-card);
	color: #e43d33;
	border: none;
	border-radius: 16rpx;
	font-size: 30rpx;
}

.mine-page__logout-btn::after {
	border: none;
}
</style>
