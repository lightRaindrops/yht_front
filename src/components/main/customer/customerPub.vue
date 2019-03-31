<template>
	<div class="wapper">
		<mu-container ref="container" class="loadmore-content" :class="{'loadmore-content-pc': !mobile}">
		    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" :loaded-all="loadAll">
		      	<mu-list textline="three-line">
			        <template v-for="item in list">
			          	<!-- <mu-list-item>
			            	<mu-list-item-title>{{text}} Item {{i}}</mu-list-item-title>
			          	</mu-list-item> -->
			          	<mu-list-item avatar :ripple="false" button>
					      
					      <mu-list-item-content>
					        <mu-list-item-title>{{item.name}}</mu-list-item-title>
					        <mu-list-item-sub-title>
					          <span style="color: rgba(0, 0, 0, .87)">{{item.province}} {{item.city}} {{item.area}}</span><br/>
					          需求：{{item.demand}}
					        </mu-list-item-sub-title>
					      </mu-list-item-content>
					      <mu-list-item-action :style="{position: 'relative','overflow':'hidden'}">
					        
					        <mu-button :disabled="btnDisable" small full-width color="success"  @click="receiveCustomer(item.id, item.name)">
						    	我要领取
						    </mu-button>
					      </mu-list-item-action>
					    </mu-list-item>			          	
			          	<mu-divider></mu-divider>
			    	</template>
		      	</mu-list>
		      	<p v-show="loadAll" :style="{'margin-bottom':'20px'}">已加载完毕, 共 {{list.length}} 条记录</p>
		    </mu-load-more>
		</mu-container>
	</div>
</template>
<script type="text/javascript">
import { Toast } from 'vant';
import { Dialog } from 'vant';
export default {
	props: {
		mobile: {
			type: Boolean,
			default: false,
		}
	},
	data () {
	    return {
	      num: 10,
	      refreshing: false,
	      loading: false,
	      text: 'List',
	      limit: 10,// 每页显示的数量
	      pageNow: 1,  
	      list: [],
	      loadAll: false,
	      btnDisable: false
	    }
	},
	methods: {
	    refresh () {
	      this.refreshing = true;
	      this.$refs.container.scrollTop = 0;
	      setTimeout(() => {
	        this.refreshing = false;
	        // this.text = this.text === 'List' ? 'Menu' : 'List';
	        // this.num = 10;
	      }, 2000)
	    },
	    load () {
	      this.loading = true;
	      // setTimeout(() => {
	      //   this.loading = false;
	      //   this.num += 10;
	      // }, 2000)
	      ++this.pageNow;
	      this.initList();
	    },

	    /**获取数据**/
	    initList() {
	    	this.$store.dispatch('getCustomer',{limit: this.limit, offset: this.offset}).then(() => {
	    		// console.log(this.$store.state.user.customerList);
	    		this.loading = false;

	    		let data = this.$store.state.user.customerList.data;

	    		this.loadAll = this.$store.state.user.customerList.loadAll;

	    		for (let i in data) {

	    			this.list.push(data[i]);
	    		} 
	    		

	    	});
	    },
	    /**领取一个客户**/
	    receiveCustomer(id,name) {
	    	this.btnDisable = true;

	    	if (this.mobile == true) {

	    		//移动端
	    		this.$dialog.confirm(
	    			{
	    				message: '认领客户 <'+name+'>'
	    			}
	    		).then(() => {
				 
				  	this.receive(id);

				}).catch(() => {
				
					this.btnDisable = false; 
				});

	    	} else {

		    	this.$confirm('认领客户 <'+name+'>', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          	
		          	this.receive(id);

		        }).catch(() => {
		        	this.btnDisable = false;      
		        });
		    }
	    },
	    receive(id) {
	    	this.$store.dispatch('receiveCustomer', {id: id}).then(() => {

          		if (this.$store.state.user.receiveStatus.status == 'success') {

          			if (this.mobile == true) {

          				Toast.success('操作成功');

          			} else {

          				this.$notify.success({title: '操作成功', message: '请到 <我的客户> 中查看信息'});
          			}	
          			

          		} else {

          			if (this.mobile == true) {

          				Toast.fail('操作失败');

          			} else {
          				this.$notify.error({title: '操作失败', message: this.$store.state.user.receiveStatus.error});
          			}
          		}

          		this.list = [];

          		this.initList();

          		this.btnDisable = false;
          	});
	    }
	},

	created() {
		this.initList();
	},
	computed: {
		offset: function () {

			return (this.pageNow - 1)*this.limit;
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
		&::-webkit-scrollbar
			width: 10px;
			height: 10px;
			background-color: #fff;
		.mu-button-wrapper
			width: 50px;
		.mu-item-content
			flex: 1;
		.mu-item-action
			flex-basis: 100px;
			padding-left: 5px;
</style>