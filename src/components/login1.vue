<template>
	<div class="login-wapper">
		<div class="login-info">
			<h2 class="login-info-title">业务系统</h2>
			<ul class="login-info-list">
				<li class="login-info-item">
					
				</li>
			</ul>
		</div>
		<div class="login-box">
			<div class="login-form">
				<h3 class="login-title">
					登录系统
				</h3>
		      	<el-form ref="form" status-icon :model="loginForm" :rules="rules" class="el-form" >
				  <el-form-item prop="phone">
				    <el-input v-model="loginForm.phone" auto-complete="off" placeholder="手机号码" prefix-icon="iconfont icon-shoujihaoma"></el-input>
				  </el-form-item>
				  <el-form-item  prop="passwd" >
				    <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" @keyup.native.enter="login" prefix-icon="iconfont icon-mima"></el-input>
				  </el-form-item>
				 <el-form-item  prop="passwd" :style="{'text-align':'center'}">
				    <el-button  type="primary" size="large" @click.native="login" :style="{width: '100%'}">登录</el-button>
				 </el-form-item>
				<!-- <div class="divider-div">
                    <div class="divider" data-label="or"></div>
                </div> -->
				 <el-form-item  prop="passwd" :style="{'text-align':'center'}">
				    <el-button  type="primary" size="large" @click.native="signup" :style="{width: '100%','margin-bottom': '20px',background: '#f26b3a', 'border-color': '#f26b3a'}">注册</el-button>
				 </el-form-item>
				</el-form>
		    </div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'vant';
export default {
	data() {
		return {
			loginForm: {
				phone: '',
				password: '',
			},
			rules: {
				phone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
					{ validator: (rule,value,callback) => {
						if (/^[\w|\.\+\-]{5,16}$/.test(value) == false) {
							callback(new Error("密码格式不正确"));
						} else{
			                callback();
			            }
					} }
				]
			}
		}
	},
	methods: {
		login() {
			
			this.$store.dispatch('login',this.loginForm).then(() => {

				if (this.$store.state.user.login.status == 'success') {

					this.$router.push('/app');
					

				} else {

					this.$message.error({message: this.$store.state.user.login.msg});

				}
			});
		},
		signup() {
			this.$router.push('/signup');
		}
	},
	created() {
		this.$loading().close();

		Toast.clear();
	},
	mounted() {
		this.$tool.setter('token', '');
		// console.log(this.$tool.getter('token'));
		if (this.$tool.getter('token') != '') {
			this.$router.push('/app');
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.login-wapper
	width: 100%;
	height: 100%;
	// background: #f2f2f2;
	position: relative;
	display: flex;
	align-items: center;
	background: rgba(0, 0, 0, 0.2);
	justify-content: space-around;
	&::after
		content: '';
		width: 100%;
		height: 100%;
		background: url('../assets/image/loginbg.png');
		position: absolute;
		background-size: cover;
		z-index: -999;
		top: 0;
		left: 0;
	.login-info
		color: #fff;
		margin-top: -426px;
		padding-left: 60px;
		.login-info-title
			line-height: 90px;
	.login-box
		position: relative;
		.login-form
			width: 380px;
			height: 100%;
			background: #fff;
			border-radius: 6px;
			position: relative;
			padding: 30px 50px 25px 50px;
			box-sizing: border-box;
			.login-title
				margin: 0 0 20px;
				text-align: center;
				color: #409eff;
				letter-spacing: 3px;
			.el-form
				width: 100%;
				// margin: 10px auto;
				// transform: translateY(-40%);
				.el-form-item__content
					text-align: center;
			
</style>