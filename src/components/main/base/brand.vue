<template>
	<div class="brand-wapper">
		<div class="brand-tool">
			<el-button type="success" @click.native="addVisible = true">新增品牌</el-button>
		</div>
		<el-dialog title="新增品牌" :visible.sync="addVisible" center width="30%" @close="dialogCallback">
		  <el-form :model="form1" :rules="rules1" ref="form1">
		    <el-form-item label="品牌名称" prop="name" :label-width="formLabelWidth">
		      <el-input v-model.trim="form1.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
		      <el-input v-model.trim="form1.description" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click.native="submitForm1('form1')">确 定</el-button>
		    <el-button @click="addVisible = false">取 消</el-button>
		  </div>
		</el-dialog>

		<el-dialog title="修改品牌" :visible.sync="updateVisible" center width="30%" @close="dialogCallback">
		  <el-form :model="form2" :rules="rules1" ref="form2">
		    <el-form-item label="品牌名称" prop="name" :label-width="formLabelWidth">
		      <el-input v-model.trim="form2.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
		      <el-input v-model.trim="form2.description" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click.native="submitForm2('form2')">确 定</el-button>
		    <el-button @click="updateVisible = false">取 消</el-button>
		  </div>
		</el-dialog>

		<div class="table-wapper">
			<el-table
			    :data="tableData"
			    v-loading="loading"
			    style="width: 100%"
			   >
			    <el-table-column
			      prop="id"
			      label="id"
			      width="180"
			    >
			    </el-table-column>
			    <el-table-column
			    	prop="name"
			    	label="品牌名"
			    >
				</el-table-column>
			    <el-table-column
			    	prop="description"
			    	label="描述"
			    >
			    </el-table-column>
			    <el-table-column
			    	prop="status"
			    	label="状态"
			    >
			    <template slot-scope="scope">
			    	<el-tag
			          :type="scope.row.status == 1 ? 'success' : 'danger'"
			          disable-transitions>{{scope.row.status == 1 ? '可用' : '不可用'}}</el-tag>
			    </template>
			    </el-table-column>
			    <el-table-column
			    	label="操作"
			    >
			    	<template slot-scope="scope">
			    		<el-tooltip class="item" effect="dark" content="编辑" placement="top">
				    		<el-button
					          size="mini"
					          type="success"
					          @click="handleUpdate(scope.row)"><i class="el-icon-edit-outline"></i>
					      	</el-button>
					    </el-tooltip>
	
					    <el-tooltip class="item" effect="dark" content="禁用" placement="top" v-if="scope.row.status == 1">
					        <el-button
					          size="mini"
					          type="danger"
					          @click="handleDisable(scope.row)"><i class="iconfont icon-jinyong"></i>
					      	</el-button>
					    </el-tooltip>
					    <el-tooltip class="item" effect="dark" content="启用" placement="top" v-else>
					        <el-button
					          size="mini"
					          type="success"
					          @click="handleEnable(scope.row)"><i class="iconfont icon-qiyong"></i>
					      	</el-button>
					    </el-tooltip>
				    </template>
			    </el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		
		return {
			dialogTitle: '新增品牌',
			loading: false,
			addVisible: false,
			updateVisible: false,
			formLabelWidth: '120px',
			isUpdate: false,
			form1: {
				name: '',
				description: ''
			},
			form2: {
				id: '',
				name: '',
				description: ''
			},
			rules1: {
				name: [
					{required: true, trigger: 'blur', message: '品牌名称不能为空'}
				]
			}
		}
	},
	methods: {
		/**新增品牌 --提交**/
		submitForm1(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$store.dispatch('createBrand', this.form1).then(() => {

						//console.log(this.$store.state.user.createBrandStatus );

						if (this.$store.state.user.createBrandStatus == 'success') {

							this.$notify.success({title: '操作成功', message: '品牌添加完毕'});

							this.addVisible = false;

							for(var i in this.form1) {
								this.form1[i] = '';
							}

							this.loadTable();
						} else {

							this.$notify.error({title: '操作失败', message: '品牌添加不成功'});
						}
					});
				}
			})
		},
		/**修改品牌 --初始化显示**/
		handleUpdate(row) {
			
			for (var i in this.form2) {
				this.form2[i] = row[i];
			}

			this.updateVisible = true;
		},
		/**修改品牌 --验证提交**/
		submitForm2(formName) {
			
			this.$refs[formName].validate((valid) => {

				if (valid) {

					this.isUpdate = true;

					this.$store.dispatch('updateBrand', this.form2).then(() => {

						if (this.$store.state.user.updateBrandStatus.status == 'success') {

							this.$notify.success({title: '操作成功', message: '品牌更新完毕'});

							this.updateVisible = false;

							for(var i in this.form2) {

								this.form2[i] = '';
							}

						} else {

							this.$notify.error({title: '操作失败', message: this.$store.state.user.updateBrandStatus.error});
						}


					});
				}
			})
		},

		/**启用状态 **/
		handleEnable(row) {
			this.$confirm('该操作将启用品牌 <'+row.name+'> , 是否继续？', '提示',{type: 'warning'}).then(() => {

				this.updateBrandStatus({id: row.id, status:1});

			});
		},
		
		/**禁用状态**/
		handleDisable(row) {
			this.$confirm('该操作将禁用品牌 <'+row.name+'> , 是否继续？', '提示',{type: 'warning'}).then(() => {

				this.updateBrandStatus({id: row.id, status:0});

			});
		},
		/**加载表格**/
		loadTable() {
			this.loading = true;

			this.$store.dispatch('brandList').then( () => {
				this.loading = false;
			} );
		},

		/**状态保存**/
		updateBrandStatus(info) {

			this.$store.dispatch('updateBrandStatus', info).then(() => {

				if (this.$store.state.user.updateBrandEnableStatus == 'success') {

					this.$notify.success({title: '操作成功'});

					this.loadTable();

				} else {
					this.$notify.error({title: '操作失败'});
				}
			});
		},

		dialogCallback() {
			if (this.isUpdate) {
				this.loadTable();
				this.isUpdate = false;
			}
		}
	},
	created() {
		this.loadTable();
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.brandList;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.brand-wapper
	width: 100%;
	position: relative;
	.brand-tool
		padding: 20px 20px;
		text-align: left !important;
	.table-wapper
		padding: 20px;
		.iconfont
			font-size: 12px;
</style>