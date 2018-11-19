<template>
	<div class="header">
		
		<ul class="nav-bar nav-left" :class="{'ul-take-up': navTakeUp, 'nav-bar-mobile': mobile}">
			<li class="nav-item" :style="{cursor: 'pointer'}" @click.stop="takeUp" v-if="mobile ? false : true">
				<!-- <i class="iconfont" :class="[navTakeUp ? 'icon-zhankai': 'icon-caidan']"></i> -->
				<svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" class="hamburger is-active"><path data-v-2fe8a492="" d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z" p-id="1692"></path> <path data-v-2fe8a492="" d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z" p-id="1693"></path> <path data-v-2fe8a492="" d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z" ></path></svg>
			</li>
			<li class="nav-item" :style="{cursor: 'pointer'}" v-else @click.stop="mobileNavChange">
				<i class="iconfont" :class="[mobileTakeUp ? 'icon-guanbi1' : 'icon-daohang' ]"></i>
			</li>
			
			
		</ul>
		<ul class="nav-bar nav-right">
			<!-- <li v-show="mobile ? false : true">
				<el-input
				    placeholder="搜索你想要的内容, 回车..."
				    suffix-icon="el-icon-search"
				    :style="{width:baseWidth,transition: 'all 0.5s'}"
				    @focus="onFocus"
				    @blur="onBlur"
				    @keyup.native.enter="startSearch"
				    v-model="searchInput">
				</el-input>
			</li> -->
			<li class="active li-img" @click.stop="headClick()">
				<div class="head-img">
					<img :src="this.$store.state.user.userInfo.headimg ? this.$store.state.user.userInfo.headimg : 'http://e.yhtjc.com/v2/public/img/default.png'">
				</div>
				<span :class="{ripple:ripple}"></span>
			</li>
		</ul>
		<div class="account-card" v-show="cardShow" :class="{'account-card-mobile': mobile}">
			<v-card @hideCard="hideCard"></v-card>
		</div>
	</div>
</template>

<script type="text/javascript">
import Card from './card.vue';
export default {
	props: {
		mobile: {
			type: Boolean,
			default: false
		},
		mobileTakeUp: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			searchInput: '',
			baseWidth: '200px',
			ripple: false,
			cardShow: false,
			navTakeUp: false, //PC导航是否收起
			// mobileTackUp: false, //mobile 导航是否收起
		}
	},
	methods: {
		onFocus() {
			this.baseWidth = '400px';
		},
		onBlur() {
			this.baseWidth = '200px';
		},
		startSearch() {
			console.log('helloworld');
		},
		headClick() {

			let self = this;

			this.ripple = true;

			if (this.cardShow == false ) {

				this.cardShow = true;
			} else {

				this.cardShow = false;
			}

			setTimeout(() => {
				self.ripple = false;
			}, 2000);
		},
		hideCard() {
			if (this.cardShow === true) {
				this.cardShow = false;
			}
		},
		/**PC-收起导航**/
		takeUp() {
			if (this.navTakeUp) {

				this.navTakeUp = false;

			} else {

				this.navTakeUp = true;
			}

			//PC
			this.$emit('updateTakeUp', this.navTakeUp); 
			

		},

	},
	
	components: {
		'v-card': Card
	}
}	
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
a:link
    text-decoration: none;
.header
    position: relative;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    height: 50px;
    text-align: left;
    transition: all 0.5s;
    background: #fff;
    //box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
    .nav-bar
    	margin: 0;
    	display: flex;
    	position: relative;
    	line-height: 50px;
    .nav-left
    	width: 150px;
    	margin-right: auto;
    	li
    		flex: 1;
    		color: #fff;
    		margin: 0px;
    		padding: 0;
    		display: block;
    		vertical-align: middle;
    		position: relative;
    		text-align:center;
    		transition: all 0.5s;
    		i
    			font-size: 16px;
    		.item-label
    			top: calc((70px -16px) / 2 - 20px);
    			right: 0;
    			width: 20px;
    			height: 20px;
    			display: block;
    			position: absolute;
    			font-size: 9px;
    			text-align: center;
    			line-height: 20px;
    			border-radius: 5px;
    		.label-waring
    			background: #f39c12 !important;
    		.label-success
    			background: #00a65a !important;
    		svg
    			width: 20px;
    			cursor: pointer;
    			height: 20px;
    			transform-origin: 50% 50%;
    			transition: 0.5s;
    .nav-right
    	// width: 400px;
    	right: 0;
    	padding-right: 30px;
    	li
    		height: 100%;
    		padding-right: 10px;
    		padding-left: 10px;
    		transition: all 0.5s;
	    	.head-img
	    		width: 50px;
	    		height: 50px;
	    		border-radius: 100%;
	    		overflow: hidden;
	    		margin-top: 10px;
	    		transition: all 0.5s;
	    		img
	    			width: 50px;
	    			height: 50px;
    	li.li-img
    		cursor: pointer;	
    		position: relative;
    		overflow: hidden;
    		transition: all 0.5s;
    		span
    			height: 70px;
    			width: 70px;
    			top: 0;
    			left: 0;
    			border-radius: 50%;
    			background: rgba(0, 0, 0, .3);
    			transform: scale(0);
    			position: absolute;
    			opacity: 1;
    		.ripple
    			opacity: 1;
    			// transform: scale(0);
    			animation: ripple 2s cubic-bezier(0.23, 1, 0.32, 1);
	    li.active
	    	background: rgba(0,0,0,0.05);
    .account-card
    	position: fixed;
    	width: 270px;
    	height: 370px;
    	z-index: 999;
    	top: 70px;
    	right: 28px;
    	transition: all 0.5s;
    	animation-name: flipInY;
    	animation-duration: 1s;
    	animation-timing-function: ease;
    .account-card-mobile
    	width: 100%;
    	right: 0;
    .ul-take-up,.nav-bar-mobile
    	padding-left: 20px;
  	
</style>