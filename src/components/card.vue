<template>
	<div>
		<el-card :body-style="{ padding: '0px' }">
			<div class="card-box">
				<div class="card-user">
					<div class="u-img"><img :src="this.$store.state.user.userInfo.headimg ? this.$store.state.user.userInfo.headimg : 'http://e.yhtjc.com/v2/public/img/default.png'"></div>
					<div class="u-text">
						<h4>{{this.$store.state.user.userInfo.name}}</h4>
						<p>{{this.$store.state.user.userInfo.department}}</p>
						<a href="javascript:void(0)">个人资料</a>
					</div>
				</div>
				<div class="card-msg">
					<ul>
						<li>
							<a href="javascript:void(0);"><i class="iconfont icon-e-mail"></i>我的消息</a>
						</li>
						<li class="divider"></li>
						<li>
							<a href="javascript:void(0);"><i class="iconfont icon-mimashezhi"></i>密码修改</a>
						</li>
						<li class="divider"></li>
						<li @click.stop="logOut">
							<a href="javascript:void(0);"><i class="iconfont icon-dengchu"></i>登出</a>
						</li>
					</ul>
				</div>
			
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
export default {
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	},
	created() {
		let self = this;
		document.body.addEventListener('click', (event) => {
			// console.log(2);
			if (!this.$el.contains(event.target)) {
				self.$emit('hideCard');
			}
		});

		
	},
	methods: {
		logOut() {
			this.$store.dispatch('logout');
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
a:link
    text-decoration: none;
.card-user
	width: 100%;
	height: 100px;
	padding: 10px 15px;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(120, 130, 140, 0.13);
	.u-img
		width: 80px;
		height: 80px;
		vertical-align: top;
		display: inline-block;
		border-radius: 5px;
		overflow: hidden;
		img
			width: 80px;
			height: 80px;
	.u-text
		display: inline-block; 
		padding-left: 10px;
		h4
			padding: 0;
			margin: 0;
			font-size: 18px;
			color: #2c2b2e;
			line-height: 22px;
			font-weight: 600;
		p
			padding: 0;
			margin: 0;
			font-size: 14px;
			color: #90a4ae !important;
			margin-bottom: 2px;
		a
			font-size: 12px;
			display: block;
			border-radius: 60px;
			background: #f62d51;
			border: 1px solid #f62d51;
			color: #fff;
			padding: 5px 10px;
			text-align: center;
.card-msg
	padding: 10px 0px;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(120, 130, 140, 0.13);
	ul
		margin: 0;
		padding: 0;
		li
			cursor: pointer;
			padding: 10px 15px;
			&:hover
				background: rgb(242,247,248);
				a
					color: #009efb;
			a
				color: #54667a;
				transform: all 0.5s;
				font-size: 16px;
			i
				padding-right: 5px;
		li.divider
		   	height: 1px;
		   	padding: 0;
		   	overflow: hidden;
		   	background-color: rgba(120, 130, 140, 0.13);
		   	margin: 9px 0;
</style>