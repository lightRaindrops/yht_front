<template>
	<div class="table-wallper">
		<h3 class="title">管理本部门的内容分类</h3>
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
			      label="分类名称"
			    >
			    </el-table-column>
			    <el-table-column
			      prop="user"
			      label="添加人">
			    </el-table-column>
			    <el-table-column
			      prop="created"
			      label="添加时间">
			    </el-table-column>
				<el-table-column
			      prop="department"
			      label="部门名称">
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
		<div class="table-tool">
			<el-button type="primary"  @click="showAddDialog = true">添加分类</el-button>
		</div>
		<el-dialog title="添加文章分类" :visible.sync="showAddDialog" @close="resetForm">
		  	<el-form :model="form" :rules="rules" ref="form">
		    	<el-form-item label="分类名称" :label-width="'120px'" prop="name">
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
				name: '',
			},
			rules: {
				name: [
		            { required: true, message: '请输入文章名称', trigger: 'blur' },
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
			this.$store.dispatch('ArticleManagerCategory');
		},
		submit() {
			this.$refs.form.validate((valid) => {

				if (valid) {
					let action = 'ArticleCategoryPost';
					if (this.update) {
						action = 'ArticleCategoryPut';
					}

					this.$store.dispatch(action, this.form).then(() => {
						let response = this.$store.state.user.ArticleCategoryPost;
						if (this.update) {
							response = this.$store.state.user.ArticleCategoryPut;
						}

						if (response.status == 'success') {
							this.loadTable();
							this.$notify.success('操作成功');
							this.showAddDialog = false;
							
							this.update = false;
							this.resetForm();
						} else {
							this.$notify.error('操作失败'+response.errmsg);
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
		},
		
	},
	created() {
		this.init();
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.ArticleManagerCategory;
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
	.title
		font-size: 22px;
		font-weight: 400;
		color: #1f2f3d;
	.table-tool
		width: 100%;
		margin: 15px 0px;
		
</style>