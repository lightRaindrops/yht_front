<template>
    <div class="wapper">
        <div class="menu-container">
            <div class="sub-menu">
                <div class="Submenu-list Card">
                    <ul>
                        <li class="Submenu-item "
                            v-for="(item, keys) in ForumModule"
                            :key="keys" @click="JumpModule(item.id,item.attr)"
                            :class="{'Submenu-active': CurrentModuleId == item.id}"
                            :style="{'animation-delay': keys/10+'s'}"
                        >
                            <mu-ripple>
                                <div class="Button Submenu-item-link">
                                    <span>{{item.name}}</span>
                                </div>
                            </mu-ripple>
                        </li>
                    </ul>
                </div>
                <div class="Submenu-info Card">
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
                        <el-badge is-dot>
                            <el-button type="primary" @click.native="MyMessage">我的动态</el-button>
                        </el-badge>
                    </p>
                    <div class="hr"></div>
                    <div class="Submenu-content-action">
                        <el-menu class="forum-el-menu" mode="horizontal" @select="handleSelect">
                            <el-submenu index="888">
                                <template slot="title">我的工作台</template>
                                <el-menu-item :index="item.front_path" @click="changeRoute(item.front_path)"
                                              v-for="(item, keys) in ForumMenu" :key="keys" class="forum-el-menu-item"><i
                                        class="iconfont " :class="item.classname"></i><span>{{item.name}}</span>
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </div>
                </div>
            </div>
        </div>
        <div class="sub-main">
            <!--<transition :name="transitionName" mode="out-in">-->
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" :key="routeKey"></router-view>
            </keep-alive>
            <!--</transition>-->
            <!--<transition :name="transitionName" mode="out-in">-->
            <router-view v-if="!$route.meta.keepAlive" :key="routeKey"></router-view>
            <!--</transition>-->
        </div>
    </div>
</template>
<script type="text/javascript">
	export default {

		beforeRouteEnter(to, from, next) {
			next((vm) => {
				vm.CurrentModuleId = to.params.id || 0;
			});
		},


		data() {
			return {
				CurrentModuleId: 0,
				CurrentModuleAttr: 'public',
				//前面100个字符
				transitionName: "fade"
			}
		},
		methods: {
			init() {
				this.$emit('handleChangeNavbar', false);
				this.LoadMenu();
				this.LoadNotify();
				this.$store.dispatch('GetForumModule');
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
			handleSelect() {
			},

			JumpModule(id, attr) {
				let path = "";

				if (id > 0) {
					path = '/app/forum/module/' + id + '/attr/' + attr;
				} else {
					path = '/app/forum/portal';
				}

				this.CurrentModuleId = id;
				this.CurrentModuleAttr = attr;
				this.$router.push(path);
			}
		},
		created() {
			this.init();
		},
		computed: {
			ForumMenu: function () {
				return this.$store.state.user.ForumMenu;
			},
			user: function () {

				return this.$store.state.user.userInfo;
			},
			NotifyInfo: function () {
				return this.$store.state.user.MyArticleNotify;
			},
			ForumModule: function () {
				return this.$store.state.user.ForumModule;
			},
			routeKey: function () {
				//组件复用特效 生成不同的key
				return this.$route.path.replace(/\//g, '_');
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .wapper
        width: 100%;
        height: 100%;
        /*max-height: 100%;*/
        position: relative;
        display: flex;
        overflow: hidden;
        transition: all 0.5s;
        .hr
            border-top: 1px solid #ebebeb;
            margin: 10px 0px;

        .Card
            background: #fff;
            /*overflow: hidden;*/
            border-radius: 2px;
            box-shadow: 1px 2px 4px 1px rgba(85, 85, 85, .1);

        .Button
            line-height: 1.4;
            display: block;
            text-align: center;
            padding: 5px 12px;
            font-size: 15px;
            border-radius: 3px;
            border: 1px solid #ebebeb;
        .menu-container
            flex-basis: 200px;
            overflow: hidden;
            position: relative;
            .sub-menu
                width: calc(100% + 17px);
                height: 100%;
                margin-left: 5px;
                margin-top: 5px;
                transition: all 0.5s;
                overflow-y: auto;
                position: relative;
                .Submenu-list
                    position: relative;
                    /*right: 17px;*/
                    transition: all 0.5s;
                    width: calc(90% - 17px);
                    margin-left: 5px;
                    .Submenu-item
                        display: flex;
                        cursor: pointer;
                        align-items: center;
                        position: relative;
                        overflow: hidden;
                        animation: fadeInRight 0.3s;
                        animation-fill-mode: backwards;

                        &:hover
                            background: rgb(247, 247, 247);

                        .Button
                            border: 0px;
                            text-align: left;
                            color: #8590a6;
                            padding: 10px 20px;

                        .iconfont
                            font-size: 18px;

                        span
                            margin-left: 8px;
                            user-select: none;

                        &:not(:first-child)
                            border-top: 1px solid #ebebeb;

                    .Submenu-active
                        &::after
                            content: '';
                            height: 100%;
                            position: absolute;
                            border-left: 4px solid #3c8dbc;

                .Submenu-info
                    width: calc(90% - 17px);
                    margin: 30px 0px 30px 5px;
                    padding: 15px;
                    transition: all 0.5s;


                    .user-info
                        .avator
                            text-align: center;

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
            width: calc(100% - 255px);
            margin-left: 30px;
            height: 100%;
            overflow-y: auto;
            position: relative;
            border-radius: 5px;

    .fade-enter-active, .fade-leave-active
        transition: opacity .5s;

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
        opacity: 0;
</style>
