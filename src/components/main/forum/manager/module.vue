<template>
	<div class="table-wallper">
		<div class="table-tool">
			<p>
				<el-button type="success" @click="showAddDialog = true">添加版块</el-button>
			</p>
		</div>
		<div class="table">
			<el-table
			    :data="tableData"
			    height="250"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="id"
			      label="序号"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="版块名称"
			    >
			    </el-table-column>
                <el-table-column
			      prop="disable"
			      label="状态">
                  <template slot-scope="scope">
                      <el-tag v-if="scope.row.disable == 0" type="success">正常</el-tag>
                      <el-tag v-else type="warning">禁用</el-tag>
                  </template>
			    </el-table-column>
			    <el-table-column
			      prop="created"
			      label="添加时间">
			    </el-table-column>
			    <el-table-column
			    	prop="id"
			      	label="操作"
				  	width="250"

			      >
			      	<template  slot-scope="scope">
			      		<el-button type="success" @click.native="handleEidt(scope.row.id, scope.row.name)">
			      			编辑
			      		</el-button>
			      	</template>
			    </el-table-column>
			</el-table>
		</div>	
		<el-dialog title="添加版块" :visible.sync="showAddDialog" @close="resetForm">
		  	<el-form :model="form" :rules="rules" ref="form">
		    	<el-form-item label="版块名称" :label-width="'120px'" prop="name">
		      		<el-input v-model="form.name" auto-complete="off"></el-input>
		    	</el-form-item>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="showAddDialog = false">取 消</el-button>
		    	<el-button type="primary" @click="submit">确 定</el-button>
		  	</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			showAddDialog: false,
			form: {
				id: '',
				name: ''
			},
			rules: {
				name: [
		            { required: true, message: '请输入版块名称', trigger: 'blur' },
		            { min: 3, max: 5, message: '长度在 3 到 6 个字符', trigger: 'blur' }
		        ],
			},
			defaultForm: {},
			update: false,
		}
	},
	methods: {

		init() {
			this.loadTable();
			this.defaultForm = JSON.parse(JSON.stringify(this.form));
		},
		loadTable() {
			this.$store.dispatch('GetForumModuleTable');
		},
		submit() {
			this.$refs.form.validate((valid) => {

				if (valid) {
					let action = 'ForumModuleStore';
					if (this.update) {
						action = 'ForumModuleStore';
					}

					this.$store.dispatch(action, this.form).then(() => {
						let response = this.$store.state.user.ForumModuleStore;
						
						if (response.status == 'success') {
							this.loadTable();
							this.$notify.success('操作成功');
							this.showAddDialog = false;
							
							this.update = false;
							this.resetForm();
						} else {
							this.$notify.error('操作失败');
						}
					});
				}
			});
		},
		handleEidt(id, name) {
			this.showAddDialog = true;
			this.update = true;
			this.form.id = id;
			this.form.name = name;
		},
		resetForm() {
			for (let i in this.defaultForm) {
				this.form[i] = this.defaultForm[i];
			}
		}
	},
	created() {
		this.init();
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.ForumModuleTableData;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.table-wallper
	width: 100%;
	height: 100%;
	padding: 15px 30px;
	position: relative;
	.table-tool
		width: 100%;
		p
			text-align: left;
</style>