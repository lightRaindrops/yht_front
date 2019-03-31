<template>
	<div class="role-wapper">
		<div class="role-wapper">
			<div class="role-tool">
				<el-button type="success" @click.native="showDialog">新增角色</el-button>
			</div>
			<div class="table-wapper">
				<el-table
				    :data="tableData"
				    v-loading="loading"
				    style="width: 100%"
				   >
				     <el-table-column
				      prop="id"
				      label="id"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="角色名称"
				      >
				    </el-table-column>
				    
				    <el-table-column
				      prop="desc"
				      label="描述">
				    </el-table-column>

				    <el-table-column
				      prop="date"
				      label="添加时间">
				    </el-table-column>

				    <el-table-column label="操作">
				    	<template slot-scope="scope">
				    		<el-tooltip class="item" effect="dark" content="设置功能" placement="top">
					    		<el-button
						          size="mini"
						          type="success"
						          @click="handleEditRole(scope.row)"><i class="el-icon-edit-outline"></i>
						      	</el-button>
						    </el-tooltip>
						    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
						        <el-button
						          size="mini"
						          @click="handleEditUesr( scope.row)"><i class="el-icon-edit"></i>
						      	</el-button>
						    </el-tooltip>
						    <el-tooltip class="item" effect="dark" content="删除" placement="top">
						        <el-button
						          size="mini"
						          type="danger"
						          @click="handleDelete(scope.row)"><i class="el-icon-delete"></i>
						      	</el-button>
						    </el-tooltip>
					    </template>
				    </el-table-column>
				 </el-table>
			</div>
		</div>
		<el-dialog title="新增角色" :visible.sync="addRoleVisible" center width="30%" @close="closeDialog">
		  <el-form :model="form1" :rules="rules1" ref="form1">
		    <el-form-item label="角色名称" prop="name" :label-width="formLabelWidth">
		      <el-input v-model="form1.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="描述" prop="desc" :label-width="formLabelWidth">
		      <el-input v-model="form1.desc" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click.native="submitForm1('form1')">确 定</el-button>
		    <el-button @click="addRoleVisible = false">取 消</el-button>
		  </div>
		</el-dialog>

		<el-dialog title="设置功能" :visible.sync="setRoleVisible" center width="30%" @close="closeDialog">
		    <el-tree
			  :data="treeData"
			  show-checkbox
			  default-expand-all
			  node-key="id"
			  ref="tree"
			  highlight-current
			  
			>
			</el-tree>
			<div slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="handleSetRole">确 定</el-button>
			    <el-button @click="setRoleVisible = false">取 消</el-button>
			</div>
		</el-dialog>

		<el-dialog title="编辑角色" :visible.sync="editRoleVisible" center width="30%" @close="closeDialog">
		  <el-form :model="form2" :rules="rules2" ref="form2">
		    <el-form-item label="角色名称" prop="name" :label-width="formLabelWidth">
		      <el-input v-model="form2.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="描述" prop="desc" :label-width="formLabelWidth">
		      <el-input v-model="form2.desc" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click.native="submitForm2('form2')">确 定</el-button>
		    <el-button @click="editRoleVisible = false">取 消</el-button>
		  </div>
		</el-dialog>

	</div>
