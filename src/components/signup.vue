<template>
    <div class="wapper" :class="{'wapper-response': response}">
        <div class="left-section" v-show="response ? false : true">
            <div class="rocket">
                <img src="../assets/image/rocket.png">
            </div>
            <div class="content">
                <p>宇宏泰</p>
                <p>since 1988 - 2018</p>
            </div>
            <div class="bg-container">
                <img src="../assets/image/bg.png">
            </div>
        </div>
        <div class="right-section">
            <div class="heading">
                <h4><span>账号注册</span><span class="p-valide"><a href="javascript:void(0)" @click="showQrcode = true">注意事项</a></span></h4>
                <el-form ref="form" status-icon :model="Form" :rules="ruleForm" class="el-form" >
                    <el-form-item prop="name" :style="{width: '100%'}">
                        <el-input v-model.trim="Form.phone" auto-complete="off" placeholder="手机号码" prefix-icon="iconfont icon-shoujihaoma"></el-input>
                    </el-form-item>
                    <el-form-item prop="name" :style="{width: '100%'}">
                        <el-input v-model.trim="Form.name" auto-complete="off" placeholder="姓名" prefix-icon="iconfont icon-zhanghao1"></el-input>
                    </el-form-item>
                    <el-form-item  prop="password" >
                        <el-input type="password" v-model.trim="Form.password" auto-complete="off" placeholder="密码" prefix-icon="iconfont icon-mima"></el-input>
                    </el-form-item>
                    <el-form-item  prop="checkpassword" >
                        <el-input type="password" v-model.trim="Form.checkpassword" auto-complete="off" placeholder="确认密码" prefix-icon="iconfont icon-mima"></el-input>
                    </el-form-item>
                    <!-- <el-form-item prop="phone" :style="{width: '100%'}">
                        <el-input v-model.trim="Form.phone" auto-complete="off" placeholder="手机号码" prefix-icon="iconfont icon-shoujihaoma"></el-input>
                    </el-form-item> -->
                    <el-form-item  prop="passwordwd" :style="{'text-align':'center', 'margin-top': '50px'}">
                        <el-button  type="primary" size="large" @click.native="signup" :style="{width: '100%',background: '#f26b3a', 'border-color': '#f26b3a'}">创建账户</el-button>
                    </el-form-item>
                    <div class="divider-div">
                        <div class="divider" data-label="or"></div>
                    </div>
                    <el-form-item  prop="passwordwd" :style="{'text-align':'center'}">
                        <el-button  type="primary" size="large" @click.native="login" :style="{width: '100%'}">立即登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="qrcode" v-show="showQrcode">
           <div class="img-box">
                <!-- <img src="../assets/image/qrcode_258.png">
                <p>
                    请长按二维码关注企业公众号后验证手机号码
                </p> -->
                <p class="box-title">使用流程</p>
                <div class="box-text">
                    <p>1、登录账号为手机号，请输入真实的手机号码</p>
                    <p>2、注册完成后联系管理员审核账号</p>
                    <p>3、下载企业微信并验证手机号码</p>
                </div>
                  
           </div>
            <div class="close">
               <i class="iconfont icon-guanbi" @click="showQrcode=false"></i>
           </div> 
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {

        var validatepassword = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.ruleForm.checkpassword !== '') {
                this.$refs.form.validateField('checkpassword');
              }
              callback();
            }
        };
        var validatepassword2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.Form.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
        };

        return {
            response: false,
            showQrcode: false,
            Form: {
                name:'',
                password: '',
                checkpassword: '',
                phone: '',
            },
            ruleForm: {

                name: [
                    {required: true, message: '姓名不能为空', trigger: 'blur'}
                ],

                password: [
                    { validator: validatepassword, trigger: 'blur' }
                ],

                checkpassword: [
                    { validator: validatepassword2, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        signup() {
            this.$refs.form.validate( (valid) => {
                if (valid) {
                    this.$store.dispatch('signup', this.Form).then( () => {

                        if (this.$store.state.user.userSignup.status == 'success') {

                            for (var i in this.Form) {
                                this.Form[i] = '';
                            }

                            this.$message.success('注册成功！请长按二维码关注公众号验证手机后等待管理员审核');
                            this.showQrcode = true;
                        } else {

                            this.$message.error('注册失败！'+ this.$store.state.user.userSignup.error);
                        }
                    })
                }
            });
        },

        initWidth() {

            if (document.body.clientWidth < 768) {
                this.response = true;
            } else {
                this.response = false;
            }
        },
        login() {
            this.$router.push('/login');
        },
        setNavigator() {
            var u = navigator.userAgent, app = navigator.appVersion;  
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器   
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端   

            console.log(u);
        }
    },

    created() {

        let self = this;

        this.initWidth();

        window.addEventListener('resize',self.initWidth);

        this.setNavigator();
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.wapper
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 580px;
    max-width: 784px;
    padding-left: 392px;
    border-radius: 3px;
    margin: 64px auto;
    background: #fff;
    transition: all 0.5s;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    .left-section
        position: absolute;
        left: 0;
        width: 392px;
        text-align: center;
        height: 100%;
        border-radius: 3px 0 0 3px;
        overflow: hidden;
        transition: all 0.5s;
        background: linear-gradient(0deg, #ed8370, #6c7a99);
        .rocket
            width: 150px;
            height: 150px;
            margin: 10px auto;
            animation-name: fadeIn;
            animation-timing-function: ease;
            animation-duration: 1.5s;
            animation-delay: 2s;
            animation-fill-mode: backwards;
            img
                width: 100%;
                height: 100%;
        .content
            margin-top: 40px;
            width: 100%;
            animation-name: fadeInUp;
            animation-timing-function: ease;
            animation-duration: 1.5s;
            p
                color: #fff;
                font-size: 20px;
        .bg-container
            width: 100%;
            position: absolute;
            bottom: -7px;
            padding: 0;
            animation-name: fadeInUp;
            animation-timing-function: ease;
            animation-duration: 1.5s;
            img
                width: 100%;
    .right-section
        transition: all 0.5s;
        padding: 32px;
        width: 392px;
        height: 100%;
        position: relative;
        h4
            font-size: 16px;
            position: relative;
            .p-valide
                // display: block;
                position: absolute;
                right: 0;
                bottom: 0;
                font-size: 12px;
                a 
                    color: #ef5b25;
                    text-decration: none;
    .qrcode
        transition: all 0.5s;
        padding: 32px;
        width: 392px;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        user-select: none;
        background: rgba(0,0,0,0.8);
        animation-name: bounceInDown;
        animation-duration: .7s;
        animation-timing-function: ease;
        .img-box   
            .box-title
                color: #fff;
                font-size: 16px;
                text-align: center;
            .box-text
                color: #fff;
                font-size: 14px;
            
        .close
            position: absolute;
            color: #fff;
            width: 64px;
            height: 64px;
            text-align: center;
            left: calc(50% - 32px);
            bottom: 0;
            margin: auto;
            i
                font-size: 32px; 
.wapper-response
    padding: 10px;
    width: 90%;
    max-height: 92%;
    overflow: hidden; 
    min-height: 100px !important;
    // position: a;
    margin: 6% auto;
    box-sizing: border-box;
    .right-section
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    .qrcode
        width: 100%;
        height: 100%;
        .img-box
            // transform: translateY(-30%);
    
</style>