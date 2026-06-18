<template>
	<view class="page-shell ftb-page" :class="themeClass">
		<slot />
	</view>
</template>

<script setup>
import { computed } from 'vue'
import { themeState } from '@/stores/theme.js'

const themeClass = computed(() => {
	return themeState.resolved === 'dark' ? 'theme-dark' : 'theme-light'
})
</script>

<style scoped>
.page-shell {
	padding-bottom: env(safe-area-inset-bottom);
}
</style>
