<template>
	<div class="permisstion-wapper">
		<div class="table-wapper">
			<div class="per-tool">
				<el-button type="success" @click.native="openFuncDialog" icon="el-icon-plus">添加功能</el-button>
				<el-button type="warning" @click.native="openGroupDialog" icon="el-icon-plus">添加组</el-button>
				<el-button type="primary" @click.native="handleUpdateIconFile" icon="el-icon-star-off">图标文件设置</el-button>
			</div>
			<el-table
			    :data="tableData"
			    max-height="550"
			    v-loading="loading"
			    style="width: 100%;min-height: 300px;">
			    <el-table-column
			      prop="id"
			      fixed
			      label="序号">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      fixed
			      label="功能名称"
			      width="180">
			      <template slot-scope="scope">
			      	{{ scope.row.node_type === 'node' && scope.row.pid > 0 ? '　　　 |-'+scope.row.name : scope.row.name }}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="mobile_name"
			      label="移动端名称"
			      width="100">
			     	<template slot-scope="scope">
					   <el-tag
			          		type="danger"
			          		disable-transitions>
			          		{{scope.row.mobile_name}}
			      		</el-tag>
					</template>
			    </el-table-column>
			    <el-table-column
			      prop="show_pc"
			      label="PC端状态">
			      <template slot-scope="scope">
			        <el-tag
			          :type="scope.row.show_pc == 0 ? 'warning' : 'success'"
			          disable-transitions>{{scope.row.show_pc == 0 ? '隐藏' : '显示'}}</el-tag>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="show_mobile"
			      label="移动状态">
			      <template slot-scope="scope">
			        <el-tag
			          :type="scope.row.show_mobile == 0 ? 'warning' : 'success'"
			          disable-transitions>{{scope.row.show_mobile == 0 ? '隐藏' : '显示'}}</el-tag>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="pc_sort"
			      label="PC排序">
			      <template slot-scope="scope">
			        <el-tag
			          :type="scope.row.node_type === 'node' ? 'primary' : 'success'"
			          disable-transitions>{{scope.row.pc_sort}}</el-tag>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="mobile_sort"
			      label="移动排序">
			     <template slot-scope="scope">
			        <el-tag
			          :type="scope.row.node_type === 'node' ? 'primary' : 'success'"
			          disable-transitions>{{scope.row.mobile_sort}}</el-tag>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="classname"
			      label="图标类名"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="mobile_classname"
			      label="移动端图标类名"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="node_type"
			      label="功能类型"
			      width="100"
			      >
			      <template slot-scope="scope">
			        <el-tag
			          :type="scope.row.node_type === 'node' ? 'primary' : 'success'"
			          disable-transitions>{{scope.row.node_type == 'node' ? '功能节点' : '功能组'}}</el-tag>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="parentNode"
			      label="所属功能组"
			      width="100">
			    </el-table-column>
			    
			    <el-table-column
			      prop="front_path"
			      width="150"
			      label="前端路由">
			    </el-table-column>
			    <el-table-column
			      prop="mobile_path"
			      width="150"
			      label="移动端路由">
			    </el-table-column>
			    <el-table-column
			      prop="backend_path"
			      width="250"
			      label="控制器">
			    </el-table-column>
			    <el-table-column
			      prop="template_pc_name"
			      width="150"
			      label="PC端组件">
			    </el-table-column>
			    <el-table-column
			      prop="template_mobile_name"
			      width="150"
			      label="移动端组件">
			    </el-table-column>
			    
			    <el-table-column
			      fixed="right"
			      label="操作"
			      width="150"
			    >
			      <template slot-scope="scope">
			        <el-tooltip class="item" effect="dark" content="编辑功能" placement="top"  v-if="scope.row.node_type === 'node'">
			    		<el-button
				          size="mini"
				          type="primary"
				          @click="handleUpdateFunc(scope.row)"
				          ><i class="el-icon-edit-outline"></i>
				      	</el-button>
				    </el-tooltip>

				    <el-tooltip class="item" effect="dark" content="编辑组" placement="top"  v-else>
			    		<el-button
				          size="mini"
				          type="success"
				          @click="handleUpdateFunc(scope.row)"
				          ><i class="el-icon-edit-outline"></i>
				      	</el-button>
				    </el-tooltip>
					<el-tooltip class="item" effect="dark" content="删除" placement="top" >
						<el-button
				          size="mini"
				          type="danger"
				          icon="el-icon-delete"
				          @click="handleDeleteFunc(scope.row)"
				          >
				      	</el-button>
					</el-tooltip>
			      </template>
			    </el-table-column>
			</el-table>
		</div>
		
		<div class="dialog-wapper">
			<el-dialog :title="dialogTitle" :visible.sync="dialogFunction" @close="closeDialogFunc" center>
			  <el-form :model="funcForm" :inline="true" :rules="funcFormRules" ref="funcForm" label-width="100px" class="demo-funcForm" :style="{'max-width': '600px','box-sizing': 'border-box'}">
				  <el-form-item label="功能组" :style="{'text-align': 'left'}" prop="pid">
				  	<el-select v-model.trim="funcForm.pid" placeholder="请选择" :style="{width: '100%'}">
					    <el-option
					      v-for="item in groupOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="功能名称" prop="name">
				    <el-input v-model.trim="funcForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="移动端名称" prop="mobile_name">
				    <el-input v-model.trim="funcForm.mobile_name"></el-input>
				  </el-form-item>
				  <el-form-item label="前端路由" prop="front_path">
				    <el-input v-model.trim="funcForm.front_path"></el-input>
				  </el-form-item>
				   <el-form-item label="移动端路由" >
				    <el-input v-model.trim="funcForm.mobile_path"></el-input>
				  </el-form-item>
				  <el-form-item label="控制器" prop="backend_path">
				    <el-input v-model.trim="funcForm.backend_path" placeholder="多个控制器请用 | 隔开"></el-input>
				  </el-form-item>
				  <el-form-item label="图标类"  prop="classname">
				    <el-input v-model.trim="funcForm.classname"></el-input>
				  </el-form-item>
				  <el-form-item label="移动端图标类"  prop="classname">
				    <el-input v-model.trim="funcForm.mobile_classname"></el-input>
				  </el-form-item>
				   <br />
				  <el-form-item label="PC端显示" >
				    <el-switch
					  v-model="funcForm.show_pc"
					  active-color="#13ce66"
					  active-text="显示"
					  inactive-text="关闭">
					</el-switch>
				  </el-form-item>
				  <el-form-item label="移动端显示" >
				    <el-switch
					  v-model="funcForm.show_mobile"
					  active-color="#13ce66"
					  active-text="显示"
					  inactive-text="关闭">
					</el-switch>
				  </el-form-item>

				  <el-form-item label="PC端排序" >
				    <el-input v-model.trim="funcForm.pc_sort"></el-input>
				  </el-form-item>
				  <el-form-item label="移动端排序" >
				    <el-input v-model.trim="funcForm.mobile_sort"></el-input>
				  </el-form-item>
				  <el-form-item label="PC组件" style="width: 100%;height: 35px">
				  	<div class="upload-file">
				  		<el-button type="success" @click.native="chooseFile('component_pc')">选择文件</el-button>
				  		<input type="file" ref="component_pc" name="component_pc"  @change="handleComponent('component_pc')" />
				  		<span class="file-name">
							{{funcForm.component_pc.name}}
						</span>
				  	</div>
				  </el-form-item>

				  <el-form-item label="移动端组件" >
				  	<div class="upload-file">
				  		<el-button type="success" @click.native="chooseFile('component_mobile')">选择文件</el-button>
				  		<input type="file" ref="component_mobile" name="component_mobile"  @change="handleComponent('component_mobile')" />
				  		<span class="file-name">
							{{funcForm.component_mobile.name}}
						</span>
				  	</div>
					
				  </el-form-item>
				 
				</el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button type="primary" @click.native="submitFuncForm('funcForm')">确 定</el-button>
			    <el-button @click="dialogFunction = false">取 消</el-button>
			  </div>
			</el-dialog>

			<el-dialog title="图标文件修改" :visible.sync="dialogCssFile" center>
			  <el-form :model="cssForm" :rules="cssFormRules" ref="cssForm" label-width="100px" :style="{'max-width': '600px','box-sizing': 'border-box'}">
				  <el-form-item label="文件地址"  prop="value">
				    <el-input v-model.trim="cssForm.value"></el-input>
				  </el-form-item>
				  
				  <el-form-item label="描述">
				    <el-input type="textarea" v-model.trim="cssForm.description"></el-input>
				  </el-form-item>
				</el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button type="primary" @click.native="submitCssForm('cssForm')">确 定</el-button>
			    <el-button @click="dialogCssFile = false">取 消</el-button>
			  </div>
			</el-dialog>


		</div>
	</div>
