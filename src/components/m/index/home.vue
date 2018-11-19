<template>
	<div class="wapper">
		<!-- <div class="title">
			<span class="text">
				 我
			</span>
		</div> -->
		<div class="header">
			<div class="headimg">
				<img src='http://e.yhtjc.com/v2/public/img/default.png'>
			</div>
			<div class="info">
				<div class="name">隔壁老王</div>
				<div class="department">网络部</div>
			</div>
		</div>
		<div class="menu">
			<div><span><i class="iconfont icon-tongji"></i></span><span>客户统计</span></div>
			<div><span><i class="iconfont icon-baobiaohuizongdaochu"></i></span><span>项目汇总</span></div>
			<div><span><i class="iconfont icon-qunfengtouxiangxuanze"></i></span><span>更换头像</span></div>
			<div>
				<router-link to="/m/index/resetpass" >
					<span><i class="iconfont icon-mima1"></i></span><span>修改密码</span>
				</router-link>
			</div>
		</div>
		<div class="other">
			<div class="sub-title">其他</div>
			<div class="content">
				<menu-item></menu-item>
			</div>
			
		</div>
	</div>
</template>
<script type="text/javascript">

export default {
	data() {
		return {
			menuHeight: 50, //默认高度
			menuItem: [
				{name: '我的文章','icon':  'icon-svgwrite', color: '#ff5722', path: 'public'},
				{name: '我的提醒', 'icon': 'icon-ai45', color: '#0091ea',  path: 'history'},
				{name: '我的获赞', 'icon': 'icon-tixing', color: '#00c853',  path: 'my'},
				{name: '我的报销', 'icon': 'icon-qiandai', color: '#ffc107',  path: 'my'}
			],
			popShow: false,
		}
	},
	
	components: {
		'menu-item': () => import('./other.vue')
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.wapper
	width: 100%;
	height:100%;
	position: relative;
	.title
		position:relative;
		width: 100%;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 15px;
		.text
			font-size: 20px;
			font-weight: 600;
			color: rgb(133,144,166);
	.header
		position: relative;
		padding: 15px;
		display: flex;
		background: #fff;
		.headimg
			width: 75px;
			height: 75px;
			overflow: hidden;
			border-radius: 100%;
			img
				width: 100%;
				height: 100%;
		.info
			flex: 1;
			padding: 10px 15px;
			height: 100%;
			div:first-child
				margin-bottom: 10px;
	.menu
		display: flex;
		height: 80px;
		justify-content: center;
		position: relative;
		div
			flex: 1;
			text-align: center;
			display:block;
			background: #fff;
			position:relative;
			width: 100%;
			height: 100%;
			a
				color: rgba(0,0,0,.87)
			span
				display: block;
				width: 100%;
				i
					font-size: 30px;
				&:first-child
					height: 60%;
					display: flex;
					justify-content: center;
					align-items: center;
				// font-size: 15px;
			&:not(:first-child)::after
				content: '';
				width: 1px;
				display: block;
				height: 100%;
				right: 0;
				left: 0;
				overflow:hidden;
				position: absolute;
				border-left: 1px solid #ddd;
				top: 1px;
				bottom: 0;
				transform: scaleX(0.5);
				transform-origin: 0 0;
		&::after
			content: '';
			width: 100%;
			height: 1px;
			overflow:hidden;
			position: absolute;
			border-top: 1px solid #ddd;
			top: 1px;
			bottom: 0;
			transform: scaleY(0.5);
			transform-origin: 0 0;
		&::before
			content: '';
			width: 1px;
			height: 100%;
			overflow:hidden;
			position: absolute;
			border-top: 1px solid #ddd;
			top: 100%;
			bottom: -1px;
			transform: scaleY(0.5);
			transform-origin: 0 0;
	.other
		width: 100%;
		position: relative;
		.sub-title
			padding: 15px 17px;
		.content
			width: 100%;
			background: #fff;
			position: relative;
			
						
					
</style>