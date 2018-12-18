<template>
	<div class="wapper">
		<div class="sub-menu">
			<div class="Submenu-list Card">
				<ul>
					<!-- <li class="Submenu-item " @click="changeRoute(item.front_path)" :class="{'Submenu-active': CurrentRoute == item.front_path}" v-for="(item, keys) in ForumMenu" :key ="keys">
						<div class="Button Submenu-item-link" >
							<i class="iconfont " :class="item.classname"></i>
							<span>{{item.name}}</span>
						</div>
					</li> -->
					<li class="Submenu-item "  :class="{'Submenu-active': CurrentRoute == item.front_path}" v-for="(item, keys) in department" :key ="keys">
						<div class="Button Submenu-item-link" >
							<!-- <i class="iconfont " :class="item.classname"></i> -->
							<span>{{item.name}}</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="Submenu-info Card">
				<!-- <div class="user-info">
					<div class="avator">
						<img :src="user.headimg != null ? user.headimg : 'http://e.yhtjc.com/v2/public/img/default.png' "/>
					</div>
					<div class="user-name">
						{{user.name}}
					</div>
				</div> -->
				<div class="Submenu-content-list">
					<div class="Submenu-content-item">
						<div class="label">
							发文
						</div>
						<div class="value">
							{{NotifyInfo.article}}
						</div>
					</div>
					<div class="Submenu-content-item">
						<div class="label">
							获赞
						</div>
						<div class="value">
							{{NotifyInfo.agree}}
						</div>
					</div>
					<div class="Submenu-content-item">
						<div class="label">
							回复
						</div>
						<div class="value">
							{{NotifyInfo.answer}}
						</div>
					</div>
				</div>
				<p>
					<el-badge is-dot  >
						<el-button type="primary" @click.native="MyMessage">我的动态</el-button>
					</el-badge>
				</p>
				<div class="hr"></div>
				<div class="Submenu-content-action">
					<el-menu class="forum-el-menu" mode="horizontal" @select="handleSelect">
						<el-submenu index="888">
							<template slot="title">我的工作台</template>
							<el-menu-item :index="item.front_path" @click="changeRoute(item.front_path)" :class="{'Submenu-active': CurrentRoute == item.front_path}" v-for="(item, keys) in ForumMenu" :key ="keys" class="forum-el-menu-item"><i class="iconfont " :class="item.classname"></i><span>{{item.name}}</span></el-menu-item>
						</el-submenu>
					</el-menu>
				</div>
			</div>
			
		</div>
		<div class="sub-main">
			<router-view />
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	beforeRouteUpdate(to, from, next) {
		this.CurrentRoute = to.path;

		if (to.path.indexOf('/app/forum/list/article') > -1) {
			this.CurrentRoute = '/app/forum/list/index';
		}

		next();
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.CurrentRoute = to.path;

			if (to.path.indexOf('/app/forum/list/article') > -1) {
				vm.CurrentRoute = '/app/forum/list/index';
			}
		});
	},

	props: {
		navsTakeUp: {
			type: Boolean
		}
	},
	data() {
		return {
			CurrentRoute: '',
			//前面100个字符
							
		}
	},
	methods: {
		init() {
			this.$emit('handleChangeNavbar', false);
			this.LoadMenu();
			this.LoadNotify();
			this.$store.dispatch('departmentList');
		},
		LoadMenu() {
			this.$store.dispatch('ForumMenu').then(() => {

			});
		},
		LoadNotify() {
			this.$store.dispatch('MyArticleNotify');
		},
		changeRoute($link) {
			this.$router.push($link);
		},
		MyMessage() {
			this.$router.push('/app/forum/message');
		},
		handleSelect() {}
	},
	created() {
		this.init();
	},
	computed: {
		ForumMenu: function() {
			return this.$store.state.user.ForumMenu;
		},
		user: function() {

			return this.$store.state.user.userInfo;
		},
		NotifyInfo: function() {
			return this.$store.state.user.MyArticleNotify;
		},
		department: function() {
			return this.$store.state.user.department_list;
		},
		
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wapper
	width: 100%;
	height: 100%;
	max-height: 100%;
	position: relative;
	display: flex;
	overflow-y: auto;
	overflow-x: hidden;
	.hr
		border-top: 1px solid #ebebeb;
		margin: 10px 0px;
	.Card
		background: #fff;
		overflow: hidden;
		border-radius: 2px;
		box-shadow: 0 1px 3px rgba(26,26,26,.3);
	.Button
		line-height: 1.4;
		display: block;
		text-align: center;
		padding: 5px 12px;
		font-size: 15px;
		border-radius: 3px;
		border: 1px solid #ebebeb;
	.sub-menu
		flex-basis: 250px;
		height: 100%;
		.Submenu-list
			position: relative;
			.Submenu-item
				display: flex;
				cursor: pointer;
				align-items: center;
				position: relative;
				overflow: hidden;
				&:hover
					background: rgb(247,247,247);
				.Button
					border: 0px;
					text-align: left;
					color: #8590a6;
					padding: 10px 20px;
				.iconfont
					font-size: 18px;
				span
					margin-left: 8px;
				&:not(:first-child)
					border-top: 1px solid #ebebeb;
			.Submenu-active
				// background: rgb(51,122,183);
				// .Button
				// 	color: #fff;
				// 	font-weight: 600;
				// &:hover
				// 	background: rgb(51,122,183);
				&::after
					content: '';
					height: 100%;
					position: absolute;
					border-left: 4px solid #3c8dbc;
		.Submenu-info
			margin-top: 30px;
			padding: 15px;
			.user-info
				.avator
					// padding: 15px;
					text-align:center;
					img
						width: 75px;
						height: 75px;
						border-radius: 50%;
				.user-name
					font-size: 18px;
					font-weight: 600;
					color: #1a1a1a;
					text-align: center;
			p
				text-align: center;
				margin-bottom: 0;
		.Submenu-content-list
			display: flex;
			align-items: center;
			padding-top: 12px;
			.Submenu-content-item
				flex: 1;
				text-align: center;
				.label
					color: #8590a6;
					font-size: 14px;
				.value
					color: #1a1a1a;
					font-size: 18px;
					font-weight: 600;
					cursor: pointer;
	.sub-main
		flex: 1;
		margin-left: 30px;
		height: auto;
		position: relative;
		max-width: 1200px;
		

</style>