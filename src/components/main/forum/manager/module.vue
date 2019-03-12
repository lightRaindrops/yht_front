<template>
	<div class="table-wallper">
		<div class="table-tool">
			<p>
				<el-button type="success" @click="showAddDialog = true">添加版块</el-button>
				<el-button type="success" @click="updateModules">更新版块</el-button>
			</p>
		</div>
		<div class="table">
			<el-table
			    :data="tableData"
			    height="450"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="index"
			      label="排序"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="版块名称"
			    >
			    </el-table-column>
                <el-table-column
			      prop="id"
			      label="排序"
			      v-if="false"
                >
			    </el-table-column>
			    <el-table-column prop="attr" label="属性">

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
			      		<el-button type="success" @click.native="handleEidt(scope.row)">
			      			编辑
			      		</el-button>
                        <el-button type="danger" @click.native="handleDel(scope.row.id, scope.row.name)">
                            删除
                        </el-button>
			      	</template>
			    </el-table-column>
			</el-table>
		</div>	
		<el-dialog :title="title" :visible.sync="showAddDialog" @close="resetForm">
		  	<el-form :model="form" :rules="rules" ref="form">
		    	<el-form-item label="版块名称" :label-width="'120px'" prop="name">
		      		<el-input v-model="form.name" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="排序" :label-width="'120px'">
                    <el-input v-model="form.index"></el-input>
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
				name: '',
				index: 0,
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
						action = 'ForumModuleUpdate';
					}

					this.$store.dispatch(action, this.form).then(() => {
						let response = this.$store.state.user.ForumModuleStore;
						
						if (response.status == 'success') {
							this.loadTable();
							this.$notify.success('保存成功');
							this.showAddDialog = false;
							this.updateModules();
							this.update = false;
							this.resetForm();
						} else {
							this.$notify.error('操作失败');
						}
					});
				}
			});
		},
		handleEidt(row) {
			this.showAddDialog = true;
			this.update = true;
			this.form.id = row.id;
			this.form.name = row.name;
			this.form.index = row.index;
		},
		handleDel(id, name) {
			this.$confirm('删除模块<'+name+'>, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch('ForumModuleDel', {id:id}).then(() => {
					let response = this.$store.state.user.ForumModuleStore;

					if (response.status == 'success') {
						this.$notify.success('操作成功');
						this.loadTable();
					}
					else {
						this.$notify.error('操作失败'+response.errmsg);
					}
				});
			}).catch(() => {

			});
		},
		resetForm() {
			for (let i in this.defaultForm) {
				this.form[i] = this.defaultForm[i];
			}
			this.update = false;
		},
		updateModules() {
			this.$store.dispatch('ForumModuleSync').then(() => {
				let response = this.$store.state.user.ForumModuleSync;

				if (response.status == 'success') {
					this.$notify.success('刷新成功');
					this.loadTable();
				}
				else {
					this.$notify.error('操作失败'+response.errmsg);
				}
			});
		}
	},
	created() {
		this.init();
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.ForumModuleTableData;
		},
		title: function() {
		    if (this.update) {
		        return '修改版块';
		    }
		    return '添加版块';
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