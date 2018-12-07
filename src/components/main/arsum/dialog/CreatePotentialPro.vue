<template>
	<div class="create-project-wapper" v-if="visible">
		<el-dialog
		  title="潜在项目"
		  :visible.sync="visible"
		  :before-close="Close"
		  width="30%"
		>
			<el-form :model="CreateForm" :rules="FormRules" ref="CreateForm">
				<el-form-item label="客户名称" :label-width="formLabelWidth" prop="cust_id">
					<div style="width: 100%;display: flex">
			      		<el-select
						    v-model="CreateForm.cust_id"
						    filterable
						    remote
						    reserve-keyword
						    placeholder="请输入客户名称关键词"
						    :remote-method="remoteMethod"
						    :loading="loadingCust"
						    style="flex:1"
						>
							<el-option-group
								:label="'搜索结果'"
							>
							    <el-option
							      	v-for="item in CustList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-option-group>
						</el-select>
					</div>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="项目名称" prop="name">
					<el-input v-model.trim="CreateForm.name"></el-input>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="施工范围" prop="tid">
					<el-select v-model="CreateForm.tid" class="CreateForm-select">
						<el-option v-for="(item, key) in FIELD.F_CMK_PROATTR" :label="item.label" :value="item.value" :key = "key"></el-option>
					</el-select> 
				</el-form-item>
                <el-form-item :label-width="formLabelWidth" label="项目标签" prop="tag">
					<el-select v-model="CreateForm.tag" class="CreateForm-select">
						<el-option v-for="(item, key) in FIELD.F_CMK_CUSTAG" :label="item.label" :value="item.value" :key = "key"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="联系电话" prop="phone_num">
					<el-input v-model.trim="CreateForm.phone_num" placeholder="项目联系电话"></el-input>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="预计金额">
					<el-input v-model.trim="CreateForm.estimate" placeholder="项目的预计合作金额"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		   		<el-button @click="Close">取 消</el-button>
			    <el-button type="primary" @click="submitForm">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	
	data() {
		return {
			loadingCust: false,
			formLabelWidth: '100px',
			CreateForm: {
				name: "",
				cust_id: "",
				phone_num: "",
				tid: "",
				estimate: "",//合作金额
				tag: "",	
			},
			FormRules: {
				cust_id: [
					{required: true, trigger: 'blur', message: "请选择客户"}
				],
				name: [
					{required: true, trigger: 'blur', message: "请填写项目名称"}
				],
				tid: [
					{required: true, trigger: 'blur', message: "请选择项目属性"}
				],
				tag: [
					{required: true, trigger: 'blur', message: "请选择标签属性"}
				],
				phone_num: [
					{validator: this.onlyNumber, trigger: 'blur'}
				],
			},
			CustList: [],
			
		}
	},
	methods: {
		NewCust() {
			this.$store.dispatch('AlterTableConfig', {CreateCustVisible: true});
		},
		/**关闭**/
		Close() {
			for (let i in this.CreateForm) {
				if (i != 'tid' || i != 'tag') {
					this.CreateForm[i] = "";
				}
			}

			this.$store.dispatch('AlterTableConfig', {CreatePotentialProVisible: false});
		},
		remoteMethod(query) {

			if (query !== '') {
	          	this.loadingCust = true;
		        this.$store.dispatch('SearchCust', {keyword: query, type: "potential"}).then(() => {
		        	this.CustList = this.$store.state.user.SearchCust;

		        	this.loadingCust = false;
		        });
	        } else {
	        	this.CustList = [];
	        }
		},
		submitForm() {
			this.$refs['CreateForm'].validate((valid) => {
				if (valid) {
					this.$store.dispatch('CreatePotentialPro', this.CreateForm).then(() => {
						let response = this.$store.state.user.CreatePotentialPro;

						if (response.status == 'success') {
							this.$notify.success('操作成功');
							this.$refs['CreateForm'].resetFields();
							this.CreateForm.name = "";
							this.CreateForm.estimate = "";

							this.$store.dispatch('PotentialCustomer', this.$store.state.user.PotentialQueryParam);
						}
						else {
							this.$notify.error('操作失败');
						}

						this.Close();
					});
				}
			});
		},
	
		
		/**数字验证规则**/
		onlyNumber(rule, value, callback) {
			let patt = /^[0-9\-]+$/;

			if (value && !patt.test(value)) {
				callback(new Error('请输入正确的号码'));
			} else {
				callback();
			}
		},

		updateTable() {
			// let filterQuery = this.$store.state.user.filterQuery;

			// this.$store.dispatch('ARSum', filterQuery);
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
	computed: {
		visible: function() {
			return this.$store.state.user.ARTableConfig.CreatePotentialProVisible;
		},
		FIELD: function() {
			this.CreateForm.tid = this.$store.state.user.FIELDS.F_CMK_PROATTR[0].value;
			this.CreateForm.tag = this.$store.state.user.FIELDS.F_CMK_CUSTAG[0].value;

			return  this.$store.state.user.FIELDS;
		}
	},
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.attachment
	position: relative;
	width: 100%;
	.attachment-item
		display:flex;
		align-items: flex-start;
		position: relative;
		width: 100%;
		.file-button
			flex-basis: 80px;
		.file-list
			margin-left: 15px;
			color: #ff4081;
			cursor: pointer;
			position: relative;
			flex: 1;
			overflow: hidden;
			.file-item
				width: 100%;
				font-size: 12px;
				display: flex;
				justify-content: center;
				align-items: center;
				.file-item-name
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					flex: 1;
				i
					flex-basis: 15px;
					font-size: 15px;
				.el-icon-circle-check
					color: #67c23a;
					margin-left: 15px;
				.el-icon-close
					display: none;
					color: #606266;
				&:hover
					// text-decoration: underline;
					background: #ebebeb;
					.el-icon-circle-check
						display: none;
					.el-icon-close
						display: block;
					
</style>