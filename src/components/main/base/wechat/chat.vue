<template>
	<div class="containers">
		<div class="tool">
			<el-button type="success" @click.native = "FormVisible = true">
				添加群聊
			</el-button>
		</div>
		<el-table
		    :data="tableData"
		    style="width: 100%">
		    <el-table-column
		      label="id"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      label="名称"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      label="群聊标识"
		      >
		    </el-table-column>
		    <el-table-column
		      label="操作"
		      width="250">
		    </el-table-column>
		</el-table>
		<el-dialog title="新建群聊" :visible.sync="FormVisible">
			<el-form :model="form"  :rules="rules" ref="form">
		    	<el-form-item label="群聊名称" :label-width="formLabelWidth" prop="name">
		      		<el-input v-model="form.name" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item>
			   		<el-transfer v-model="form.userlist" 
			   			:data="list"
			   			:titles="['成员', '加入群聊']"
			   			
			   		></el-transfer>
			   	</el-form-item>
		   		<p class="error" v-show="ErrVisible">加入群聊的成员数量不能少于2个人</p>
		   		<el-form-item label=" 设定群主" :label-width="formLabelWidth" prop="owner">
		   			<el-select v-model="form.owner" placeholder="请选择">
			   			<el-option v-for="items in selectList"
			   				:key="items.value"
			   				:label="items.label"
			   				:value="items.value"
			   			>	
			   			</el-option>
			   			
		   			</el-select>
		   		</el-form-item>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer" style="text-align: center">
		  		<el-button @click="FormVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="submitForm('form')">确 定</el-button>
		  	</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			FormVisible: false,
			ErrVisible: false,
			formLabelWidth: '120px',
			form: {
				name: '',
				userlist: [],
				owner: '',
			},
			rules: {
				name: [
					{required: true, trigger: 'blur',message: '请输入群聊名称'}
				],
				owner: [
					{required: true, trigger: 'blur', message: '必须选择群主'}
				]
			},

		}
	},
	methods: {
		init() {
			this.$store.dispatch('getUserList');
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (this.form.userlist.length < 2 ) {
					this.ErrVisible = true;
					return false;
				} else {
					this.ErrVisible = false;
				}

				if (valid) {

					this.$store.dispatch('createChat', this.form).then(() => {
						if (this.$store.state.user.createChat.status == 'success') {
							this.$notify.success('操作成功');
							this.FormVisible = false;
						} else {
							this.$notify.error('操作失败');
						}
					});
				}
			});
		},
		
	},
	created() {
		this.init();
	},
	computed: {
		tableData: function() {
			return [];
		},
		list: function () {

			let data = this.$store.state.user.userList;
			let list = [];

			for (let i in data) {
				let a = {};

				a.key = data[i].id;
				a.label = data[i].username;
				list.push(a);
			}

			return list;
		},
		selectList: function() {
			let item = this.form.userlist;
			let newItem = [];

			for (var ii in item) {				
				for (var i in this.list) {
					if (item[ii] == this.list[i].key) {
						let a = {};
						a.value = this.list[i].key;
						a.label = this.list[i].label;
						newItem.push(a);
					}
				}
			} 
			
			console.log(newItem);

			return newItem;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.containers
	width: 100%;
	height: 100%;
	padding: 15px;
	animation: fadeInUp 0.5s ease;
	.tool
		display: flex;
		margin-bottom: 10px;
	.error
		font-size: 12px;
		color: red;
		margin: 0px;
</style>