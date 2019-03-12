<template>
	<div class="table-wallper">
		<h3 class="title">管理内容分类</h3>
		<div class="table">
			<el-table
			    :data="tableData"
			    height="450"
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
			      		<el-button type="success" @click.native="handleEidt(scope.row.id, scope.row.name, scope.row.module_id)">
			      			编辑
			      		</el-button>
                <el-button type="danger" @click.native="handleDel(scope.row.id)">
                  删除
                </el-button>
			      	</template>
			    </el-table-column>
			</el-table>
		</div>	
		<div class="table-tool">
			<el-button type="primary"  @click="showAddDialog = true">添加分类</el-button>
		</div>
		<el-dialog :title="title" :visible.sync="showAddDialog" @close="resetForm">
		  	<el-form :model="form" :rules="rules" ref="form">
		    	<el-form-item label="分类名称" :label-width="formItemWidth" prop="name">
		      		<el-input v-model="form.name" auto-complete="off"></el-input>
		    	</el-form-item>
				  <el-form-item v-if="isAdmin" label="所属模块" :label-width="formItemWidth">
              <el-select v-model="form.module_id">
                <el-option v-for="(item, key) in ForumModule" :key="key" :label="item.label" :value="item.value"></el-option>
              </el-select>
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
      formItemWidth: '120px',
			showAddDialog: false,
			form: {
				id: '',
				name: '',
        module_id: "",
			},
			rules: {
				name: [
		            { required: true, message: '请输入文章名称', trigger: 'blur' },
		            { min: 2, max: 5, message: '长度在 2 到 6 个字符', trigger: 'blur' }
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
		handleEidt(id, name,module_id) {
			this.showAddDialog = true;
			this.update = true;
			this.form.id = id;
			this.form.name = name;

			if (this.isAdmin) {
			  this.form.module_id = module_id;
      }
		},
    handleDel(id) {
        this.$confirm('删除该分类，则本分类下的文章则会自动更新到默认分类下，是否继续？','提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$store.dispatch('ArticleCategoryDelete', {id:id}).then(() => {
                let response = this.$store.state.user.ArticleCategoryDelete;
                console.log(response);
                if (response.status == 'success') {
                    this.$notify.success('操作成功');
					this.loadTable();
                }
                else {
                    this.$notify.error('操作失败');
                }
            });
        }).catch(() => {

        });
    },
		resetForm() {
			for (let i in this.defaultForm) {
				this.form[i] = this.defaultForm[i];
			}
			this.$refs.form.resetFields();
			this.update = false;
		},
		
	},
	created() {
		this.init();
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.ArticleManagerCategory;
		},
    isAdmin: function() {
      return this.$store.state.user.userInfo.isadmin;
    },
    ForumModule: function() {
      let data = this.$store.state.user.ForumModule,Item = [];
      data.forEach((item) => {
        if (item.id > 0) {
          Item.push({label:item.name,value:item.id});
        }
      });

      return Item;
    },
    title: function() {
		  if (this.update === true) {
		    return '修改文章分类';
      }
		  return '添加文章分类';
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
