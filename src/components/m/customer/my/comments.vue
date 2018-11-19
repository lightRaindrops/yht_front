<template>
	<div class="wapper">
		<div class="title">
			<span class="icon" @click="returnLast">
				<i class="iconfont icon-fanhui"></i>
			</span>
			<p class="text">跟进记录</p>
			<span class="icon" @click="changePop">
				<mu-ripple><i class="el-icon-plus"></i></mu-ripple>
			</span>
		</div>
		<div class="tab-container">
			<mu-load-more  :loading="loading" @load="load" :loaded-all="loadAll">
				<div class="item" v-for="items in list">
					<div class="item-headImg">
						<img :src="items.headimg == null ? 'http://e.yhtjc.com/v2/public/img/default.png' : items.headimg">
					</div>
					<div class="item-content">
						<div class="username">{{items.user_name}}</div>
						<div class="text">{{items.content}}</div>
						<div class="foot">{{items.updated}}</div>
					</div>
				</div>
			</mu-load-more>
			<p v-show="loadAll" :style="{'margin-bottom':'20px','text-align': 'center'}">已加载完毕, 共 {{list.length}} 条记录</p>
		</div>
		<van-popup v-model="showPop" position="right" :overlay="false" class="comments-popup">
			<div class="tool">
				<span>
					<a href="javascript:void(0)" @click="showPop = false">取消</a>
				</span>
				<span>
					<a href="javascript:void(0)" @click="submitCommit">提交</a>
				</span>
			</div>
			<div class="input-content">
				<textarea placeholder="请输入内容" ref="textarea" v-model.trim="comment" v-focus="true"></textarea>
			</div>
		</van-popup>
	</div>
</template>
<script type="text/javascript">
import { Toast } from 'vant';
export default {
	// props: {
	// 	item: {
	// 		type: Object
	// 	}
	// },
	data() {
		return {
			limit: 5,
			loading: false,
			loadAll: false,
			pageNow: 1,
			list: [],
			showPop: false,
			comment: '',
			item: this.$store.state.user.CurrentCustomer
		}
	},
	methods: {
		returnLast() {
			this.$router.go(-1);
		},
		load () {
	      this.loading = true;
	      ++this.pageNow;
	      this.initComments(this.item.id);
	    },
		 /**初始化客户跟进列表**/
	    initComments(id) {

	    	if (this.loading == false) {

		    	Toast.loading({
				 
				  message: '加载中...',
				  duration: 0
				});
			}

	    	this.$store
	    		.dispatch('getComments',{id: id,offset:this.offset, limit: this.limit})
	    		.then(() => {

	    		this.loading = false;
	    		
	    		let data = this.$store.state.user.comments.data;

	    		this.loadAll = this.$store.state.user.comments.loadAll;

	    		for (let i in data) {

	    			this.list.push(data[i]);
	    		} 

	    		Toast.clear();
	    	});

	    },
	    changePop() {

			this.showPop = true;
		},
		submitCommit() {

			if (this.comment == '') {

				Toast.fail('内容不能为空');
			}
			else {

				this.$store
					.dispatch('appendComments', {content: this.comment,customer_id: this.item.id})
					.then(() => {

						if (this.$store.state.user.append_comments.status == 'success') {

							Toast.success({
								message: '操作成功',
								duration: 2000
							});

							var self = this;

							setTimeout(() => {
								self.showPop = false;
								this.list = [];
								this.initComments(this.item.id);
							}, 2200);

						} else {
							Toast.fail('操作失败');
						}
					});
			}

			
		}
	},
	
	created() {
		this.initComments(this.item.id);
	},
	
	computed: {
		offset: function () {
			return (this.pageNow - 1)*this.limit;
		}
		
	},
	directives: {
	  	focus: {
	    	// 指令的定义
	    	inserted: function (el) {
	      		el.focus()
	    	}
	  	}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
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
		position: relative;
		.icon
			height: 100%;
			flex-grow: 0;//即使有多余的空间 也不放大
			flex-basis: 50px; // 固定宽度
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			i
				font-size: 25px;
		.text
			flex: 1;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			// padding-right: 50px;
		&::before
			content:  '';
			width: 100%;
			height: 1px;
			position: absolute;
			bottom: 0;
			right: 0;
			transform: scaleY(0.5);
			transform-origin: 0 0;
			border-bottom: 1px solid #e5e5e5;
	.tab-container
		width: 100%;
		height: calc(100% - 51px);
		position: relative;
		overflow-y: auto;
		background: #fff;
		border-bottom: 1px solid #e5e5e5;
		padding-top: 10px;
		padding-right: 5px;
		-webkit-overflow-scrolling: touch;
		.item
			width: 100%;
			display: flex;
			position: relative;
			.item-headImg
				flex-grow: 0;//即使有多余的空间 也不放大
				flex-basis: 50px; // 固定宽度
				display: flex;
				justify-content: center;
				img
					width: 30px;
					height: 30px;
					border-radius: 30px;
			.item-content
				flex: 1;
				height: auto;
				position: relative;
				// border-bottom: 1px solid #e5e5e5;
				&::before
					content:  '';
					width: 100%;
					height: 1px;
					position: absolute;
					bottom: 0;
					right: 0;
					transform: scaleY(0.5);
					transform-origin: 0 0;
					border-bottom: 1px solid #e5e5e5;
				.username
					font-size: 14px;
					font-weight: bold;
				.foot
					padding: 10px 0px;
					font-size: 10px;
	.comments-popup
		width: 100%;
		height: 100%;
		// position: absolute;
		bottom: 0;
		.tool
			width: 100%;
			height: 60px;
			display: flex;
			padding: 15px;
			justify-content: space-between;
			span
				a
					font-size: 16px;
					color: 	#2196f3;
					font-weight: 800;
		.input-content
			width: 100%;
			height: calc(100% - 60px);
			padding: 0px 15px;	
			position:relative;
			overflow-y: auto;
			textarea
				width: 100%;
				height: 30%;
				border: 0px;
				
				resize: none;
</style>