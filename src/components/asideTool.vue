<template>
	<div class="aside-tool" :style="{width:width}">
		<div class="header" :class="{'shrink-head': this.$store.state.user.ShrinkStatus}">
			<div class="title logo">
				<img src="../assets/image/logo.png" v-show="!this.$store.state.user.ShrinkStatus">
				<img src="../assets/image/logo-small.png" v-show="this.$store.state.user.ShrinkStatus">
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	
	export default {
		props: {
			navTakeUp: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: '250px',
			}
		},
		data() {
			return {
				searchValue: '',
			}
		},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.aside-tool
	transition: all 0.5s;
	display: block;
	position: relative;
	box-sizing: border-box;
	background: #fff;
	.header
		color: rgb(82,92,101);
		height: 70px;
		background: #fff;
		p
			padding: 0;
			margin: 0;
			font-size: 18px;
			line-height: 70px;
			font-weight: 600;
		.logo
			transition: all 0.5s;
			width: 100%;
			height: 70px;
			padding: 5px 20px;
			box-sizing: border-box;
			background: #222d32;
			img
				transition: all 0.5s;
				width: 120px;
				height: 60px;
	.shrink-head
		p
			font-size: 13px;
		.logo
			padding: 4px;
			transition: all 0.5s;
			box-sizing: border-box;
			img
				transition: all 0.5s cubic-bezier(1,.09,.21,1.09);
				width: 60px;
				height: 60px;
	
</style>