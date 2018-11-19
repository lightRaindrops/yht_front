<template>
	<div class="header-wapper">
		<div class="navbar">
			<div class="hamburger-container" >
				<svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" class="hamburger " @click="shrinkMenu" :class="{'is-active': shrink}">
					<path data-v-2fe8a492="" d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z" p-id="1692"></path> 
					<path data-v-2fe8a492="" d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z" p-id="1693"></path> 
					<path data-v-2fe8a492="" d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z" ></path>
				</svg>
				<el-breadcrumb separator="/" class="breadcrumb">
	              	<el-breadcrumb-item>{{this.$store.state.user.Breadcrumb[0]}}</el-breadcrumb-item>
	              	<el-breadcrumb-item>{{this.$store.state.user.Breadcrumb[1]}}</el-breadcrumb-item>
	            </el-breadcrumb>
			</div>
			<div class="right-menu">
				<ul>
					<li class="right-menu-item  ">
						<el-tooltip class="item" effect="dark" content="修改密码" placement="bottom">
					    	<i class="iconfont icon-mima"></i>
					    </el-tooltip>
					</li>
					<li class="right-menu-item  " @click="logout">
						<el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
					    	<i class="iconfont icon-tuichu"></i>
					    </el-tooltip>
					</li>
					<li class="right-menu-item avatar-container ">
						<el-tooltip class="item" effect="dark" content="个人资料" placement="bottom">
					    	<img :src="this.$store.state.user.userInfo.headimg ? this.$store.state.user.userInfo.headimg : 'https://e.yhtjc.com/v2/public/img/default.gif'">
					    </el-tooltip>
					</li>
				</ul>
				<!-- <div class="avatar-container right-menu-item">
					<img :src="this.$store.state.user.userInfo.headimg ? this.$store.state.user.userInfo.headimg : 'https://e.yhtjc.com/v2/public/img/default.gif'">
				</div> -->
			</div>
		</div>
		<div class="tags-view-container">
			<span class="tags-view-item" v-for="item in history" :class="{active: item.path == $route.path}" @click="GoPath(item.path)">
				{{item.name}}
				<span class="el-icon-close" @click.stop="removeHistory(item.path)"></span>
			</span>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		init() {
			this.$store.dispatch('getUserInfo');
		},
		GoPath(path) {
			if (this.$route.path != path) {
				this.$router.push(path);
			}
		},
		removeHistory(path) {
			this.$store.dispatch('RemoveHistory', path);
		},
		shrinkMenu() {
			this.$store.dispatch('ShrinkStatus');
		},
		logout() {
			this.$store.dispatch('logout');
		}
	},
	creted() {
		this.init();
	},
	computed: {
		history: function() {
			return this.$store.state.user.historyMenu;
		},
		shrink: function() {
			return this.$store.state.user.ShrinkStatus;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.header-wapper
	position: relative;
	width: 100%;
	height: 100%;
	background: #fff;
	.navbar
		height: 50px;
		display: flex;
		justify-content: space-between;
		line-height: 50px;
		.hamburger-container
			padding: 0 10px;
			height: 50px;
			display: flex;
			align-items: center;
			transition: all 0.5s;
			svg
				cursor: pointer;
				height: 20px;
				transform-origin: 50% 50%;
				width: 20px;
				transition: all 0.38s cubic-bezier(1,.09,.21,1.09);
				transform: rotate(0deg);
			.breadcrumb
				margin-left: 15px;
			.is-active
				transform: rotate(90deg);
		.right-menu
			ul
				display: flex;
				.right-menu-item
					margin: 0 8px;	
					.iconfont
						font-size: 24px;
						cursor: pointer;
				.avatar-container
					margin-right: 30px;
					margin-top: 5px;
					cursor: pointer;
					height: 50px;
					
					img
						width: 40px;
						height: 40px;
						border-radius: 10px;
	.tags-view-container
		height: 30px;
		width: 100%;
		position: relative;
		box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
		.tags-view-item
			background: #fff;
			border: 1px solid #d8dce5;
			font-size: 12px;
			color: #495060;
			height: 24px;
			display:inline-block;
			margin-left:5px;
			margin-top: 4px;
			padding: 0 8px;
			position: relative;	
			line-height: 24px;
			cursor: pointer;
			transition: all 0.5s;
			.el-icon-close
				border-radius: 50%;
				width: 16px;
				height: 16px;
				text-align: center;
				transform-origin: 100% 50%;
				transition: all .3s cubic-bezier(.645,.045,.355,1);
				vertical-align: 2px;
				margin-left: 16px;
				&::before
					content: "\E60F";
					display: inline-block;
					transform: scale(0.6);
					vertical-align: -3px;
				&:hover
					background: rgb(180,188,204);
					&::before
						color: #fff;
		.active
			background: #42b983;
			border: #42b983;
			color: #fff;
			font-weight: 600;
			&::before
				background: #fff;
				border-radius: 50%;
				content: "";
				display: inline-block;
				height: 8px;
				width: 8px;
				margin-left: 2px;
				margin-right: 2px;
				position: relative;
</style>