<template>
	<div class="wapper">
		<div class="wapper-container">
			<router-view />
		</div>
		<!-- <mu-container class="nav-bottom" v-if="hackReset">
		  <mu-bottom-nav  :value="path">
		    <mu-bottom-nav-item title="首页" :exact="true" value="/m/index" icon="home" to="/m/index"></mu-bottom-nav-item>
		    <mu-bottom-nav-item title="客户" :exact="true" value="/m/customer" icon="supervisor_account" to="/m/customer"></mu-bottom-nav-item>
		    <mu-bottom-nav-item title="项目" :exact="true" value="/m/project" icon="card_travel" to="/m/project"></mu-bottom-nav-item>
		    <mu-bottom-nav-item title="交流" :exact="true" value="/m/bbs" icon="speaker_notes" to="/m/bbs"></mu-bottom-nav-item>
		  </mu-bottom-nav>
		  mu-bottom-item router-link-exact-active router-link-active mu-bottom-item-active 
		</mu-container> -->
		<mu-container class="nav-bottom">
			<mu-bottom-nav  :value="path" v-if="hackReset">
				<mu-bottom-nav-item 
					v-for="(item, keys) in navigation"
					:key="item.id"
					:title="item.name" 
					:exact="true" 
					:value="item.mobile_path" 
					:to="item.mobile_path" 
					:icon="item.icon"
					:class="{'router-link-exact-active':   CurrentNavIndex == keys, 
							'router-link-active':  CurrentNavIndex == keys, 
							'mu-bottom-item-active':   CurrentNavIndex == keys}"
				>
				</mu-bottom-nav-item>
			</mu-bottom-nav>
		</mu-container>
	</div>
</template>
<script type="text/javascript">
export default {
	beforeRouteUpdate(to , from , next) {
		this.syncNavgation(to.fullPath);
		next();
	},
	
	data () {
		return {
			hackReset: true,
			customerShowIndex: false,
			syncNavgationClass: false,
			CurrentNavIndex: ''
		}
	},
	methods: {
		/**
		*返回事件的方法
		* 实现的功能： 在/m/customer路由下的子组件点击返回，不用更新路由，只返回到/m/customer当前组件
		*/
		history() {
		
			this.hackReset = false;

			this.$nextTick(() => {//强制刷新组件  为了同步导航的active
				this.hackReset = true;
			});

			
		},
		
		/**初始化**/
		init() {
			this.$store.dispatch('InitMobileData').then(() => {
				this.syncNavgation(this.$route.path);
			});

			window.addEventListener('popstate',this.history);
		},
		/**同步导航**/
		syncNavgation(fullpath) {
			let path = fullpath.toLowerCase();

			for (let i in this.navigation) {
				
				if (path.indexOf(this.navigation[i].mobile_path.toLowerCase()) > -1) {
					
					this.CurrentNavIndex = i;
				} 
			}
		},
		
	},
	created() {
		this.init();
	},
	
	computed: {
		path: function () {

			return this.$route.path;
		},
		navigation: function () {
			console.log(this.$store.state.user.baseMobileData.navigation)
			return this.$store.state.user.baseMobileData.navigation;
		}
	}	

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.wapper
	width: 100%;
	height: 100%;
	background: rgb(237,239,239);
	position: relative;
	.wapper-container
		height: calc(100% - 56px);
		width: 100%;
		top: 0;
		bottom: 0;
		position: relative;
		overflow:hidden;
		padding: 0;
		margin: 0;
		// -webkit-overflow-scrolling
	.nav-bottom
		padding: 0;
		position: absolute;
		bottom: 0;
		height: 56px;
		width: 100%;	
		a
			color: rgba(0,0,0,.54);
		.mu-bottom-item-active
			color: #2196f3;
</style>