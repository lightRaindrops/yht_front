<template>
	<div class="wapper">
		<div class="title">
			<span class="icon" @click="returnLast">
				<i class="iconfont icon-fanhui"></i>
			</span>
			<p class="text">我的客户</p>
		</div>
		
			<div class="tab-container">
				<mu-load-more  :loading="loading" @load="load" :loaded-all="loadAll">
					<div class="item" v-for="item in list">
		   				<div class="item-title">
		   					<div class="title-box">
			   					<div class="name">{{item.name}}</div>
			   					<div class="province">{{item.province}} {{item.city}} {{item.area}}</div>
			   					<div class="updated">领取时间: {{item.action_date}}</div>
			   				</div>
		   					<div class="author">
		   						<span v-if="item.accept == 0 ? true : false" :class="item.department == 0 ? 'author-public' : 'author-department'">{{ item.department == 0 ? '公开资源' : '部门资源' }}
		   						</span>
		   						<span v-else class="is-accept">已验收</span>
		   					</div>
		   				</div>

		   				<div class="item-content">
		   					<p>
		   						需求: {{item.demand}}
		   					</p>
		   					
		   				</div>
		   				<div class="item-foot">
		   					<div class="item-label">
		   						<span>
		   							<i class="iconfont icon-biaoqian"></i>
			   					</span>
			   					<span class="item-brand">{{item.brand}}</span>
		   					</div>
		   					<div class="item-action">
		   						<van-button type="default" size="small"  @click="detail(item)"><span class="btn-text">详情</span></van-button>
		   						<van-button type="default" size="small" v-if="item.accept == 0 ? true : false" @click="showActionSheet(item)"><span class="btn-text">操作</span></van-button>
		   						<van-button type="default" size="small" v-else :class="'fllow'" @click="actionTrack(item)"><span class="btn-text">跟进</span></van-button>

		   					</div>
		   				</div>
		   			</div>
				</mu-load-more>
				<p v-show="loadAll" :style="{'margin-bottom':'20px','text-align': 'center'}">已加载完毕, 共 {{list.length}} 条记录</p>
			</div>
			<van-actionsheet v-model="actionsShow" :actions="actions" cancelText="取消" />
			<van-dialog
			  v-model="freeShow"
			  show-cancel-button
			  :before-close="beforeClose"
			  confirmButtonText="确认释放"
			>
			  <van-field
			    v-model.trim="freeContent"
			    type="textarea"
			    placeholder="请输入释放原因, 不少于10个字符"
			    :error-message="freeContentError"
			  />
			</van-dialog>
	</div>
