<template>
    <div class="userContainer">
        <div class="login_wrap">
            <div class="login">
                <div class="login_con">
                    <div class="main clearfix">
                        <div class="card-list" :class="CardClass">
                            <div class="swiper-container">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide item-card enterprise">
                                        <h4 class="card-title">业务系统</h4>
                                        <div class="line"></div>
                                        <p>提供客户、项目、流程管理服务</p>
                                        <p>打造一款属于自己的工具</p>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="item-card orange">
                                            <h4 class="card-title">项目管理</h4>
                                            <p>不在为各种项目信息焦头烂额</p>
                                            <div class="desc"></div>
                                            <div class="card-img-box">
                                                <img class="card-img" src="../assets/image/sw2.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-slide ">
                                        <div class="item-card blue">
                                            <h4 class="card-title">销售回款</h4>
                                            <p>实时掌握客户的状态</p>
                                            <div class="desc"></div>
                                            <div class="card-img-box">
                                                <img class="card-img" src="../assets/image/sw3.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 如果需要分页器 -->
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                        <div class="fill">
                            <h3 class="login-title">登录</h3>
                            <div class="login-center">
                                <mu-text-field
                                    label="用户名"
                                    v-model="LoginForm.phone"
                                    label-float
                                    full-width
                                    :help-text="UserText"
                                    :underline-color="UserUnderLineColor"
                                    @focus="InitPhoneInput">
                                </mu-text-field>
                                <mu-text-field
                                    type="password"
                                    label="密码"
                                    v-model="LoginForm.password"
                                    label-float
                                    full-width
                                    :help-text="PasswdText"
                                    :underline-color="PasswdUnderLineColor"
                                    @focus="InitPasswdInput"
                                    @keyup.native.enter="login">

                                </mu-text-field>
                                <mu-button color="primary" full-width style="margin-top: 32px;" large :color="'#2878ff'"
                                           @click="login"
                                           @keyup.native.enter="login">登录
                                </mu-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a href="http://yhtjc.com" class="home_link" target="_blank">
            <span class="home_text">
                <strong class="line_left"></strong><strong class="line_right"></strong>深圳市宇宏泰建材
            </span>
        </a>
    </div>
</template>

