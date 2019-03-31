<!--应收枚举组件-->
<template>
	<div class="enumberate-wapper">
		<div class="e-tool">
			<el-button type="success" @click.native="EnumAdd">添加枚举</el-button>
			<el-button type="primary" @click.native="EnumModify">编辑</el-button>
		</div>
		<div class="card">
			<div class="card-item left">
				<el-table :data="EnuList" class="enumberate-table" border height="320" highlight-current-row @row-click="handleCurrentChange">
					<el-table-column prop="name" label="枚举类型名称">
						<template slot-scope="scope">
							<span :class="{active:rowIndex == scope.row.index}" style="cursor: pointer">{{scope.row.name}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="card-item right">
				<el-table :data="EnuListItem" class="enumberate-table" border height="320">
					<el-table-column prop="label" label="枚举项名称"></el-table-column>
					<el-table-column prop="value" label="枚举项值"></el-table-column>
					<el-table-column prop="index" label="序号"></el-table-column>
					<el-table-column prop="disable" label="是否禁用">
						<template slot-scope="scope">
							<span v-if="scope.row.disable == 0">否</span>
							<span v-if="scope.row.disable == 1">是</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog
		  title="枚举类型"
		  :visible.sync="EnumVisible"
		  :before-close="EnumClose"
		  @open="EnumOpen"
		  width="30%"
		>
			<el-button type="success" size="mini" @click.native = "AddRow">新增行</el-button><el-button type="danger" size="mini" @click.native="RowRemove">删除行</el-button>
			<el-form :model="form" :rules="FormRules" ref="EnumForm" class="enum-form">
				<el-form-item label="枚举类型名称" prop="name" :label-width="formLabelWidth">
					<el-input v-model.trim="form.name"></el-input>
				</el-form-item>
			</el-form>
			<el-table class="enumberate-table" border :data="EnumForm" highlight-current-row @row-click="EnumCurrentChange">
				<el-table-column type="index" :index="indexMethod" v-if="false"></el-table-column>
				<el-table-column prop="name" label="枚举项名称">
					<template slot-scope="scope">
						<el-input v-model="EnumForm[scope.$index].name"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="value" label="枚举项值">
					<template slot-scope="scope">
						<el-input v-model="EnumForm[scope.$index].value"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="index" label="序号">
					<template slot-scope="scope">
						<el-input v-model="EnumForm[scope.$index].index"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="disable" label="是否禁用">
					<template slot-scope="scope">
						<el-checkbox v-model="EnumForm[scope.$index].disable">禁用</el-checkbox>
					</template>
				</el-table-column>
			</el-table>
			<p style="font-size: 12px;color:red;text-align:center;margin-bottom: 0px;" v-if="showErrmsg">枚举项名称不能为空!</p>
			<span slot="footer" class="dialog-footer">
		   		<el-button @click="EnumVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitForm">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			update: false,
			rowIndex: 0,
			EnumVisible: false,
			formLabelWidth: '120px',
			form: {
				id: "",
				name: "",
			},
			FormRules:{
				name: [
					{required: true, trigger: 'blur', message: '枚举类型不能为空'}
				]
			},
			defaultFormData: {
				name: "",
				value: "",
				index: "",
				disable: 0
			},
			EnumForm: [],
			ItemKey: [],
			defaultIndex: 0,
			CurrentKey: "",
			CurrentParentRow: {id: "",name: ""},
			showErrmsg: false,
		}
	},
	methods: {
		init() {
			this.GetEnumberate();
		},
		 
		handleCurrentChange(val) {
			 
	        this.EnuList.forEach((item, index) => {
	        	if (item.id == val.id) {
	        		this.CurrentParentRow = item;
	        		this.defaultIndex = index;	
	        	}
	        });
		    
	    },
	    AddRow() {
	    	let item = JSON.parse(JSON.stringify(this.defaultFormData)),
	    		rowKey = this.buildKey();
	    	

	    	item.rowKey = rowKey;
	    	this.EnumForm.push(item);
	    	this.ItemKey.push(rowKey);
	    },
	    buildKey() {
	    	let len = 10, 
	    		rowKey = "",
	    		string = "qwertyuioplkjhgfdsazxcvbnm";

	    	for(let i = 0; i < len; ++i) {
	    		let num = Math.floor(Math.random() * string.length + Math.random());
	    		rowKey += string[num];
	    	}

	    	return rowKey;
	    },
	    indexMethod(index) {
	    	return index;
	    },

	    EnumOpen() {
	    	this.showErrmsg = false;
	    },
	    EnumClose() {
	    	this.EnumForm = [];
	    	this.EnumVisible = false;
	    	this.update = false;
	    },
	    EnumCurrentChange(val) {
	    	console.log(val)
	    	this.CurrentKey = val.rowKey;
	    },
	    RowRemove() {
	    	
	    	if (this.CurrentKey != '') {
		    	this.EnumForm.forEach((item, index) => {
		    		if (item.rowKey == this.CurrentKey) {
		    			this.EnumForm.splice(index, 1);
		    			this.CurrentKey = '';
		    		}
		    	});
		    } else {
		    	this.EnumForm.pop();
		    }
	    },
	    EnumAdd() {
	    	this.AddRow();
	    	this.EnumVisible = true;
	    },
	    EnumModify() {
	    	let newArr = [];
	    	this.form.name = this.CurrentParentRow.name;
	    	this.form.id = this.CurrentParentRow.id;
	    	this.EnumVisible = true;
	    	this.update = true;
	    	this.CurrentParentRow.item.forEach((item) => {
	    		let obj = {};
	    		obj.id 		= item.id;
	    		obj.name 	= item.label;
	    		obj.value 	= item.value;
	    		obj.index 	= item.index;
	    		obj.disable = Boolean(item.disable);
	    		obj.rowKey 	= this.buildKey();
	    		newArr.push(obj);
	    	});

	    	this.EnumForm = newArr;
	    },

	    submitForm() {
	    	this.showErrmsg = false;
	    	this.EnumForm.forEach((item) => {
	    		if (item.name == '') {
	    			this.showErrmsg = true;
	    		}
	    	});

	    	if (this.showErrmsg) {
	    		return false;
	    	}
	    	
	    	this.$refs['EnumForm'].validate((valid) => {

	    		if (valid) {

	    			let action = 'AddEnumberate';

	    			if (this.update) {
	    				action = 'UpdateEnumberate';
	    			}

		    		this.$store.dispatch(action, {name: this.form.name,id:this.form.id,item: this.EnumForm}).then(() => {
		    			let response = this.$store.state.user.AddEnumberate;

		    			if (response.status == 'success') {
		    				this.$notify.success('操作成功');
		    				this.GetEnumberate();
		    				this.EnumVisible = false;
		    			} 
		    			else {
		    				this.$notify.error('操作失败:' + response.errmsg);
		    			}
		    		});
		    	}
	    	});
	    },
	    GetEnumberate() {
	    	this.$store.dispatch('GetEnumberate');
	    }
	},
	created(){
		this.init();
	},
	computed:  {
		EnuList: function() {
			let data = this.$store.state.user.Enumberate;

			if (data.length > 0) {
				this.CurrentParentRow = data[0];
			}

			return data;
		},
		EnuListItem: function() {
			if (this.EnuList.length > 0) {
				return this.EnuList[this.defaultIndex].item;
			}
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.enumberate-wapper
	width:100%;
	height: 100%;
	position: relative;
	.e-tool
		padding-left: 20px;
	.card
		height: 400px;
		padding: 20px;
		margin-top: 15px;
		width: 100%;
		// border: 1px solid #ebebeb;
		display: flex;
		.card-item
			position: relative;
		.left
			flex-basis: 200px;
			overflow: hidden;
		.right
			flex: 1;
			margin-left: 15px;
	.enum-form
		margin-top: 15px;
</style>