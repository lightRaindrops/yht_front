<template>
	<el-menu
	:default-active= "this.$route.path"
	:class="{'el-menu-padding-left': !this.$store.state.user.ShrinkStatus}"
	@open="handleOpen"
	background-color="#222d32"
	text-color="#b8c7ce"
	active-text-color="#fff" 
	:router="true"
	:unique-opened= "true"
	:collapse="this.$store.state.user.ShrinkStatus"
	:style="{'border-right': '0px'}"
	
	>
		
		
		
		<template v-for="(item, key) in navigation">
			<template v-if="item.front_path != null">
				<el-menu-item
					:index="item.front_path"
					:style="{transition: 'all 0.5s'}" 
					@click="pushHistory(item)"
				>
					<i class="iconfont" :class="item.classname" :style="{transition: 'all 0.5s'}"></i>
					<span slot="title" :style="{transition: 'all 0.5s'}" >{{item.name}}</span>
				</el-menu-item>
			</template>
			<template v-else>
				<el-submenu :index="item.name" >
					<template slot="title">
						<i class="iconfont" :class="item.classname"></i>
						<span>{{ item.name }}</span>
					</template>
					<el-menu-item-group>
					 	<el-menu-item v-for="(subItem,subKey) in item.children" :index="subItem.front_path" :key="subItem.id" @click="pushHistory(subItem)">
					 		<i class="iconfont" :class="subItem.classname"></i>
							<span >{{subItem.name}}</span>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</template>
		</template>
	</el-menu>
</template>
<script type="text/javascript" >
export default {
	data() {
		return {
			staticMenu: [
				// {path: '/app',name: '综合首页',icon: 'icon-daohangshouye'},
				// {path: '/app/forum/list/index', name: '经验交流', icon: 'icon-jiaoliu'},
				// {path: '/app/arsum', name: '部门应收', icon: 'icon-shoukuan'}
			]
		}
	},
	beforeRouteEnter(to, from ,next) {
		next( vm => {
			
		})
	},
	created() {
		this.initNav();

	},
	methods: {
		handleOpen() {},
		/**
		* 初始化导航
		*/
		initNav(){
			this.$store.dispatch('initNavigation').then(() => {

			});
		},
		
		pushHistory(item) {
			let obj = {path: item.front_path,name: item.name, icon: item.classname};

			this.$store.dispatch('SetHistory', obj);
			
		}
	},
	computed: {
		
		navigation: function () {

			return this.$store.state.user.navigation;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

.el-menu
	background-color: #324157;
	text-align: left;
	height: 100%;
	position: relative;
	transition: all 0.1s cubic-bezier(1,.09,.21,1.09);
	.iconfont
		font-size: 25px !important;
		color: #fff;
	.el-menu-item  span
		font-size: 14px;
		padding-left: 10px;
	.el-submenu  span
		font-size: 14px;
		padding-left: 10px;
	.el-menu-item-group
		font-size: 12px;
.el-menu-padding-left
	padding-left: 10px;
</style>