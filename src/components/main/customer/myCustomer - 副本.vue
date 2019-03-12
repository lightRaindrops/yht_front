<template>
	<div class="wapper">

		<mu-container ref="container" class="loadmore-content" :class="{'loadmore-content-pc': !mobile}">
		    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" :loaded-all="loadAll">
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
				        	<mu-button small full-width color="primary" @click="openBottomSheet(item)">
						    	详情
						    </mu-button>
						    
						    <mu-button small full-width color="success" @click="openFllowBottomSheet(item)" v-show="item.accept == 1">
						    	跟进
						    </mu-button>

						    <mu-menu cover :open="currentClickIndex == item.id" v-show="item.accept == 0">
						    	<mu-button color="orange" small full-width @click="showMenu(item.id)">操作</mu-button>
							  	<mu-list slot="content">
							    	<mu-list-item button @click="openFllowBottomSheet(item)">
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
		      	<p v-show="loadAll">已加载完毕, 共 {{list.length}} 条记录</p>
		    </mu-load-more>
		</mu-container>
		<!-- :visible.sync="showCustomAction" -->
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
		      			<mu-list-item-sub-title :style="{'font-size': '12px'}">点击号码可以拨打</mu-list-item-sub-title>
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

		<mu-container>
		  	<!-- <mu-bottom-sheet :open.sync="showCustomAction"> :open.sync="showCustomAction" -->
		  	<mu-dialog  transition="slide-bottom"  :open.sync="showCustomAction1" fullscreen  class="customer-fllow">
		  		<mu-appbar color="indigo400" title="客户详细信息" style="width: 100%">
			    	<mu-button slot="right" flat  @click="showCustomAction=false">
			        	<mu-icon value="close"></mu-icon>
			    	</mu-button>
			    </mu-appbar>
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
			      			<mu-list-item-sub-title :style="{'font-size': '12px'}">点击号码可以拨打</mu-list-item-sub-title>
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
		      		<mu-list-item>
		      			<mu-list-item-title>称呼</mu-list-item-title>
		        		<mu-list-item-action>
		          			{{currentItem.name}}
		        		</mu-list-item-action>
		      		</mu-list-item>
		      		<mu-list-item>
		      			<mu-list-item-content>
			      			<mu-list-item-title>联系方式</mu-list-item-title>
			      			<mu-list-item-sub-title :style="{'font-size': '12px'}">点击号码可以拨打</mu-list-item-sub-title>
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

		  <!-- </mu-bottom-sheet> -->
		  	</mu-dialog>
		</mu-container>
		<mu-container >
		  	<mu-dialog width="100%" transition="slide-bottom" fullscreen :open.sync="showCustomFllow" class="customer-fllow">
		  		<mu-appbar color="primary" title="客户跟进记录" style="width: 100%">
			    	<mu-button slot="left" icon  @click="popShow=true">
			      		<mu-icon value="group_add"></mu-icon>
			    	</mu-button>
			    	<mu-button slot="right" flat  @click="showCustomFllow=false">
			        	<mu-icon value="close"></mu-icon>
			    	</mu-button>
			    </mu-appbar>
			    <van-popup  position="top" v-model="popShow" :overlay="false" style="height: 100%;left: 0;width: 100%;transform:translate3d(0, 0, 0);animation: bounceInRight 0.5s ease">
			    	<mu-appbar color="blueGrey500" title="新建内容" style="width: 100%">
				    	<mu-button slot="right" flat  @click="popShow=false">
				        	<mu-icon value="close"></mu-icon>
				    	</mu-button>
				    </mu-appbar>
			    	<mu-list>
			    		<mu-sub-header>内容填写</mu-sub-header>
			    		<mu-list-item>
			    			<mu-list-item-content style="height: auto">
			    				<mu-form ref="FllowForm" :model="validateForm" class="mu-form" label-width="100">
			    					<mu-form-item :rules="contentRules" prop="content">
				    					<mu-text-field prop="content" style="width: 100%" v-model.trim="validateForm.content" placeholder="输入客户的跟进记录" multi-line :rows="6"></mu-text-field>
				    				</mu-form-item>
				    				<!-- <mu-form-item> -->
				    					<mu-date-input readyonly  value-format="YYYY-MM-DD" v-model.trim="validateForm.date"  label="请选择日期" container="bottomSheet" label-float full-width></mu-date-input>
				    				<!-- </mu-form-item> -->
				    				<mu-form-item>
				    					<div style="text-align: center;width: 100%">
									      	<mu-button color="primary" @click="submitFllowForm">提交</mu-button>
									      	<mu-button @click="popShow=false">返回</mu-button>
									    </div>
								    </mu-form-item>
							    </mu-form>
						    </mu-list-item-content>
			    		</mu-list-item>
			    	</mu-list>
				</van-popup>
		    	<mu-list textline="three-line">
		    		<mu-sub-header>{{currentCustomer.name}}</mu-sub-header>
		      		<template v-for="(item, key) in comments">
			      		<mu-list-item avatar :ripple="false" button >
			      			<mu-list-item-content>
			      				<mu-list-item-title style="color: rgba(0, 0, 0, .64);font-size: 13px">{{item.date}}</mu-list-item-title>
				      			{{item.content}}
				        	</mu-list-item-content>
			      		</mu-list-item>
			      		<mu-divider></mu-divider>
			      	</template>
			      	<p style="text-align: center">已加载完毕, 共{{comments.length}}条记录</p>
		      	</mu-list>
		    </mu-dialog>
		</mu-container>

	</div>