</template>
<script>
export default {
	data() {
      return {
      	dialogFunction: false,//'新增功能' 显示状态
        dialogCssFile: false, //图标文件设置
        funcForm: {
        	id: '',
        	name: '',
        	front_path: '',//前端路由
        	backend_path: '', //后端路由
        	description: '', //描述
          	pid: 0,//功能组
          	node_type: 'node',
          	classname: '',
          	mobile_name: '',
          	mobile_path: '',
          	mobile_classname: '',
          	show_pc: true,
          	show_mobile: true,
          	component_pc: [],
          	component_mobile: [],
          	update: 0,
          	pc_sort: 0,
          	mobile_sort: 0

        },
        sourceFormData: [],
       	dialogTitle: '', 
        cssForm: {
        	name: '',
        	value: '',
        	description: ''
        },
        funcFormRules: {
          name: [
            { required: true, message: '请输入功能名称', trigger: 'blur' },
          ],
          mobile_name: [
            { required: true, message: '请输入功能名称', trigger: 'blur' },
          ],
          
          pid: [
            { required: true, message: '请选择功能组', trigger: 'blur' },
          ],

        },
        cssFormRules: {
        	value: [
        		{required: true, trigger: 'blur', message: '图标文件地址不能为空'}
        	]
        },
        selectedOptions: [],
        page: {
        	now: 1,
        	size: 10
        } ,
        loading: true
      }
    },
    methods: {
    	filterTag(value, row) {
	        return row.tag === value;
	    },
    	
      	/**添加功能显示**/
      	openFuncDialog() {
      		this.dialogTitle = '添加功能';
      		this.funcForm.node_type = 'node';
      		this.dialogFunction = true;
      	},
      	openGroupDialog() {
      		this.dialogTitle = '添加组';
      		this.funcForm.node_type = 'group';
      		this.dialogFunction = true;
      	},
      	/**提交功能创建表单**/
      	submitFuncForm(formName) {

      		this.$refs[formName].validate((valid) => {

      			let action = 'addGroup';
      			let formData = new FormData;
      			let data = this.funcForm;
	      		data.show_pc = Number(data.show_pc);
	      		data.show_mobile = Number(data.show_mobile);

	      		for (let i in data) {
	      			
	      			formData.append(i, data[i]);
	      		}

	      		if (data.id > 0 && data.update > 0) {
	      			action = 'updatePermission';
	      		} 

	      		this.$store.dispatch(action, formData).then(() => {

	      			if (this.$store.state.user.add_group.status == 'success') {

	      				this.$notify.success({title:'操作成功'});
        				this.resetForm();
	      				this.loadTable();
	      			} else {

	      				this.$notify.error({title:'操作失败', 'message': this.$store.state.user.add_group.error});
	      			}

	      			this.dialogFunction = false;

	      		})
      		})
     	
      	},
      	
      	handleChange(value) {
        	this.funcForm.pid = value[value.length - 1];
      	},
      	
      	/**
      	* 表格数据加载
      	*/
      	loadTable() {
      		this.loading = true;
      		this.$store.dispatch('getFunctionTable', this.page).then(() => {this.loading = false});
      	},

      	/**
      	* 更新功能 --显示
      	*/
      	handleUpdateFunc(row) {

      		for (var i in row) {

      			for (let ii in this.funcForm) {

      				if (ii == i) {
      					this.funcForm[ii] = row[i];
      				}
      			}
      			
      		}

      		this.funcForm.show_pc = Boolean(this.funcForm.show_pc);
      		this.funcForm.show_mobile = Boolean(this.funcForm.show_mobile);
      		this.funcForm.update = 1;
      		this.dialogTitle = '更新';
      		this.dialogFunction = true;
      		
      	},
      	closeDialogFunc() {

      		this.funcForm.update = 0;

      		this.resetForm();

      	},
      	/**图标地址 -- 更改显示**/
      	handleUpdateIconFile() {

      		let obj = this.$store.state.user.iconUrl;
      		
      		for (let i in obj) {
      			this.cssForm[i] = obj[i];
      		}

      		this.dialogCssFile = true;
      	},
      	/**图标地址 --提交**/
      	submitCssForm(formName) {
      		
      		this.$refs[formName].validate((valid) => {

      			if (valid) {

      				this.$store.dispatch('updateIconCssFile', this.cssForm).then(() => {

      					if (this.$store.state.user.updateIconCssFile.status == 'success') {

      						this.$notify.success({title: '操作成功', message: '文件更新完毕'});

      						this.dialogCssFile = false;

      					} else {

      						this.$notify.error({title: '操作失败', message: '文件更新不成功'});
      					}
      				});
      			}
      		});
      	},
      	/**获取图标文件地址**/
      	loadIconUrl(){
      		this.$store.dispatch('loadIconUrl');
      	},
      	/**组件上传 ---选择文件**/
      	chooseFile($name) {
      		this.$refs[$name].click();
      	},
      	handleComponent($name) {
      		if (this.$refs[$name].files.length > 0) {

      			this.funcForm[$name] = this.$refs[$name].files[0];
      		}
      	},
      	resetForm() {
      		for (var i in this.sourceFormData ) {
      			this.funcForm[i] = this.sourceFormData[i];
      		}
      	},
      	handleDeleteFunc(row) {
      		this.$confirm('此操作将删除该 <'+row.name+'>, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
	          
	        	this.$store.dispatch('DeletePermission',{id:row.id}).then(() => {
	        		let response = this.$store.state.user.DeletePermission;

	        		if (response.status == 'success') {
	        			this.$notify.success({title: '操作成功'});
	        			this.loadTable();
	        		} else {
	        			this.$notify.error({title: '操作失败', message: response.msg});
	        		}
	        	})

	        }).catch(() => {
	               
	        });
      	}
    },
    created() {
    	this.sourceFormData = Object.assign({}, this.funcForm); //复制对象
    	this.$store.dispatch('getGroups');//获取功能组
    	this.loadTable();
    },
    computed: {
    	groupOptions() {
        	let opt = [{value: 0,label:'全局'}];
        	let list = this.$store.state.user.groups;

        	if (list.length > 0) {
        		for (let i in list) {
        			opt.push(list[i]);
        		}
        	}

        	return opt;
    	},
    	tableData() {
    		 
    		return this.$store.state.user.functionTableData;
    	}
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scope>
.permisstion-wapper
	width: 100%;
	height: 100%;
	.table-wapper
		box-sizing: border-box;
		// max-width: 80% !important;
		padding: 30px 20px;
		.per-tool
			padding: 20px 0px;
			text-align: left !important;
	.pagination
		box-sizing: border-box;
		padding: 5px 20px;
		max-width: 80% !important;
	.dialog-wapper
		.el-dialog
			max-width: 650px !important;
			margin-top: 10vh !important;
		.upload-file
			input[type='file']
				display: none
		.file-name
			font-size: 12px;
			// padding-:5px;
			margin-left: 15px;
</style>