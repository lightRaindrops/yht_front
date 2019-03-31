<template>
	<div class="wapper">
		<transition name="fade">
			<router-view />
		</transition>
	</div>
</template>
<script type="text/javascript">

export default {
	
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.fade-enter-active,.fade-enter
	animation: fadeIn 0.5s ease ;
.fade-leave-active,.fade-leave-to
	animation: fadeOut 0.3s ease;
.wapper
	width: 100%;
	height: 100%;
	position: relative;
</style>