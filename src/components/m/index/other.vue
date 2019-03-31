<template>
	<div class="content">
		<div class="item" v-for="item in menuItem">
			<div class="icon" :style="{'background-color': item.color}"><i class="iconfont" :class="item.icon"></i></div>
			<div class="item-name">{{item.name}}<span><i class="iconfont icon-icon-jiantou-sanjiao-xia"></i></span></div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			menuItem: [
				{name: '我的文章','icon':  'icon-svgwrite', color: '#ff5722', path: 'public'},
				{name: '我的提醒', 'icon': 'icon-ai45', color: '#0091ea',  path: 'history'},
				{name: '我的获赞', 'icon': 'icon-tixing', color: '#00c853',  path: 'my'},
				{name: '我的报销', 'icon': 'icon-qiandai', color: '#ffc107',  path: 'my'}
			],
		}
	},
	created() {
		console.log('hello world');
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.content
	width: 100%;
	background: #fff;
	position: relative;
	.item
		display: flex;
		height: 50px;
		padding: 0px 15px;
		.icon
			height: 30px;
			color: #fff;
			flex-grow: 0;
			flex-basis: 30px;
			border-radius: 8px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: red;
			margin-top: 10px;
		.item-name
			color: #646464;
			display: flex;
			flex: 1;
			margin-left: 10px;
			justify-content: space-between;
			align-items: center;
			position: relative;
			// border-bottom: 1px solid #eee;
		&:not(:last-child)
			.item-name::before
				content: '';
				width: 100%;
				height: 100%;
				overflow:hidden;
				position: absolute;
				border-top: 1px solid #ddd;
				top: 100%;
				bottom: -1px;
				transform: scaleY(0.5);
				transform-origin: 0 0;
</style>