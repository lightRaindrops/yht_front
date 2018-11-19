<template>
	<div class="cash-wappler">
		<div class="cash-form-container">
			<div class="cash-title">
				<h2>基础资料</h2>
			</div>
			<el-form :model="form" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" class="cash-form">
				<el-form-item label="项目名称" prop="name">
				    <el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="linkman">
				    <el-input v-model="form.linkman"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="phone">
				    <el-input v-model="form.phone"></el-input>
				</el-form-item>
				<el-form-item label="开票税率" prop="tax">
				    <el-input v-model="form.tax"></el-input>
				</el-form-item>
				<el-form-item label="配送">
				    <el-input v-model="form.dispatching"></el-input>
				</el-form-item>
				<el-form-item label="装卸">
				    <el-input v-model="form.unloading"></el-input>
				</el-form-item>
				<el-form-item label="服务人员">
				    <el-input v-model="form.waiter"></el-input>
				</el-form-item>
				<el-form-item label="报价日期">
				    <el-date-picker
				      v-model="form.date"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
			</el-form>
		</div>
		<div class="cash-product">
			<div class="cash-title">
				<h2>产品名称</h2>
			</div>
			<div class="table-tool">
				<el-button type="success" size="mini" @click.native="addRow">添加行</el-button>
				<el-button type="danger" size="mini" @click.native="deleteRow">删除行</el-button>
				<el-button type="warning" size="mini"  >保存</el-button>
			</div>
			<div class="cash-table-container">
				<el-table
				    :data="table"
				    border
				    style="width: 100%"
				    @selection-change="handleSelectionChange"
				>
				    <el-table-column
						type="selection"
						width="55"
				    >
				    </el-table-column>
				    <el-table-column
				      prop="id"
				      label="序号"
				    >
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="材料名称"
				    >
				    	<template slot-scope="scope">
				    		<el-input 
				    			size="mini"
								suffix-icon="el-icon-search"
								placeholder="请选择材料名称"
								v-model="tableDataForm[scope.row.id-1].name"
				    		></el-input>
				    	</template>
				    </el-table-column>
				    <el-table-column
						prop="spec"
						label="规格型号"
				    >
				    </el-table-column>
				    <el-table-column
						prop="units"
						label="单位"
				    >
				    </el-table-column>
				    <el-table-column
						prop="sums"
						label="数量"
				    >
				    </el-table-column>
				    <el-table-column
						prop="price"
						label="单价"
				    >
				    </el-table-column>
				    <el-table-column
						prop="amount"
						label="金额"
				    >
				    </el-table-column>
				    <el-table-column
						prop="brand"
						label="品牌"
				    >
				    </el-table-column>
				    <el-table-column
						prop="remark"
						label="备注"
				    >
				    </el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
	data() {
		return {
			form: {
				name: '',
				linkman: '',
				phone: '',
				tax: '',
				dispatching: '',
				unloading: '',
				waiter: '',
				date: new Date()
			},
			rules: {
				name: [
					{required: true, trigger: 'blur', message: "项目名称不能为空"}
				],
				linkman: [
					{required: true, trigger: 'blur', message: "联系人不能为空"}
				],
				phone: [
					{required: true, trigger: 'blur', message: "联系方式不能为空"}
				],
				tax: [
					{required: true, trigger: 'blur', message: "税率不能为空"}
				]
			},
			currentRow: 1,
			selectRow: [1],
			table: [
				{
					id: 1,
					name: '',
					date: '',
					spec: '',
					units: '',
					sums: '',
					price: '',
					amount: '',
					brand: '',
					remark: ''
				}
			],
			tableDataForm: [],
			defaultTableRow: {
				id: 1,
				name: '',
				date: '',
				spec: '',
				units: '',
				sums: '',
				price: '',
				amount: '',
				brand: '',
				remark: ''
			}
		}
	},
	methods: {
		addRow() {
			++this.currentRow;
			let Row = JSON.parse(JSON.stringify(this.defaultTableRow));
			Row.id = this.currentRow;

			this.table.push(Row);
			this.tableDataForm.push(Row);
			console.log(this.tableDataForm)
		},
		deleteRow() {
			this.selectRow.forEach(item => {
				this.table.some((tableItem,index) => {
					if (tableItem.id == item) {
						this.table.splice(index, 1);
						return true;
					}
				})

			});

			this.currentRow -= this.selectRow.length;
		},
		handleSelectionChange(val) {
			let list = [];

			val.every(item => {
				list.push(item.id);
			});

			this.selectRow = list;
		}
	},
	created() {
		let Row = JSON.parse(JSON.stringify(this.defaultTableRow));

		this.tableDataForm.push(Row);
	}
}	
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.cash-wappler
	width: 90%;
	height: 90%;
	border: 1px solid #ebebeb;
	margin: 30px auto;
	border-radius: 5px;
	position: relative;
	padding: 15px;
	box-shadow: 0 1px 2px rgba(26,26,26,.3);
	h2
		color: #1a1a1a;
		font-size: 14px;
		margin-bottom: 5px;
	.cash-title
		margin-bottom: 12px;
		border-bottom: 1px solid #ebebeb;
	.cash-form-container
		margin-top: 20px;
	.cash-product
		.table-tool
			padding-left: 15px;
		.cash-table-container
			padding: 15px;
</style>