<script>
    import {Toast} from 'vant';
    import Swiper from 'swiper';

    export default {
        props: {},
        data() {
            return {
                LoginForm: {
                    phone: "",
                    password: ""
                },
                PhoneRules: [
                    {validate: (val) => !!val, message: '必须填写手机号码'},
                ],
                UserText: "",
                PasswdText: "",
                UserUnderLineColor: '',//'#ffa900' warning, '#f44336 danger
                PasswdUnderLineColor: "",
                SwIndex: 1,
            };
        },
        computed: {
            CardClass: function () {
                let classData = ['enterprise', 'orange', 'blue'], index = this.SwIndex;

                return classData[index - 1];
            }
        },
        created() {
            this.$loading().close();

            Toast.clear();
        },
        mounted() {
            this.$tool.setter('token', '');
            if (this.$tool.getter('token') != '') {
                this.$router.push('/app');
            }

            var self = this;

            this.$nextTick(() => {
                var S = new Swiper('.swiper-container', {
                    loop: true,
                    autoplay: true,
                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                    // // 如果需要前进后退按钮
                    // nextButton: '.swiper-button-next',
                    // prevButton: '.swiper-button-prev',
                    // // 如果需要滚动条
                    // scrollbar: '.swiper-scrollbar',

                    on: {
                        init: function () {

                        },
                        slideChange: function () {
                            self.SwIndex = this.activeIndex;

                        }
                    }
                });
            })
        },
        watch: {},
        methods: {
            login() {

                if (this.LoginForm.phone.length < 5) {
                    this.UserText = "用户名长度貌似不合法";
                    this.UserUnderLineColor = '#ffa900';
                    return false;
                }

                if (!this.LoginForm.password) {
                    this.PasswdText = "请输入密码再登录...";
                    this.PasswdUnderLineColor = '#ffa900';
                    return false;
                }
                this.$store.dispatch('login', this.LoginForm).then(() => {
                    if (this.$store.state.user.login.status == 'success') {
                        this.$router.push('/app');
                    } else {

                        this.$message.error({message: this.$store.state.user.login.msg});

                    }
                });
            },
            InitPhoneInput() {
                this.UserUnderLineColor = "";
                this.UserText = "";
            },
            InitPasswdInput() {
                this.PasswdUnderLineColor = "";
                this.PasswdText = "";
            }
        },
        components: {},
    };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
    .userContainer
        width: 100%;
        height: 100%;
        position: relative;
        background: url('../assets/image/login-background.png') left top / 100% no-repeat;

        .login_wrap
            width: 1000px;
            height: 560px;
            position: absolute;
            left: 50%;
            top: 50%;
            background: #fff;
            overflow: hidden;
            border-radius: 8px;
            transform: translate(-50%, -50%);
            box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05);

            .login
                width: 100%;
                height: 100%;
                overflow: hidden;

                .main
                    margin: 0;

                    .card-list
                        float: left;
                        width: 440px;
                        height: 560px;
                        left: 0;
                        top: 0;
                        /*color: #fff;*/
                        position: relative;

                        .swiper-container
                            width: 100%;
                            height: 100%;

                            .swiper-slide
                                width: 440px;

                            .item-card
                                position: relative;
                                padding-top: 60px;
                                height: 560px;
                                color: #fff;

                                .card-title
                                    padding-bottom: 10px;
                                    font-size: 24px;
                                    text-align: center;
                                    margin: 0;

                                p
                                    width: 294px;
                                    text-align: center;
                                    margin: 0 auto;
                                    line-height: 26px;

                                .desc
                                    padding-bottom: 30px

                                .card-img-box
                                    text-align: center;

                                    .card-img
                                        width: 345px;
                                        margin: 0 auto;

                            .item-card.enterprise
                                background: url('../assets/image/sw1.png');
                                background-size: 100% 100%;

                                .card-title
                                    font-size: 24px;
                                    text-align: center;
                                    padding-top: 140px;
                                    padding-bottom: 34px;
                                    margin: 0;

                                .line
                                    position: absolute;
                                    left: 50%;
                                    transform: translate(-50%, 0);
                                    top: 252px;
                                    width: 60px;
                                    height: 0;
                                    border-top: 1px solid white;
                                    opacity: 0.6;

                            .item-card.orange
                                background: linear-gradient(180deg, #fdc13a, #ec661d);

                            .item-card.blue
                                background: linear-gradient(180deg, #51b0ff, #2878ff);

                    .card-list.enterprise
                        box-shadow: 2px 0 10px 0px rgba(0, 0, 0, 0.7);

                    .card-list.orange
                        box-shadow: 2px 0 10px 0px rgba(244, 144, 42, 0.7);

                    .card-list.blue
                        box-shadow: 2px 0 10px 0px rgba(20, 110, 255, 0.7);

                    .fill
                        width: 540px;
                        float: right;
                        position: relative;
                        text-align: center;

                        .login-title
                            margin: 81px 0 60px 0;
                            font-size: 36px;
                            font-weight: bold;
                            line-height: 34px;
                            color: #396afe;

                        .login-center
                            width: 330px;
                            margin: 0 auto;

                .clearfix
                    &:after
                        content: "";
                        display: block;
                        clear: both;

        .home_link
            position: fixed;
            bottom: 28px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            font-size 14px;
            color #2878ff;

            .home_text
                position: relative;

                .line_left
                    width: 80px;
                    height: 20px;
                    position: absolute;
                    left: -86px;
                    top: 0;
                    background: url("../assets/image/line-left.png") left center no-repeat;

                .line_right
                    width: 80px;
                    height: 20px;
                    position: absolute;
                    right: -86px;
                    top: 0;
                    background: url("../assets/image/line-right.png") right center no-repeat;
</style>