</template>
<script type="text/javascript">
import { Toast } from 'vant';
// import { Actionsheet } from 'vant';
import Detail from './detail.vue';
export default {
	data() {
		return {
			list: [],
			limit: 3,// 每页显示的数量
		    pageNow: 1,  
		    loadAll: false,
		    loading: false,
		    detailStatus: false,
		    component: [
				{name: 'detail',template: Detail}, 
			],
			actionsShow: false,
			actions: [
				{
					name: '跟进客户',
					callback: this.track
				},
				{
					name: '验收客户',
					callback: this.accept
				},
				{
					name: '释放客户',
					callback: this.free
				}
			],
			currentItem: [],
			freeShow: false,
			freeContent: '',
			freeContentError: ''
		}
	},
	created() {
		// window.history.pushState(null, null, document.URL); 
		this.initList();
	},
	
	methods: {
		//返回上一页
		returnLast() {
			this.$router.push('/m/customer/index');
		},
		load () {
	      this.loading = true;
	      ++this.pageNow;
	      this.initList();
	    },
	    /**客户详情**/
	   	detail(item) {
	    	this.$store.dispatch('SetCurrentCustomer', item).then(() => {
	    		this.$router.push('/m/customer/mine/detail');
	    	});
	    },
		/**获取数据**/
	    initList() {

	    	if (this.loading == false) {
		    	Toast.loading(
		    		{
					  	message: '加载中',
					  	duration: 0
					}
				);
		    }

	    	this.$store.dispatch('getPersonalCustomer',{limit: this.limit, offset: this.offset, type: this.customerType}).then(() => {
	    		// (this.$store.state.user.customerList);
	    		this.loading = false;

	    		let data = this.$store.state.user.personal_customer_list.data;

	    		this.loadAll = this.$store.state.user.personal_customer_list.loadAll;

	    		for (let i in data) {

	    			this.list.push(data[i]);
	    		} 
	    		
	    		Toast.clear();
	    	});
	    },
	    showActionSheet(item) {
	    	this.currentItem = item;
	    	this.actionsShow = true;
	    },
	    track() {
	    	
	    	this.$store.dispatch('SetCurrentCustomer', this.currentItem).then(() => {

	    		this.$router.push('/m/customer/mine/comments');
	    	});
	    },
	    actionTrack(item) {
	    	this.currentItem = item;
	    	this.actionsShow = true;
	    },
	    accept() {
	    	this.actionsShow = false;

	    	this.$dialog.confirm({

					message: '验收客户 <'+this.currentItem.name+'>, 该客户将纳入你的名下,确定进行该操作 ?'

					}).then(() => {

				  	this.submitAccept(this.currentItem);

				}).catch(() => {


				});

	    },
	    /**验收客户 提交**/
	    submitAccept(item) {

	    	this.$store.dispatch('acceptCustomer', {id: item.id}).then(() => {

	    		if (this.$store.state.user.acceptCustomer.status == 'success') {

	    			Toast.success({

					  	duration: 2000,       // 持续展示 toast
					  	message: '操作成功'
					
	    			});

	    			let self = this;

	    			setTimeout(() => {

	    				self.list = [];
	    				this.pageNow = 1;
	    				self.initList();

	    			}, 2100);

	    		} else {

					Toast.fail('操作失败');
	    		}
	    	});
	    },
	    free() {

	    	this.actionsShow = false;

	    	this.freeShow = true;
	    	return ;

	    	this.$dialog.confirm({
					message: '释放客户 <'+this.currentItem.name+'>后，其他同事可以再次跟进此客户, 确定进行该操作 ?'
				}).then(() => {
				  	
				  	this.submitFree(this.currentItem);	

				}).catch(() => {
				  
				});
	    },
	    beforeClose(action, done) {
	    	if (action == 'cancel') {
	    		done();
	    	}

	    	if (action == 'confirm') {
	    		done(false);
	    		
	    		if (this.freeContent.length >= 10) {
	    			this.freeContentError = '';
	    			this.submitFree(this.currentItem, this.freeContent, done);
	    		} else {
	    			this.freeContentError = '字符数量少于10';
	    		}
	    		
	    	}
	    	
	    },
	    freetest() {
	    	console.log(this.freeContent);
	    },
	    /**释放客户 提交**/
	    submitFree(item, freeContent, done) {

	    	this.$store.dispatch('freeCustomer', {id: item.id, reason: freeContent})
			  	.then( () => {
			  		done();
			  		if (this.$store.state.user.freeCustomer.status == 'success') {

			  			Toast.success('操作成功');

			  			this.list = [];
			  			this.pageNow = 1;
			  			this.initList();

			  		} else {

			  			Toast.fail('操作失败');			  			
			  		}
			  	});
	    },

	},
	computed: {
		offset: function () {

			return (this.pageNow - 1)*this.limit;
		}
	},
}
</script>
<style lang="stylus" rel="stylesheet/stylus"  scoped="scoped">
.wapper
	width: 100%;
	height: 100%;
	position: relative;
	.title
		height: 51px;
		background: #fff;
		border-top: 1px solid rgba(26,26,26,.06);
		background-clip: content;
		display: flex;
		color: rgb(133,144,166);
		font-size: 16px;
		.icon
			height: 100%;
			flex-grow: 0;//即使有多余的空间 也不放大
			flex-basis: 50px; // 固定宽度
			display: flex;
			justify-content: center;
			align-items: center;
			i
				font-size: 25px;
		.text
			flex: 1;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-right: 50px;
	
	.tab-container
		width: 100%;
		height: calc(100% - 51px);
		overflow-y: auto;
		// background:#000;
		-webkit-overflow-scrolling: touch;
		.item
			padding: 10px;
			margin-top: 10px;
			margin-bottom: 10px;
			background: #fff;
			width: 100%;
			// border-top: 1px solid #e5e5e5;
			position: relative;
			// border-bottom: 1px solid #e5e5e5;	
			&::before
				content:  '';
				width: 100%;
				height: 1px;
				position: absolute;
				bottom: -1px;
				right: 0;
				transform: scaleY(0.5);
				transform-origin: 0 0;
				border-bottom: 1px solid #e5e5e5;
			&::after
				content:  '';
				width: 100%;
				height: 1px;
				position: absolute;
				top: 0;
				right: 0;
				transform: scaleY(0.5);
				transform-origin: 0 0;
				border-bottom: 1px solid #e5e5e5;
			.item-title
				display: flex;
				padding-bottom: 15px
				// border-bottom: 1px solid #e5e5e5;
				justify-content: space-between;
				align-items: center;
				position: relative;
				&::before
					content:  '';
					width: 100%;
					height: 1px;
					bottom: -1px;
					position: absolute;
					bottom: 0;
					right: 0;
					transform: scaleY(0.5);
					transform-origin: 0 0;
					border-bottom: 1px solid #e5e5e5;
				.title-box
					.name
						font-size: 16px;
						font-weight: bold;
					.province
						font-size: 14px;
						// color: rgb(133,144,166);
						color: rgb(96,96,96);
					.updated
						font-size: 12px;
						
				.author
					font-size: 9px;
					margin-top:3px;
					flex-grow: 0;//即使有多余的空间 也不放大
					// flex-basis: 30px; // 固定宽度
					span
						color: #409eff;
						padding: 3px;
						border-radius: 3px;
						border: 1px solid rgba(64,158,255,.2);
						background-color: rgba(64,158,255,.1);
					.author-department
						color: #67c23a;
						background-color: rgba(103,194,58,.1);
						border-color: rgba(103,194,58,.2);
					.is-accept
						color: #f56c6c;
						border-color: hsla(0,87%,69%,.2);
						background-color: hsla(0,87%,69%,.1);
			.item-content
				padding: 10px 0px;
				p
					margin: 0;
					color: rgb(96,96,96);
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
			.item-foot
				height: auto;
				color: rgb(196,197,208);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 5px;
				.item-label
					.item-brand
						font-size: 12px;
						padding-left: 10px;
				.item-action
					button
						border-color: #2196f3;
					.btn-text
						padding: 0px 5px;	
						font-size: 14px;
						color: #2196f3;
						i
							font-size: 14px;
							padding-right: 5px;
					.fllow
						border-color: #67c23a ;
						.btn-text
							color: #67c23a;
				.item-action.rubber
					animation: rubberBand 0.7s ease;
		.no-data	
			padding: 10px;	
			text-align: center;
.fade-enter-active,.fade-enter
	animation: fadeInRight 0.5s ease ;
.fade-leave-active,.fade-leave-to
	animation: fadeOut 0.3s ease;
</style>