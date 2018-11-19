<template>
	<div class="bind-wapper">
		<div class="bind-tool">
			<el-button type="success" @click.native="ShowBindVisible">增加绑定</el-button>
		</div>
		<el-table
			:data="tableData"
			v-loading="tableLoading"
			class="bindattr-table"
			border
		>
			<el-table-column prop="id" label="序号"></el-table-column>
			<el-table-column prop="name" label="实体名称"></el-table-column>
			<el-table-column prop="key" label="属性标识"></el-table-column>
			<el-table-column prop="module_name" label="功能模块"></el-table-column>
			<el-table-column prop="enumberate_name" label="枚举名称"></el-table-column>
			<!-- <el-table-column prop="enumberate_id" label="枚举名称"></el-table-column> -->
			<el-table-column prop="id" label="操作">
				<template slot-scope="scope">
					<el-button type="success" size="mini" @click="BindUpdate(scope.row)">更换</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
		  title="属性绑定"
		  :visible.sync="BindVisible"
		  :before-close="BindClose"
		  @open="BindOpen"
		  width="30%"
		>
			<p style="font-size: 12px;color:red;text-align:center;margin:0px;">当前版本暂只支持枚举类型的绑定</p>
			<el-form :model="BindForm" :rules="BindFormRules" ref="BindForm">
				<el-form-item prop="name" label="实体名称" :label-width="formLabelWidth">
					<el-input v-model.trim="BindForm.name"></el-input>
				</el-form-item>
				<el-form-item prop="key" label="属性标识" :label-width="formLabelWidth">
					<el-input v-model.trim="BindForm.key"></el-input>
				</el-form-item>
				<el-form-item prop="module_id" label="功能模块" :label-width="formLabelWidth">
					<el-select v-model="BindForm.module_id">
						<el-option-group
							v-for="(group,key) in permissionOption" :label="group.label" :value="group.value" :key="key"
						>
							<el-option v-for="(item,key) in group.options" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-option-group>
					</el-select>
				</el-form-item>
				<el-form-item prop="enumberate_id" label="枚举名称" :label-width="formLabelWidth">
					<el-select v-model="BindForm.enumberate_id">
						<el-option 
							v-for="(item , key) in EnumList"
							:label="item.label"
							:value="item.value"
							:key = "key"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		   		<el-button @click="BindVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitForm" :loading="submiting">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			BindVisible: false,
			tableLoading: false,
			formLabelWidth: '120px',
			BindForm: {
				id: '',
				name: "",
				key: "",
				module_id: "",
				enumberate_id: ""
			},
			BindFormRules: {
				name: [
					{required: true, trigger: 'blur', message: "实体名称必须填写"}
				],
				key: [
					{required: true, trigger: 'blur', message: "实体名称必须填写"},
					{validator: this.onlyString}
				],
				module_id: [
					{required: true, trigger: 'blur', message: "必须选择功能模块"},
				],
				enumberate_id: [
					{required: true, trigger: 'blur', message: "必须选择枚举类型"},
				],
			},
			submiting: false
		}
	},
	methods: {
		init() {
			this.$store.dispatch('getFunctionTable').then(() =>{
				this.permissionOption;
			});
			this.table();
		},
		table() {
			this.tableLoading = true;
			this.$store.dispatch('getBindAttrList').then(() => {
				this.tableLoading = false;
			});
		},
		ShowBindVisible() {
			this.BindVisible = true;
		},
		BindOpen() {},
		BindClose() {
			this.reset('BindForm');
			this.update = false;
			this.BindVisible = false;
		},
		BindUpdate(row) {

			this.update = true;

			for( let i in row) {
				this.BindForm[i] = row[i];
			}

			this.BindVisible = true;
			console.log(this.BindForm);
		},
		submitForm() {
			this.$refs['BindForm'].validate((valid) => {
				if (valid) {
					this.submiting = true;
					
					let action = 'AddBindAttr';

					if (this.update) {
						action = 'UpdateBindAttr';
					}

					this.$store.dispatch(action, this.BindForm).then(() => {
						let response = this.$store.state.user.AddBindAttr;
						this.submiting = false;
						
						if (response.status == 'success') {
							this.$notify.success('操作成功');
							this.table();
							this.BindVisible = false;
							this.reset('BindForm');
						}
						else {
							this.$notify.error('操作失败' + response.errmsg);
						}
					});
				}
			});
		},

		onlyString(rule, value, callback) {
			let res =  /^[a-zA-Z\_]+$/.test(value);
			
			if (res) {
				callback();
			} else {
				callback(new Error("字段名只能是字母和下划线"));
			}
		},
		reset(formName) {
		
			this.$refs[formName].resetFields();

			for (let i in this.BindForm) {
				this.BindForm[i] = "";
			}
		}
	},
	created() {
		this.init();
	},
	computed: {
		permissionOption: function() {
			let list = this.$store.state.user.functionTableData, data = [], o = 0;
			//console.log(this.$store.state.user.functionTableData)
			list.forEach((items, index) => {
				let item = {};
				if (items.node_type == 'group') {
					item.id = items.id;
					item.label = items.name;
					item.options = [];
					data.push(item);
					// list.splice(index,1);
					++o;
				}
				
			});
			
			list.forEach((item,index) => {
				
				for (let i in data) {
					if (item.pid == data[i].id && item.node_type == 'node') {
						data[i].options.push({label: item.name, value: item.id}); 
						
					}
 				}
			});

			data[o] = {label: '其他', options: []};

			list.forEach((item) => {
				if (item.front_path != null && item.pid == 0) {
					data[o].options.push({label: item.name, value: item.id});
				}
			})
			
			data.forEach((item, index) => {
				if (item.options.length < 1) {
					data.splice(index, 1);
				}
			});

			return data;
		},
		EnumList: function() {
			let data = this.$store.state.user.Enumberate, list = [];

			data.forEach((item) => {
				let obj = {};
				obj.value = item.id;
				obj.label = item.name;

				list.push(obj);
			});

			return list;
		},
		tableData: function() {
			return this.$store.state.user.BindAttrList;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.bindattr-table
	margin-top: 15px;
</style>