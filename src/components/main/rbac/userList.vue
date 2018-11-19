<template>
	<div class="user-wapper">
		<div class="role-wapper">
			<div class="tool">
				<el-button type="success" :loading="syncBtnLoading" @click="syncUserList">同步企业微信通讯录</el-button>
				<span style="font-size: 12px;vertical-align:bottom;line-height: 1;margin-left: 10px;">上一次同步的时间: {{initData.sync_date}}</span>
			</div>
			<div class="table-wapper">
				<el-table
				    :data="tableData"
				    v-loading="tableLoading"
				    style="width: 100%"
				    max-height="550"
				   >
				     <el-table-column
				      prop="id"
				      label="id"
				      width="50">
				    </el-table-column>
				    <el-table-column
				      prop="username"
				      label="用户名"
				      >
				    </el-table-column>

				    <el-table-column
				      prop="phone"
				      label="手机号"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="department"
				      label="部门"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="role"
				      label="所拥有的角色"
				      width="180"
				      >
				      <template slot-scope="scope">
				      	<span v-for="item in scope.row.role" :style="{'padding-left': '5px'}">
				      		<el-tag type="success" size="medium">{{item.label}}</el-tag>
				      	</span>
				      </template>
				    </el-table-column>

				    <el-table-column
				      prop="date"
				      label="注册时间">
				    </el-table-column>

				    <el-table-column label="操作" width="180">
				    	<template slot-scope="scope">
				    		<el-tooltip class="item" effect="dark" content="设置角色" placement="top">
					    		<el-button
						          size="mini"
						          type="success"
						          @click="handleEditRole(scope.row)"><i class="el-icon-edit-outline"></i>
						      	</el-button>
						    </el-tooltip>
						  	
						    <el-tooltip class="item" effect="dark" content="加入企业微信" placement="top" >
						        <el-button
						          size="mini"
						          type="primary"
						          :disabled= "scope.row.workwx == 0 ? false : true"
						          @click="handleJoinWorkWx(scope.row)"><i class=" iconfont icon-qiyeweixin"></i>
						      	</el-button>
						    </el-tooltip>
						    <el-tooltip class="item" effect="dark" content="通过审核" placement="top" v-show="scope.row.authorize == 0">
					    		<el-button
						          size="mini"
						          type="success"
						          @click="handleAuthorize(scope.row)"><i class="iconfont icon-weibiaoti--"></i>
						      	</el-button>
						    </el-tooltip>
						    <el-tooltip class="item" effect="dark" content="禁用" placement="top" v-show="scope.row.authorize == 1">
						        <el-button
						          size="mini"
						          type="danger"
						          :disabled= "scope.row.username == 'admin' ? true : false"
						          @click="handleDisable(scope.row)"><i class="el-icon-delete"></i>
						      	</el-button>
						    </el-tooltip>
					    </template>
				    </el-table-column>
				</el-table>
				<el-dialog title="分配角色" :visible.sync="setRoleVisible" center width="30%" @close="closeDialog">
					<div class="role-list">
						<el-checkbox v-for="item in this.$store.state.user.userRole" :key="item.id" :label="item.name" v-model="item.checked"></el-checkbox>
					</div>

				  	<div slot="footer" class="dialog-footer">
				    	<el-button type="primary" @click.native="saveRole" :loading="setRoleLoding">确 定</el-button>
				    	<el-button @click="setRoleVisible = false">取 消</el-button>
				  	</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			tableLoading: true,
			setRoleVisible: false,
			roleData: {
				id: '',
				rid: []
			},
			setRoleLoding: false,
			syncBtnLoading: false
		}
	},
	methods: {
		/**审核用户**/
		handleAuthorize(row) {
			this.$confirm('授权 <'+row.username+' >登录, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'

	        }).then(() => {
	        	this.$store.dispatch('updateUserAuthorize', {id:row.id}).then(() => {
	        		// this.initable();
	        		
	        		if (this.$store.state.user.updateUserAuthorize.status == 'success') {

	        			this.$notify.success({title: '操作成功', message: '用户已授权'});

	        			this.initable();

	        		} else {
	        			this.$notify({'title': '操作失败', message: this.$store.state.user.updateUserAuthorize.error});
	        		}
	        	});
	        })
	        .catch(() =>  {});
		},
		/**
		* 设置用户角色--显示
		*/
		handleEditRole(row) {
			this.roleData.id = row.id;
			this.$store.dispatch('getUserRole', row.id).then(() => {
				this.setRoleVisible = true;
			})
		
		},
		/**
		* 设置用户角色--保存
		*/
		saveRole() {

			let userRole = this.$store.state.user.userRole;

			this.roleData.rid = [];

			this.setRoleLoding = true;

			for (let i in userRole) {

				if (userRole[i].checked === true) {

					this.roleData.rid.push(userRole[i].id);
				}
			}

			this.$store.dispatch('putUserRole', this.roleData).then((response) => {

				this.setRoleLoding = false;

				if (this.$store.state.user.user_put_role_status.status == 'success') {

					this.$message.success('用户角色分配成功！');

				} else {
					this.$message.error(this.$store.state.user.user_put_role_status);
				}

				this.setRoleVisible = false;

			})
		},
		/**
		* 禁用一个用户
		*/
		handleDisable(row) {
			
			this.$confirm('禁用 <'+row.username+'> ?','提示', {
	        	confirmButtonText: '确定',
	        	cancelButtonText: '取消',
	        	type: 'warning'
        	})
			.then(() => {
				this.$store.dispatch('user/disabled',{id:row.id});
			})
			.catch(() => {});
		},

		/**
		* dialog关闭回调
		*/
		closeDialog() {
			this.initable();
		},

		/**
		* 初始化表格
		*/

		initable() {
			this.tableLoading = true;

			this.$store.dispatch('getUserList').then(() => {
				
				this.tableLoading = false;
			});
		},
		/**同步企业微信的通讯录**/
		syncUserList() {
			this.syncBtnLoading = true;
			this.$store.dispatch('syncUser')
				.then( () => {
					if (this.$store.state.user.syncUser.status == 'success') {
						this.$notify.success('操作成功');
						this.initable();
						this.syncBtnLoading = false;
					} else {
						this.$notify.error({title: '操作失败', message: this.$store.state.user.syncUser.error});
					}
				});
		},
		/**加入企业微信**/
		handleJoinWorkWx(row) {
			this.$confirm('将<'+row.username+'>加入企业微信?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'success'
	        }).then(() => {
	          this.joinWorkWx(row);
	        }).catch(() => {
	               
	        });
		},
		joinWorkWx(row) {
			this.$store.dispatch('joinWorkWx',{id:row.id}).then((response) => {

				if (this.$store.state.user.joinWorkWx.status = 'success') {

					this.$notify.success('操作成功');
					this.initable();
				} else {
					this.$notify.error({title:'操作失败', 'message': this.$store.state.user.joinWorkWx.error});
				}
			});
		},
		/**初始化**/
		initUserList() {
			this.$store.dispatch('initUserList').then(() => {

			});
		}
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.userList;
		},
		initData: function() {
			return this.$store.state.user.initUserList;
		}
	},

	created() {
		this.initable();
		this.initUserList();
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.user-wapper
	width: 100%;
	height: 100%;
	position: relative;
	.tool
		width: 100%;
		text-align: left;
		padding: 30px 30px 0px 30px;
	.table-wapper
		padding: 30px;
		.iconfont
			font-size: 12px;
</style>