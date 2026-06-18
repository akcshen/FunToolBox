<script>
import { initTheme, watchSystemTheme } from '@/stores/theme.js'
import { useUserStore } from '@/stores/user.js'
import { checkUpdate } from '@/utils/update.js'

export default {
	onLaunch() {
		initTheme()
		watchSystemTheme()
		useUserStore().restore()
		checkUpdate(false)
	},
	onShow() {
		// 从后台恢复时重新应用主题（auto 模式）
		initTheme()
	}
}
</script>

<style lang="scss">
@import '@/uni_modules/uni-scss/index.scss';
@import '@/static/customicons.css';
@import '@/styles/theme.scss';

/* #ifndef APP-NVUE */
page {
	background-color: var(--ftb-bg);
	color: var(--ftb-text);
}
/* #endif */
</style>
