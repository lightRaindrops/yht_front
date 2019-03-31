<template>
	<div class="wapper">
		历史客户
    <div v-for></div>
	</div>
</template>
<script type="text/javascript">
export default {
	created() {
		window.history.pushState(null, null, document.URL);
	},
	/**keep-alive模式下 activated 会在每次激活中触发**/
	activated() {
		window.history.pushState(null, null, document.URL);
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus"  scoped="scoped">
.wapper
	width: 100%;
	height: 100%;
	position: relative;
</style>
