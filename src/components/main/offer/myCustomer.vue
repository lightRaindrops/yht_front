<template>
	<div class="wapper">

		<mu-container ref="container" class="loadmore-content" >
		   
	      	<mu-list textline="three-line">
	      		<mu-sub-header>
	      			<div class="customer-mu-sub-header">
	      				<p>已领取客户: <span style="color:#f44336">{{ReceiveNum}}</span> 个</p>
	      				<p>已验收客户: <span style="color:#f44336">{{AcceptNum}}</span> 个</p>
	      				<p style="font-size: 12px;">带星号表示已验收</p>
	      			</div>
	      		</mu-sub-header>
		        <template v-for="item in list" >
		          	<mu-list-item>
				      <mu-list-item-content>
				        <mu-list-item-title>
				        	{{item.name}}
				        	<span v-show="item.accept == 1"><mu-icon value="grade" color="success" size="18"></mu-icon></span>
				        </mu-list-item-title>
				        <mu-list-item-sub-title>
				          <span style="color: rgba(0, 0, 0, .87);">{{item.province}} {{item.city}} {{item.area}}</span><br/>
				          <span>{{parseTimeStamp(item.created_at)}}</span>
				          <span v-show="mobile ? false : true">需求：{{item.demand}}  </span>
				          <span v-show="mobile ? false : true">备注: {{item.description}}</span>
				        </mu-list-item-sub-title>
				      </mu-list-item-content>
				      <mu-list-item-action :style="{position: 'relative','overflow':'hidden'}">
			        	<mu-button small full-width color="primary" @click="openDetail(item)">
					    	详情
					    </mu-button>
					    
					    <mu-button small full-width color="success" @click="track(item)" v-show="item.accept == 1">
					    	跟进
					    </mu-button>

					    <mu-menu cover :open="currentClickIndex == item.id" v-show="item.accept == 0">
					    	<mu-button color="orange" small full-width @click="showMenu(item.id)" style="width: 95px;padding-left: 5px;">操作</mu-button>
						  	<mu-list slot="content">
						    	<mu-list-item button @click="track(item)">
						      		<mu-list-item-title color="orange" >跟进</mu-list-item-title>
						    	</mu-list-item>
						    	<mu-list-item button @click="accept(item)" v-show="item.accept == 0">
						      		<mu-list-item-title>验收客户</mu-list-item-title>
						    	</mu-list-item>
						    	<mu-list-item button @click="free(item)"  v-show="item.accept == 0">
						      		<mu-list-item-title>释放客户</mu-list-item-title>
						    	</mu-list-item>
						  	</mu-list>
						</mu-menu>
				      </mu-list-item-action>
				    </mu-list-item>
		          	<mu-divider></mu-divider>
		    	</template>
	      	</mu-list>		   
		</mu-container>

		<el-dialog
		  	title="客户信息"
		  	:visible.sync="showCustomAction"
		  	width="30%"
		  	class="customer-dialog"
		  	center>
		  	<mu-list class="customer-list">

	      		<mu-list-item>
	      			<mu-list-item-title>称呼</mu-list-item-title>
	        		<mu-list-item-action>
	          			{{currentItem.name}}
	        		</mu-list-item-action>
	      		</mu-list-item>
	      		<mu-list-item>
	      			<mu-list-item-content>
		      			<mu-list-item-title>联系方式</mu-list-item-title>
		        	</mu-list-item-content>
		        	<mu-list-item-action>
		          		<a :href="'tel:'+currentItem.phone" >{{currentItem.phone}}</a>
		        	</mu-list-item-action>
	      		</mu-list-item>
	      		<mu-list-item>
	      			<mu-list-item-content>
		      			<mu-list-item-title>创建时间</mu-list-item-title>
		        	</mu-list-item-content>
		        	<mu-list-item-action>
		          		{{parseTimeStamp(currentItem.created_at)}}
		        	</mu-list-item-action>
	      		</mu-list-item>
	      		<mu-list-item>
	      			<mu-list-item-title>微信号</mu-list-item-title>
	        		<mu-list-item-action>
	          			<a href="javascript:void(0)">{{currentItem.wechat}}</a>
	        		</mu-list-item-action>
	      		</mu-list-item>
	      		<mu-list-item>
	      			<mu-list-item-title>QQ号</mu-list-item-title>
	        		<mu-list-item-action>
	          			<a href="javascript:void(0)">{{currentItem.qq}}</a>
	        		</mu-list-item-action>
	      		</mu-list-item>
	      		<mu-list-item>
	      			<mu-list-item-title>咨询品牌</mu-list-item-title>
	        		<mu-list-item-action>
	          			{{currentItem.brand_name}}
	        		</mu-list-item-action>
	      		</mu-list-item>
	      		<mu-list-item>
	      			<mu-list-item-title :style="{'flex': 1}">所属地区</mu-list-item-title>
	        		<mu-list-item-action :style="{'flex': 2}">
	          			{{currentItem.province}} {{currentItem.city}} {{currentItem.area}}
	        		</mu-list-item-action>
	      		</mu-list-item>
	      		<mu-list-item>
	      			<mu-list-item-title>项目名称</mu-list-item-title>
	        		<mu-list-item-action>
	          			{{currentItem.project_name}}
	        		</mu-list-item-action>
	      		</mu-list-item>
	      		<mu-list-item :style="{'margin-top': '20px'}">
	      			<mu-list-item-title>产品需求</mu-list-item-title>
	        		<mu-list-item-action>
	          			{{currentItem.demand}}
	        		</mu-list-item-action>
	      		</mu-list-item>
	      		<mu-list-item :style="{'margin-top': '20px'}">
	      			<mu-list-item-title>备注信息</mu-list-item-title>
	        		<mu-list-item-action>
	          			{{currentItem.description}}
	        		</mu-list-item-action>
	      		</mu-list-item>
		    </mu-list>
		</el-dialog>

		<el-dialog title="客户跟进记录" :visible.sync="outerVisible" class="comment-dialog">
			<div class="track-container" v-loading="trackLoading">
				<div class="item" v-for="comment in comments">
					<div class="headimg">
						<img :src=" comment.headimg == null ? 'http://e.yhtjc.com/v2/public/img/default.png' : comment.headimg ">
					</div>
					<div class="content">
						<div class="user-name">{{comment.user_name}} <span>发表于 {{comment.updated}}</span></div>
						<div class="text">{{comment.content}}</div>
					</div>
				</div>
			</div>

		    <el-dialog
		      width="30%"
		      title="客户回访"
		      :visible.sync="innerVisible"
		      append-to-body>
		      	<div class="newTrack" style="text-align: center;">
		      		<el-input
					  type="textarea"
					  :autosize="{ minRows: 4, maxRows: 30}"
					  placeholder="请输入内容"
					  v-model.trim="trackComment">
					</el-input>
		      		<el-button type="primary" @click="submitFllowForm" style="margin-top: 15px;margin-bottom: : -5px;">提交</el-button>
		      	</div>	
		    </el-dialog>
		    <div slot="footer" class="dialog-footer">
		      <el-button @click="outerVisible = false">关 闭</el-button>
		      <el-button type="primary" @click="innerVisible = true">新增记录</el-button>
		    </div>
		 </el-dialog>
		
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
	data () {
	    return {
	      
	      	loading: false,
	      	limit: 10,// 每页显示的数量
	      	pageNow: 1,
	      	list: [],
	      	loadAll: false,
	      	showCustomAction: false,
	    	trackLoading: true,
	      	outerVisible: false,
	      	innerVisible: false,
	      	currentItem: '',
	      	popShow: false,
	      	menuOpen: false,
	      	trackComment: '',
	      	currentClickIndex: 0,
	      	currentCustomer: [],
	      	lastClickIndex: 0,
	      	isAccept: false,
	    }
	},
	methods: {
	    refresh () {
	     
	    },
	    load () {
	      this.loading = true;
	      ++this.pageNow;
	      this.initList();
	    },

	    /**获取数据**/
	    initList() {

	    	this.$store.dispatch('getPersonalCustomer',{limit: this.limit, offset: this.offset}).then(() => {
	    		// console.log(this.$store.state.user.customerList);
	    		this.loading = false;

	    		let data = this.$store.state.user.personal_customer_list.data;

	    		this.loadAll = this.$store.state.user.personal_customer_list.loadAll;

	    		for (let i in data) {

	    			this.list.push(data[i]);
	    		}

	    	});
	    },
	    openDetail(item) {
	    	this.currentItem = item;
	    	this.showCustomAction = true;
	    },
	    track(item) {
	    	this.currentItem = item;
	    	this.outerVisible = true;
	    	this.initComments(item.id);
	    },
	    parseTimeStamp(times) {
	    	let date =  new Date(parseInt(times)*1000);

	    	return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	    },
	   
	    /**关闭的时候必须重置当前index 不然重复点击两次会打不开**/
	    showMenu(id) {

	    	this.currentClickIndex = id;
	    },

	    /**验收客户**/
	    accept(item) {

	    	this.currentClickIndex = 0;

	    	if (this.mobile == true) {
	    		this.$dialog.confirm(
	    			{

						message: '验收客户 <'+item.name+'>, 该客户将纳入你的名下,确定进行该操作 ?'

					}
				).then(() => {

				  	this.submitAccept(item);

				}).catch(() => {


				});

	    	} else {

	    		this.$confirm('验收客户 <'+item.name+'>, 该客户将纳入你的名下,确定进行该操作 ?', '提示', {
		        	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'success'
		        }).then(() => {

		          	this.submitAccept(item);

		        }).catch(() => {

		        });
	    	}
	    },
	    /**验收客户 提交**/
	    submitAccept(item) {

	    	this.$store.dispatch('acceptCustomer', {id: item.id}).then(() => {

	    		if (this.$store.state.user.acceptCustomer.status == 'success') {

	    			if (this.mobile) {

	    				Toast.success('操作成功');

	    			} else {

	    				this.$notify.success({title:'操作成功', message:'客户<'+item.name+'> 已验收'});
	    			}
	    			this.list = [];
	    			this.initList();

	    		} else {
	    			if (this.mobile) {

	    				Toast.error('操作失败');

	    			} else {

	    				this.$notify.error({title:'操作失败', message: this.$store.state.user.acceptCustomer.error});
	    			}
	    		}
	    	})
	    },
	    /**释放客户**/
	    free(item) {

	    	this.currentClickIndex = 0;

	    	if (this.mobile) {

	    		this.$dialog.confirm({
					message: '释放客户 <'+item.name+'>后，其他同事可以再次跟进此客户, 确定进行该操作 ?'
				}).then(() => {
				  	
				  	this.submitFree(item);	

				}).catch(() => {
				  
				});
 
	    	} else {

	    		this.$confirm('释放客户 <'+item.name+'>后，其他同事可以再次跟进此客户, 确定进行该操作 ?', '提示', 
	    			{
			        	confirmButtonText: '确定',
			        	cancelButtonText: '取消',
			        	type: 'warning'
		        	}
		        ).then(() => {
		        	this.submitFree(item);
		        }).catch(() => {
		          	        
		        });
	    	}

	    	
	    },
	    /**释放客户 提交**/
	    submitFree(item) {
	    	this.$store.dispatch('freeCustomer', {id: item.id})
			  	.then( () => {

			  		if (this.$store.state.user.freeCustomer.status == 'success') {

			  			if (this.mobile) {

			  				Toast.success('操作成功');

			  			} else {

			  				this.$notify.success({title: '操作成功', message: '客户<'+item.name+'>已经释放'});
			  			}

			  			this.list = [];
			  			this.initList();

			  		} else {

			  			if (this.mobile) {

			  				Toast.error('操作失败');

			  			} else {
			  				
			  				this.$notify.error({title: '操作失败', mesage: this.$store.state.user.freeCustomer.error});
			  			}
			  		}

			  		
			  	})

	    },
	   
	    /**初始化客户跟进列表**/
	    initComments(id) {

	   		this.trackLoading  = true;
		  	
	    	this.$store.dispatch('getComments',{id: id,offset: 0,limit: 15}).then(() => {
	    		this.trackLoading  = false;
	    	});

	    },
	     /**提交跟进记录**/
	    submitFllowForm() {

	    	if (this.trackComment == '') {

	    		return false;
	    	}

	    	this.$store.dispatch('appendComments', {content: this.trackComment,'customer_id': this.currentItem.id}).then(() => {

				if (this.$store.state.user.append_comments.status == 'success') {

					this.$notify.success({title:'操作成功', message: '记录已添加'});
					this.trackComment = '';
					this.initComments(this.currentItem.id);
					
				} else {

					this.$notify.error({title:'操作失败', message: this.$store.state.user.append_comments.error});
					 
				}
			});
	    },
	},

	created() {
		this.initList();

	},
	computed: {
		offset: function () {

			return (this.pageNow - 1)*this.limit;
		},
		comments: function() {
			return this.$store.state.user.comments.data;
		},
		ReceiveNum: function () {
			return this.$store.state.user.personal_customer_list.count;
		},
		AcceptNum: function () {
			return this.$store.state.user.personal_customer_list.accept;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.wapper
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	// position: absolute;
	.loadmore-content
		flex: 1;
		overflow: auto;
		margin-top: 20px;
		-webkit-overflow-scrolling: touch;
		.mu-button-wrapper
			width: 50px;
		.mu-item-content
			flex: 1;
		.mu-item-action
			flex-basis: 100px;
			padding-left: 5px;
	.comment-dialog
		.item
			width: 100%;
			height: 100%;
			display: flex;
			position: relative;
			padding: 10px;
			.headimg
				display: flex;
				align-items: center;
				height: 80px;
				flex-basis: 100px;
				position: relative;
				img
					width: 50px;
					height: 50px;;
					border-radius: 50px;
			.content
				flex: 1;
				.user-name
					text-align: left;
					font-size: 14px;
					font-weight: bold;
					margin-bottom: 8px;
					span
						font-size: 10px;
						margin-left: 5px;
						font-weight: 400;
				.text
					text-align: left;
					display: flex;
					justify-content: space-between;
					word-break:break-all;
					text-indent: 20px;
</style>