</template>
<script type="text/javascript">
import { Loading } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';
import { Dialog } from 'vant';
export default {
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	},
	data () {
	    return {
	      num: 10,
	      refreshing: false,
	      loading: false,
	      limit: 10,// 每页显示的数量
	      pageNow: 1,
	      list: [],
	      loadAll: false,
	      showCustomAction: false,
	      showCustomAction1: false,
	      showCustomFllow: false,
	      currentItem: '',
	      popShow: false,
	      menuOpen: false,
	      validateForm: {
	      	id: '',
	      	content: '',
	      	date: new Date()
	      },
	      currentClickIndex: 0,
	      currentCustomer: [],
	      lastClickIndex: 0,
	      isAccept: false,
	      contentRules: [
	        { validate: (val) => !!val, message: '必须填写内容'},
	        { validate: (val) => val.length >= 10, message: '字符长度必须大于10'}
	      ],
	      
	    }
	},
	methods: {
	    refresh () {
	      this.refreshing = true;
	      this.$refs.container.scrollTop = 0;
	      setTimeout(() => {
	        this.refreshing = false;
	        this.text = this.text === 'List' ? 'Menu' : 'List';
	        this.num = 10;
	      }, 2000)
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
	    openBottomSheet(item) {
	    	this.currentItem = item;
	    	this.showCustomAction = true;

	    },
	    parseTimeStamp(times) {
	    	let date =  new Date(parseInt(times)*1000);

	    	return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	    },
	    openFllowBottomSheet(item) {
	    	this.validateForm.id = item.id;
	    	this.showCustomFllow = true;
	    	this.currentClickIndex = 0;
	    	this.currentCustomer = item;
	    	this.initComments(item.id);
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
	    /**显示跟进表单页面**/
	    showFllowForm(id) {
	    	this.validateForm = id;
	    	this.popShow = true;
	    },
	    /**提交跟进记录**/
	    submitFllowForm() {

	    	this.$refs.FllowForm.validate().then((valid) => {

	    		if (valid) {

	    			let info = {};

	    			info.content = this.validateForm.content;
	    			info.customer_id = this.validateForm.id;
	    			info.date = this.validateForm.date.getFullYear() + '-' + (this.validateForm.date.getMonth()+1) + '-' + this.validateForm.date.getDate();

	    			this.$store.dispatch('appendComments', info).then(() => {

	    				if (this.$store.state.user.append_comments.status == 'success') {

	    					if (this.mobile == true) {

	    						Toast.success('添加成功');

	    					} else {

	    						this.$notify.success({title:'操作成功', message: '记录已添加'});
	    					}

	    					this.validateForm.content = '';
	    					this.initComments(info.customer_id);
	    					this.popShow = false;

	    				} else {

	    					if (this.mobile == true) {

	    						Toast.error('添加失败');

	    					} else {
	    						this.$notify.error({title:'操作失败', message: this.$store.state.user.append_comments.error});
	    					}
	    				}
	    			});
	    		}
	    	})
	    },

	    /**初始化客户跟进列表**/
	    initComments(id) {

	   		this.$loading({
	        	lock: true,
	        	text: 'Loading',
	        	background: 'rgba(255, 255, 255, 0.7)'
	        });
		  	console.log(id);return;
	    	this.$store.dispatch('getComments',{id: id}).then(() => {
	    			this.$loading().close();
	    	});

	    }

	},

	created() {
		this.initList();

	},
	computed: {
		offset: function () {

			return (this.pageNow - 1)*this.limit;
		},
		comments: function() {
			return this.$store.state.user.comments;
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
	.customer-fllow
		.vant-pop-wapper
			width: 100%;
			height: 100%;
		
</style>