</template>
<script>
export default{
	data() {
		return {
			loading: true,
			addRoleVisible: false,
			setRoleVisible: false,
			editRoleVisible: false,
			form1: {
				name: '',
				desc: ''
			},
			form2: {
				id: '',
				name: '',
				desc: ''
			},
			form3: {
				id: '',
				list: []
			},
			formLabelWidth: '120px',
			defaultProps: {
	          children: 'children',
	          label: 'label'
	        },
	        rules1:{
	        	name: [
	        		{required: true, message: '请输入角色名', trigger: 'blur'}
	        	]
	        },
	        rules2:{
	        	name: [
	        		{required: true, message: '请输入角色名', trigger: 'blur'}
	        	]
	        },
		}
	},
	methods: {
		/**添加角色-显示**/
	    showDialog() {
	    	this.addRoleVisible = true;
	    },
	    /**添加角色-提交**/
	    submitForm1(formName) {
	    	// this.form.role_list = this.$refs.tree.getCheckedKeys();
	    	this.$refs[formName].validate((valid) => {
	    		if (valid) {
	    			this.$store.dispatch('addRole', this.form1).then(() => {
	    				if (this.$store.state.user.roleAdd == 'success') {
	    					this.openNotify('操作成功', '角色新建成功!', 'success');
	    				} else {
	    					this.openNotify('操作失败', '角色新建不成功!', 'error');
	    				}

	    				for (let i in this.form1) {
	    					this.form1[i] = '';
	    				}

	    				this.addRoleVisible = false;
	    			}); 
	    		}
	    	})
	    },
	    
	    /**设置功能-显示**/
	    handleEditRole(row) {
	    	this.$store.dispatch('getRoleTreeSelectNode', row.id).then( () => {
	    		this.form3.id = row.id;
	    		this.setRoleVisible = true;

	    		setTimeout(() => {

	    			/**
	    			*清空当前选择的节点
	    			*/
	    			this.$refs.tree.setCheckedKeys([]);

	    			for (var i in this.treeSelected) {
	    				this.$refs.tree.setChecked(this.treeSelected[i], true);
	    			}
	    			
	    		}, 1);
	    	})

	    },
	    /**设置功能-提交**/
	    handleSetRole() {
	    	
	    	this.form3.list = this.$refs.tree.getCheckedKeys();

	    	this.$store.dispatch('putRole', this.form3).then( () => {

	    		if (this.$store.state.user.role_put_status.status != 'success') {

	    			this.openNotify('操作失败',this.$store.state.user.role_put_status.msg, 'error');

	    			return false;
	    		}

	    		this.openNotify('操作成功','功能修改成功', 'success');
	    		// this.$store.dispatch('getRoleTree').then(() => {
	    		// 	// this.$refs.tree.setCheckedNodes(this.treeData);
	    		// 	console.log(this.defaultTreeSelected);
	    		// });
	    		this.setRoleVisible = false;

	    	});
	    },
	    /**编辑角色-显示**/
	    handleEditUesr(row) {
	    	// this.form2.id = row.id;
	    	//this.editRoleVisible = true;
	    	this.$store.dispatch('getRoleOne', row.id).then((response) => {
	    		this.form2 = this.$store.state.user.role_info;
	    		this.editRoleVisible = true;
	    	});
	    },
	    /**编辑角色-提交**/
	    submitForm2(formName) {
	    	this.$refs[formName].validate((valid) => {
	    		if (valid) {
	    			this.$store.dispatch('updateRole', this.form2).then(() => {
	    				this.openNotify('操作成功','角色修改成功', 'success');
	    				this.editRoleVisible = false;
	    			});
	    		}
	    	});
	    },
	    /**删除**/
	    handleDelete() {},
	    
	    /**关闭diaglog的回调**/
	    closeDialog() {
	    	// this.treeSelected = [];
	    	// this.$refs.tree.setCheckedKeys(this.treeSelected, true);
	    	this.$store.dispatch('getRoleList');
	    },
	    openNotify(title,message, type) {
	        this.$notify({
	          title: title,
	          message: message,
	          type: type
	        });
	    },
	},
	created() {
		this.$store.dispatch('getRoleList').then(() => {
			this.loading = false;
		});
		this.$store.dispatch('getRoleTree');
	},
	computed: {
		tableData() {
			return this.$store.state.user.role_table_data;
		},
		treeData() {
			return this.$store.state.user.roleTreeData;
		},
		treeSelected() {
			return this.$store.state.user.tree_select;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.role-wapper
	width: 95%;
	height: 100%;
	.role-tool
		padding: 20px 20px;
		text-align: left !important;
	.table-wapper
		width: 100%;
		padding: 10px 20px;
		.el-table 
			box-shadow:  1px 2px 3px 4px rgba(0,0,0,0.1)
			th
				.cell
					text-align: center;
			.warning-row 
				background: normal;	
</style>