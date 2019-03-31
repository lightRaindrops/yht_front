<template>
	<div class="wapper">
		<div class="header" :style="{height: menuHeight * menuItemLength + 'px'}">
			<router-link class="menu-item" v-for="(item, keys) in menuItem" :to="item.path" :key="keys" >
				<div class="icon" :style="{'background-color': item.color}">
					<i class="iconfont" :class="item.icon"></i>
				</div>
				<div class="title">
					<span>{{item.name}}</span>
					<span>
						{{item.info}}
						<i class="iconfont icon-icon-jiantou-sanjiao-xia"></i>
					</span>
				</div>
			</router-link>
		</div>
		<div class="wapper-content" :style="{height: 'calc(100% - '+menuItemLength * menuHeight+'px)'}">
			<div class="list-container">
				<div class="title">
					<p>
						<i class="iconfont icon-redu"></i>
						最新动态
					</p>
				</div>
				<div class="list-item " v-for="item in list">
					<div class="user">
						<div class="headimg">
							<img :src="item.headimg == null ? 'http://e.yhtjc.com/v2/public/img/default.png' : item.headimg">
						</div>
						<div class="user-name">
							{{item.name}}
						</div>
					</div>
					<div class="list-title">
						{{item.action}}了一个客户资源
					</div>
					<div class="list-content">
						{{item.demand}}
					</div>		
					<div class="list-footer">
						{{item.date}}
					</div>	
				</div>
				<p v-if="list">暂时没有新的动态</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			active: 0,
			size: 50,
			menuHeight: 50, //默认高度
			menuItem: [
				{name: '最新资源','icon':  'icon-iconfontgonggao', color: '#5C6BC0', path: '/m/customer/newest'},
				// {name: '历史数据', 'icon': 'icon-lishi', color: '#2196f3',  path: 'history'},
				{name: '我的客户', 'icon': 'icon-kehu1', color: '#ff4081',  path: '/m/customer/mine'}
			],
			offset: 0,
			limit: 10
		}
	},
	methods: {
		navJump(path) {
			// console.log(path);
			this.$router.go(-1);
		},
		//初始化动态,客户数量
		init() {
			this.$store.dispatch('initCustomer',{offset: this.offset, limit: this.limit})
				.then(() => {
					// console.log()
				});
		}
	},
	created() {
		this.init();
	},
	computed: {
		list: function() {
			return this.$store.state.user.customerInit.data;
		},
		menuItemLength: function () {
			return this.menuItem.length;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.wapper
	width: 100%;
	height: 100%;
	position: relative;
	.header
		width: 100%;
		background: #fff;
		box-shadow: 0 1px 3px rgba(26,26,26,.1);
		justify-content: flex-start;
		padding: 5px 0px 5px 5px;
		// z-index: 10;
		margin-bottom: 10px;
		.menu-item
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 48px;
			div
				display: flex;
				flex: 1;
				height: 50px;
			.icon
				color: #fff;
				height: 30px;
				flex-grow: 0;//即使有多余的空间 也不放大
				flex-basis: 30px; // 固定宽度
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 8px;
			.title
				color: #646464;
				display: flex;
				margin-left: 10px;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #eee;
				span
					&:nth-child(2)
						padding-right: 10px;
						i
							color: #ddd;
			&:last-child
				.title
					border-bottom: 0px;
					
	.wapper-content
		// height: calc(100% - 100px);
		position: relative;
		width: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		.list-container
			width: 100%;
			border-top: 1px solid #ccc;
			position: absolute;
			top: 0;
			// bottom: 0;
			.title
				padding: 0px 8px;
				font-size: 12px;
				background: #fff;
				font-weight: bold;
				p
					margin: 0;
					padding: 10px 0px;
					border-bottom: 1px solid #ddd;
					i
						color: #ff5252;
			.list-item
				width: 100%;
				padding: 10px;
				margin-bottom: 10px;
				background: #fff;
				border-top: 1px solid #ddd;
				border-bottom: 1px solid #ddd;
				position: relative;
				.user
					width: 100%;
					display: flex;
					.headimg
						width: 30px;
						height: 30px;
						overflow: hidden;
						border-radius: 100%;
						img
							width: 100%;
							height: 100%;
					.user-name
						color: #999;
						font-size: 12px;
						margin-left: 10px;
						line-height: 30px;
				.list-title
					padding: 5px 0px;
					font-size: 14px;
					font-weight: bold;
				.list-footer
					text-align: left;
					color: #8590a6;
					font-size: 12px;
					padding-top: 5px;
				&:nth-child(2)
					margin-top: 0;
					border-top: none ;
					background: #fff;
			// .first
			// 	margin-top: 0;
			// 	border-top: none;
			// 	background: #fff;
</style>