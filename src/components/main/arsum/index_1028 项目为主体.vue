<template>
	<div class="ar-wapper">
		
		<div class="table-tool" ref="tableTool">
			<el-button type="success" @click.native="FilterVisible  = true">过滤</el-button>
			<el-button type="primary" v-if="false" @click.native="CustVisible = true">新增客户</el-button>
			<el-button type="primary" @click.native="ProjectVisible = true">新增项目</el-button>
			<el-button type="primary" @click.native="ImportCustVisible = true">批量导入</el-button>
			<el-button type="warning" @click.native="OpenReceivableForm" v-if="ARAuthor.hasRole">新增应收</el-button>
			<el-button type="success" @click.native="OpenReceivebillForm" v-if="ARAuthor.hasRole">新增收款</el-button>
			<el-button type="danger" @click.native="OpenRefundForm" v-if="ARAuthor.hasRole">新增退货</el-button>
			<el-dialog
		      	width="30%"
		      	title="条件过滤"
		      	:visible.sync="FilterVisible"
		      	append-to-body
		    >
		    	<el-form :model="query" ref="FilterForm" width="100%">
					<!-- <el-form-item label="当前账期" :label-width="filterlWidth" >
						<el-date-picker
					      	v-model="query.date"
					      	type="year"
					      	placeholder="选择年"
					      	value-format="yyyy-MM-dd"
					    >
					    </el-date-picker>
					</el-form-item> -->
					<el-form-item label="业务员" :label-width="filterlWidth" >
						<el-select
							v-model="query.user_id"
						>
							<el-option-group
								:label="'默认'"
								v-if="ARAuthor.hasRole"
							>
								<el-option  :value="0" :label="'全部'"></el-option>
							</el-option-group>
							<el-option-group
								:label="'部门'"
							>
								<el-option
									v-for="item in ARAuthor.user"
									:key="item.id"
									:label="item.name"
									:value="item.id"
								>
								</el-option>
							</el-option-group>
						</el-select>
					</el-form-item>
					<el-form-item label="客户名称" :label-width="filterlWidth" >
			      		<el-select
						    v-model="query.cust_id"
						    filterable
						    remote
						    reserve-keyword
						    placeholder="请输入客户名称关键词"
						    :remote-method="remoteMethod"
						    :loading="loadingCust"
						    style="flex:1"
						>
							<el-option-group
								:label="'默认'"
							>
								<el-option  :value="0" :label="'全部'"></el-option>
							</el-option-group>
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
					</el-form-item>
					<el-form-item label="项目名称" :label-width="filterlWidth" >
			      		<el-select
						    v-model="query.pid"
						    filterable
						    remote
						    reserve-keyword
						    placeholder="请输入项目名称关键词"
						    :remote-method="remoteQueryProject"
						    :loading="loadingProject"
						    
						    style="flex:1"
						>
							<el-option-group
								:label="'默认'"
							>
								<el-option  :value="0" :label="'全部'"></el-option>
							</el-option-group>
							<el-option-group
								:label="'搜索结果'"
							>
							    <el-option
							      	v-for="item in ProjectList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-option-group>
						</el-select>
					</el-form-item>
					<el-form-item label="合同状态" :label-width="filterlWidth">
						<el-select v-model="query.agreement" >
							<el-option
								v-for="item in agreementList"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="排序方式" :label-width="filterlWidth">
						<el-select v-model="query.order"  >
							<el-option-group
								:label="'默认'"
							>
								<el-option  :value="0" :label="'默认排序'"></el-option>
							</el-option-group>
							<el-option-group :label="'正序'">
								<el-option
									v-for="item in queryOrderAsc"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-option-group>
							<el-option-group :label="'倒序'">
								<el-option
									v-for="item in queryOrderDesc"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-option-group>
						</el-select>
					</el-form-item>
				</el-form>
			    <div slot="footer" class="dialog-footer">
			    	<el-button @click="FilterVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="submitQuery">查 询</el-button>
			  	</div>
		    </el-dialog>

			<el-dialog title="新增收款" :visible.sync="ARFormVisible" width="30%" v-if="ARAuthor.hasRole">
				<el-form :model="ARForm" :rules="ARules" style="width: 100%" ref="ARForm">
			    	<el-form-item label="项目名称" :label-width="formLabelWidth" prop="pid">
						<div style="width: 100%;display: flex">
				      		<el-select
							    v-model="ARForm.pid"
							    filterable
							    remote
							    reserve-keyword
							    placeholder="请输入项目名称关键词"
							    :remote-method="remoteQueryProject"
							    :loading="loadingProject"
							    @change="ARProChange"
							    style="flex:1"
							>
							    <el-option
							      	v-for="item in ProjectList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
							<span style="margin-left: 15px;flex-basis: 100px;">
								<el-button icon="el-icon-plus" type="success" size="mini" @click.native="ProjectVisible = true">
									新增项目
								</el-button>
							</span>
						</div>
			    	</el-form-item>
			    	<el-form-item label="收款日期" :label-width="formLabelWidth" prop="date">
						<el-date-picker
					      	v-model="ARForm.date"
					      	align="right"
					      	type="date"
					      	placeholder="选择日期"
					      	:picker-options="pickerOptions"
					      	style="width: 100%"
					    >
					    </el-date-picker>
			    	</el-form-item>
			    	<el-form-item label="收款金额" :label-width="formLabelWidth" prop="amountfor">
			    		<el-input v-model.trim="ARForm.amountfor" placeholder="请输入收款金额"></el-input>
			    	</el-form-item>
			    	<el-form-item label="折扣优惠" :label-width="formLabelWidth" prop="discount">
			    		<el-input v-model.trim="ARForm.discount" placeholder="请输入收款金额"></el-input>
			    	</el-form-item>
			    	<el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
			    		<el-input v-model.trim="ARForm.remark" placeholder="备注内容"></el-input>
			    	</el-form-item>
			  	</el-form>
			  	<div slot="footer" class="dialog-footer">
			    	<el-button @click="ARFormVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="ARFormSubmit">提 交</el-button>
			  	</div>
			</el-dialog>

			<el-dialog title="新增退货" :visible.sync="RefundFormVisible" width="30%" v-if="ARAuthor.hasRole">
				<el-form :model="RefundForm" :rules="RefundRules" style="width: 100%" ref="RefundForm">
			    	<el-form-item label="项目名称" :label-width="formLabelWidth" prop="pid">
						<div style="width: 100%;display: flex">
				      		<el-select
							    v-model="RefundForm.pid"
							    filterable
							    remote
							    reserve-keyword
							    placeholder="请输入项目名称关键词"
							    :remote-method="remoteQueryProject"
							    :loading="loadingProject"
							    @change="ReProChange"
							    style="flex:1"
							>
							    <el-option
							      	v-for="item in ProjectList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
							    </el-option>
							</el-select>
							<span style="margin-left: 15px;flex-basis: 100px;">
								<el-button icon="el-icon-plus" type="success" size="mini" @click.native="ProjectVisible = true">
									新增项目
								</el-button>
							</span>
						</div>
			    	</el-form-item>
			    	<el-form-item label="退货日期" :label-width="formLabelWidth" prop="date">
						<el-date-picker
					      	v-model="RefundForm.date"
					      	align="right"
					      	type="date"
					      	placeholder="选择日期"
					      	:picker-options="pickerOptions"
					      	style="width: 100%"
					    >
					    </el-date-picker>
			    	</el-form-item>
			    	<el-form-item label="退货金额" :label-width="formLabelWidth" prop="refund">
			    		<el-input v-model.trim="RefundForm.refund" placeholder="请输入退货金额"></el-input>
			    	</el-form-item>
			    	
			    	<el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
			    		<el-input v-model.trim="RefundForm.remark" placeholder="备注内容"></el-input>
			    	</el-form-item>
			  	</el-form>
			  	<div slot="footer" class="dialog-footer">
			    	<el-button @click="RefundFormVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="RefundFormSubmit">提 交</el-button>
			  	</div>
			</el-dialog>

			<el-dialog title="新增应收" :visible.sync="ReceivableFormVisible" width="30%" v-if="ARAuthor.hasRole">
				<el-form :model="ReceivableForm" :rules="ReceivableRules" style="width: 100%" ref="ReceivableForm">
			    	<el-form-item label="项目名称" :label-width="formLabelWidth" prop="pid">
						<div style="width: 100%;display: flex">
				      		<el-select
							    v-model="ReceivableForm.pid"
							    filterable
							    remote
							    reserve-keyword
							    placeholder="请输入项目名称关键词"
							    :remote-method="remoteQueryProject"
							    :loading="loadingProject"
							    @change="ReceivableSelectChange"
							    style="flex:1"
							>
							    <el-option
							      	v-for="item in ProjectList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value"
							      	
							    >
							    </el-option>
							</el-select>
							<span style="margin-left: 15px;flex-basis: 100px;">
								<el-button icon="el-icon-plus" type="success" size="mini" @click.native="CustVisible = true">
									新增客户
								</el-button>
							</span>
						</div>
			    	</el-form-item>
			    	<el-form-item label="应收款金额" :label-width="formLabelWidth" prop="amountfor">
			    		<el-input  v-model.trim="ReceivableForm.amountfor" placeholder="请输入应收款金额"></el-input>
			    	</el-form-item>
			    	
			    	<el-form-item label="业务日期" :label-width="formLabelWidth" prop="date">
						<el-date-picker
					      	v-model="ReceivableForm.date"
					      	align="right"
					      	type="date"
					      	placeholder="选择日期"
					      	:picker-options="pickerOptions"
					      	style="width: 100%"
					    >
					    </el-date-picker>
			    	</el-form-item>
			    	<el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
			    		<el-input  v-model.trim="ReceivableForm.remark" placeholder="备注内容"></el-input>
			    	</el-form-item>
			    	<el-form-item label="是否期初" :label-width="formLabelWidth" v-if="ShowInit">
			    		<el-switch
						  v-model="ReceivableForm.is_init"
						  active-color="#13ce66"
						  inactive-color="#ff4949">
						</el-switch>
			    	</el-form-item>
			    	
			  	</el-form>
			  	<div slot="footer" class="dialog-footer">
			    	<el-button @click="ReceivableFormVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="ReceivableFormSubmit">提 交</el-button>
			  	</div>
			</el-dialog>
			<el-dialog
		      	width="30%"
		      	title="新增客户"
		      	:visible.sync="CustVisible"
		      	append-to-body
		    >
		    	<el-form :model="CustForm" :rules="CustRules" ref="CustForm">
					<el-form-item label="客户名称" prop="name" labelWidth="100px">
						<el-input v-model="CustForm.name"></el-input>
					</el-form-item>
		    	</el-form>
			    <div slot="footer" class="dialog-footer">
			    	<el-button @click="CustVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="submitAddCustomer">提 交</el-button>
			  	</div>
		    </el-dialog>

		    <el-dialog
		      	width="30%"
		      	title="本周收款计划"
		      	:visible.sync="PlanVisible"
		      	append-to-body
		    >
		    	<el-form :model="PlanForm" :rules="PlanRules" ref="PlanForm">
		    		<el-form-item label="名称" prop="name" labelWidth="100px">
		    			<span style="color:red;">{{PlanForm.project}}</span>
		    		</el-form-item>
		    		<el-form-item label="周期" prop="date" labelWidth="100px">
		    			<el-date-picker
					      	v-model="PlanWeek"
					      	type="week"
					      	format="yyyy 第 WW 周"
					      	placeholder="选择周"
					    >
					    </el-date-picker>
		    		</el-form-item>
					<el-form-item label="计划内容" prop="content" labelWidth="100px">
						<el-input type="textarea" v-model.trim="PlanForm.content"></el-input>
					</el-form-item>
		    	</el-form>
			    <div slot="footer" class="dialog-footer">
			    	<el-button @click="PlanVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="submitAddPlan">提 交</el-button>
			  	</div>
		    </el-dialog>

		    <el-dialog
		      	width="30%"
		      	title="新增项目"
		      	:visible.sync="ProjectVisible"
		      	append-to-body
		    >
		    	<el-form :model="ProjectForm" :rules="ProjectRules" ref="ProjectForm">
					<el-form-item label="客户名称" :label-width="formLabelWidth" prop="cust_id">
						<div style="width: 100%;display: flex">
				      		<el-select
							    v-model="ProjectForm.cust_id"
							    filterable
							    remote
							    reserve-keyword
							    placeholder="请输入客户名称关键词"
							    :remote-method="remoteMethod"
							    :loading="loadingCust"
							    @change="ReceivableSelectChange"
							    style="flex:1"
							>
							    <el-option
							      	v-for="item in CustList"
							      	:key="item.value"
							      	:label="item.label"
							      	:value="item.value"
							      	
							    >
							    </el-option>
							</el-select>
							<span style="margin-left: 15px;flex-basis: 100px;">
								<el-button icon="el-icon-plus" type="success" size="mini" @click.native="CustVisible = true">
									新增客户
								</el-button>
							</span>
						</div>
			    	</el-form-item>
			    	<el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
			    		<el-input v-model.trim="ProjectForm.name"></el-input>
			    	</el-form-item>
			    	<el-form-item label="账期" :label-width="formLabelWidth">
			    		<el-input v-model.trim="ProjectForm.payment_days"></el-input>
			    	</el-form-item>
			    	<el-form-item label="类型" :label-width="formLabelWidth" >
			    		<el-input v-model.trim="ProjectForm.type"></el-input>
			    	</el-form-item>
			    	<el-form-item label="税点" :label-width="formLabelWidth">
			    		<el-input v-model.trim="ProjectForm.tax"></el-input>
			    	</el-form-item>
			    	<el-form-item label="合同" :label-width="formLabelWidth" >
			    		<el-input v-model.trim="ProjectForm.agreement"></el-input>
			    	</el-form-item>
		    	</el-form>
			    <div slot="footer" class="dialog-footer">
			    	<el-button @click="ProjectVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="submitAddProject">提 交</el-button>
			  	</div>
		    </el-dialog>

		    <el-dialog
		      	width="30%"
		      	title="导入客户"
		      	:visible.sync="ImportCustVisible"
		      	@close="uploadClose"
		      	append-to-body
		    >
		    	<el-upload
				  class="upload-demo"
				  ref="upload"
				  :headers = "headers"
				  :action="uploadUrl"
				  :on-success="uploadSuccess"
				  :limit="1"
				  :on-change="handleBeforeUpload"
				  :before-remove="handleBeforeRemove"
				  :file-list="fileList"
				  :auto-upload="false"
				  >
				  	<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				  	<el-button style="margin-left: 10px;" type="info" size="small" @click.native="downloadTemplate">模板下载</el-button>
				  	<div slot="tip" class="el-upload__tip">只支持excel文件的导入</div>
				</el-upload>
		    	<p style="font-size: 12px" v-if="upStatus">操作完成，成功{{upSuccess}}个, <el-button type="text" @click.native="ImportResultVisible = true">失败{{upFail.length}}个。点击查看</el-button></p>
			    <div slot="footer" class="dialog-footer">
			    	<el-button v-if="UploadButtonVisible" size="small" type="success" @click="submitUpload" :loading="uploading">确定导入</el-button>
			    	<el-button @click="ImportCustVisible = false">取 消</el-button>
			    	
			  	</div>
		    </el-dialog>

		    <el-dialog
		      	width="30%"
		      	title="导入失败"
		      	:visible.sync="ImportResultVisible"
		      	append-to-body
		    >
		    	<el-table
					:data="upFail"
					height="200px"
		    	>
		    		<el-table-column prop="name" label="客户名称"></el-table-column>
		    	</el-table>
			    <div slot="footer" class="dialog-footer">
			    	<el-button @click="ImportResultVisible = false">关闭</el-button>
			  	</div>
		    </el-dialog>

		    <el-dialog
		      	width="30%"
		      	title="修改应收"
		      	:visible.sync="UpdateReceivableVisible"
		      	append-to-body
		      	v-if="ARAuthor.hasRole"
		    >
		    	<el-form :model="UpdateReceivableForm" :rules="UpdateReceivableRules"  ref="UpdateReceivableForm">
		    		<el-form-item label="类型" :label-width="formLabelWidth">
						<el-tag type="success" v-if="UpdateReceivableForm.is_init == 1">期初余额</el-tag>
						<el-tag type="danger" v-else>销售应收</el-tag>
					</el-form-item>
					<el-form-item label="客户名称" :label-width="formLabelWidth">
						<span style="color: red">{{UpdateReceivableForm.name}}</span>
					</el-form-item>
					<el-form-item label="项目名称" :label-width="formLabelWidth">
						<span style="color: red">{{UpdateReceivableForm.project}}</span>
					</el-form-item>
					
		    		<el-form-item label="应收款金额" :label-width="formLabelWidth" prop="amountfor">
			    		<el-input  v-model.trim="UpdateReceivableForm.amountfor" placeholder="请输入应收款金额"></el-input>
			    	</el-form-item>
		    		<el-form-item label="业务日期" :label-width="formLabelWidth" prop="date">
						<el-date-picker
					      	v-model="UpdateReceivableForm.date"
					      	align="right"
					      	type="date"
					      	placeholder="选择日期"
					      	:picker-options="pickerOptions"
					      	style="width: 100%"
					    >
					    </el-date-picker>
			    	</el-form-item>
			    	<el-form-item label="备注" :label-width="formLabelWidth" >
			    		<el-input  v-model.trim="UpdateReceivableForm.remark" placeholder="备注内容"></el-input>
			    	</el-form-item>
			    </el-form>
			    <div slot="footer" class="dialog-footer">
			    	<el-button @click="UpdateReceivableVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="submitUpdateReceivable">提 交</el-button>
			  	</div>
		    </el-dialog>

		    <el-dialog
		      	width="30%"
		      	title="修改收款"
		      	:visible.sync="UpdateReceivebillVisible"
		      	append-to-body
		      	v-if="ARAuthor.hasRole"
		    >
		    	<el-form :model="UpdateReceivebillForm" :rules="UpdateReceivebillRules"  ref="UpdateReceivebillForm">
					<el-form-item label="客户名称" :label-width="formLabelWidth">
						<span style="color: red">{{UpdateReceivebillForm.name}}</span>
					</el-form-item>
					<el-form-item label="项目名称" :label-width="formLabelWidth">
						<span style="color: red">{{UpdateReceivebillForm.project}}</span>
					</el-form-item>
					
		    		<el-form-item label="业务日期" :label-width="formLabelWidth" prop="date">
						<el-date-picker
					      	v-model="UpdateReceivebillForm.date"
					      	align="right"
					      	type="date"
					      	placeholder="选择日期"
					      	:picker-options="pickerOptions"
					      	style="width: 100%"
					    >
					    </el-date-picker>
			    	</el-form-item>

			    	<el-form-item label="收款金额" :label-width="formLabelWidth" prop="amountfor">
			    		<el-input  v-model.trim="UpdateReceivebillForm.amountfor" placeholder="请输入收款金额"></el-input>
			    	</el-form-item>

			    	<el-form-item label="折扣优惠" :label-width="formLabelWidth" prop="discount">
			    		<el-input  v-model.trim="UpdateReceivebillForm.discount" placeholder="请输入折扣优惠，不优惠则为0"></el-input>
			    	</el-form-item>

			    	<el-form-item label="备注" :label-width="formLabelWidth" >
			    		<el-input  v-model.trim="UpdateReceivebillForm.remark" placeholder="备注信息"></el-input>
			    	</el-form-item>
			    	
			    </el-form>
			    <div slot="footer" class="dialog-footer">
			    	<el-button @click="UpdateReceivebillVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="submitUpdateReceivebill">提 交</el-button>
			  	</div>
		    </el-dialog>

		    <el-dialog
		      	width="30%"
		      	title="修改退货"
		      	:visible.sync="UpdateRefundVisible"
		      	append-to-body
		      	v-if="ARAuthor.hasRole"
		    >
		    	<el-form :model="UpdateRefundForm" :rules="UpdateRefundRules"  ref="UpdateRefundForm">
					<el-form-item label="客户名称" :label-width="formLabelWidth">
						<span style="color: red">{{UpdateRefundForm.name}}</span>
					</el-form-item>
					<el-form-item label="项目名称" :label-width="formLabelWidth">
						<span style="color: red">{{UpdateRefundForm.project}}</span>
					</el-form-item>
					
		    		<el-form-item label="业务日期" :label-width="formLabelWidth" prop="date">
						<el-date-picker
					      	v-model="UpdateRefundForm.date"
					      	align="right"
					      	type="date"
					      	placeholder="选择日期"
					      	:picker-options="pickerOptions"
					      	style="width: 100%"
					    >
					    </el-date-picker>
			    	</el-form-item>

			    	<el-form-item label="退货金额" :label-width="formLabelWidth" prop="refund">
			    		<el-input  v-model.trim="UpdateRefundForm.refund" placeholder="请输入退货金额"></el-input>
			    	</el-form-item>

			    	<el-form-item label="备注" :label-width="formLabelWidth" >
			    		<el-input  v-model.trim="UpdateRefundForm.remark" placeholder="备注信息"></el-input>
			    	</el-form-item>
			    	
			    </el-form>
			    <div slot="footer" class="dialog-footer">
			    	<el-button @click="UpdateRefundVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="submitUpdateRefundForm">提 交</el-button>
			  	</div>
		    </el-dialog>
		    
		</div>
		<el-table
			class="AR-Table"
		    :data="tableData"
		    v-loading="ARSumLoading"
		    style="width: 100%;position: relative;font-family: 'microsoft yahei';height: -webkit-calc:(100%-100px)"
		    :height="tableHeight"
		    show-summary
		    :summary-method="getSummaries"
		    :row-key="getRowKeys"
		    :expand-row-keys="expands"
		    @row-click="rowClick"
		    @expand-change="expandChange"
		>
		    <el-table-column
		      type="expand"
		      prop="cusid"
		      label="展开"
		      width="60"
		    >
			    <template slot-scope="scopes">
					<div class="table-container">
						<el-radio-group v-model="tabType">
							<el-radio-button label="ARSum">综合报表</el-radio-button>
							<el-radio-button label="Receivable">应收明细</el-radio-button>
							<el-radio-button label="ARDetail">收款明细</el-radio-button>
							<el-radio-button label="Refund">退货明细</el-radio-button>
						</el-radio-group>
						<div class="table-right" v-if="tabType == 'ARSum' ">
							<p>
								<el-select v-model="CurrentARSumYear" @change="handleChangeARSumYear">
									<el-option v-for="item in ARSumYearOptions" 
										:key="item.value" 
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</p>
					        <el-table
							    :data="CurrentARSumYearData"   
							    border
							    :key="'ARSum'"
							    style="width: 60%;margin: 0 auto;background: #F8F8FF;transition: all 0.5s"
							    
							>
								<el-table-column
							      	label="月份"
							      	prop="name"
							      	width="100"
							    >
								</el-table-column>
								<el-table-column
							      	label="本月期初"
							      	prop="init_amountfor"
							      	 
							    >
							    	<template slot-scope="scope">
							    		{{scope.row.init_amountfor == 0 ? '' : scope.row.init_amountfor}}
							    	</template>
								</el-table-column>
								<el-table-column
							      	label="销售应收"
							      	prop="amountfor"
							      	 
							    >
							    	<template slot-scope="scope">
							    		{{scope.row.amountfor == 0 ? '' : scope.row.amountfor}}
							    	</template>
								</el-table-column>
								<el-table-column
							      	label="本月收款"
							      	prop="real_amountfor"
							      	 
							    >
							    	<template slot-scope="scope">
							    		{{scope.row.real_amountfor == 0 ? '' : scope.row.real_amountfor}}
							    	</template>
								</el-table-column>

								<el-table-column
							      	label="期末欠款"
							      	prop="end_amountfor"
							      	 
							    >
							    	<template slot-scope="scope">
							    		{{scope.row.end_amountfor == 0 ? '' : scope.row.end_amountfor}}
							    	</template>
								</el-table-column>
								
							</el-table>
							
						</div>
						<div class="table-right" v-if="tabType == 'Receivable'" style="width: 60%;margin: 15px auto;">
							<el-table
								:data="scopes.row.receivable"
								border
								width="70%"
								style="margin: 0 auto;background: oldlace;"
								row-class-name = "warning-row"
								:key="'Receivable'"
							>
								<el-table-column
									label="业务日期"
									prop="date"
									:sortable="true" 
								>
								</el-table-column>
								<el-table-column
									label="应收金额"
									prop="amountfor"
									:sortable="true" 
								>
								</el-table-column>
								<el-table-column
									label="分类"
									prop="is_init"
									:sortable="true"
								>
									<template slot-scope="scope">
										<el-tag type="success" v-if="scope.row.is_init == 1">期初余额</el-tag>
										<el-tag type="danger" v-else>销售应收</el-tag>
									</template>
								</el-table-column>
								<el-table-column
									label="备注"
									prop="remark"
									:sortable="true" 
								>
								</el-table-column>
								<el-table-column
									label="操作"
									width="100"
								>
									<template slot-scope="scope" v-if="ARAuthor.hasRole">
										<el-button size="mini" type="warning" @click.native="updateReceivable(scopes.row.name, scopes.row.project, scope.row)">
											修改
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div class="table-right" v-if="tabType == 'ARDetail'" style="width: 60%;margin: 15px auto;">
							<el-table
								:data="scopes.row.receivebill"
								row-class-name='success-row'
								border
								:key="'ARDetail'"
								style="width: 70%;margin: 0 auto;background: #f0f9eb"
							>
								<el-table-column
									label="收款日期"
									prop="date"
									:sortable="true"
								>
								</el-table-column>
								<el-table-column
									label="收款金额"
									prop="amountfor"
									:sortable="true"
								>
								</el-table-column>
								<el-table-column
									label="折扣优惠"
									prop="discount"
									:sortable="true" 
								>
								</el-table-column>
								<el-table-column
									label="备注"
									prop="remark"
									:sortable="true" 
								>
								</el-table-column>
								<el-table-column
									label="操作"
									width="100"
								>
									<template slot-scope="scope" v-if="ARAuthor.hasRole">
										<el-button size="mini" type="success" @click.native="UpdateReceivebill(scopes.row.name, scopes.row.project, scope.row)">
											修改
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>

						<div class="table-right" v-if="tabType == 'Refund'" style="width: 60%;margin: 15px auto;">
							<el-table
								:data="scopes.row.refund"
								row-class-name='success-row'
								border
								:key="'ARDetail'"
								style="width: 70%;margin: 0 auto;background: #f0f9eb"
							>
								<el-table-column
									label="退货日期"
									prop="date"
									:sortable="true"
								>
								</el-table-column>
								<el-table-column
									label="退货金额"
									prop="refund"
									:sortable="true"
								>
								</el-table-column>
								
								<el-table-column
									label="备注"
									prop="remark"
									:sortable="true" 
								>
								</el-table-column>
								<el-table-column
									label="操作"
									width="100"
								>
									<template slot-scope="scope" v-if="ARAuthor.hasRole">
										<el-button size="mini" type="success" @click.native="UpdateRefund(scopes.row.name, scopes.row.project, scope.row)">
											修改
										</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
			    </template>
		    </el-table-column>
		    <el-table-column
		    	label="序号"
		    	prop="id"
		    	width="50"
		    	v-if="false"
		    >
		    	
		    </el-table-column>
		    <el-table-column
		      label="客户名称"
		      width="200"
		    >
			    <template slot-scope="scope">
			        <span style="margin-left: 10px">{{ scope.row.name }}</span>
			    </template>
		    </el-table-column>
		    <el-table-column
		      label="项目名称"
		      prop="project"
		      width="150"
		    >
		    </el-table-column>
			
		    <el-table-column 
		    	label="业务员" 
		    	prop="user_name"
		    	width="80"
		    >	
		    </el-table-column>
		    <el-table-column
				label="合同"
				prop="agreement"
				width="150"
		    >
		    	<template slot-scope="scope">
		    		<el-tag v-if="scope.row.agreement" type="warning">{{scope.row.agreement}}</el-tag>
		    	</template>
		    </el-table-column>
		    <el-table-column
				label="账期"
				prop="payment_days"
				width="80"
		    >
		    </el-table-column>
		    <el-table-column
				label="类型"
				prop="type"
				width="80"
		    >
		    </el-table-column>
		    <el-table-column
				label="税点"
				prop="tax"
				width="80"
		    >
		    </el-table-column>
		    <el-table-column
		      label="应收汇总"
		      width="150"
		    >
			    <template slot-scope="scope">
			        <span style="margin-left: 10px">{{ scope.row.amountfor }}</span>
			    </template>
		    </el-table-column>
		    <el-table-column
		      label="收款汇总"
		      width="150"
		    >
			    <template slot-scope="scope">
			        <span style="margin-left: 10px">{{ scope.row.real_amountfor }}</span>
			    </template>
		    </el-table-column>
		    <el-table-column
		      label="优惠汇总"
		      width="150"
		    >
			    <template slot-scope="scope">
			        <span style="margin-left: 10px">{{ scope.row.discount }}</span>
			    </template>
		    </el-table-column>
		    <el-table-column
		      label="退货汇总"
		      width="150"
		    >
			    <template slot-scope="scope">
			        <span style="margin-left: 10px">{{ scope.row.refund_sum }}</span>
			    </template>
		    </el-table-column>
		    <el-table-column
		      label="欠款汇总"
		      width="150"
		    >
			    <template slot-scope="scope">
			        <span style="margin-left: 10px">{{ scope.row.balance }}</span>
			    </template>
		    </el-table-column>
		    <el-table-column
		    	label="欠款月数"
		    	prop="continueReceivable"
		    	width="80"
		    >
		    	<template slot-scope="scope">
		    		<span style="color: red" v-if="scope.row.continueReceivable > 0">{{scope.row.continueReceivable}}  个月</span>
		    	</template>
			</el-table-column>
		    <el-table-column
				label="收款计划"
				prop="plan"
			>
				<template slot-scope="scope" >
					<div v-if="typeof(scope.row.plan) == 'object' && scope.row.plan != null ">
						<el-popover
							placement="left"
							:title="scope.row.plan.date+'  第 '+scope.row.plan.week+' 周' "
							:content="scope.row.plan.content"
							trigger="hover"
						>
							<el-button type="text" slot="reference">{{scope.row.plan.content}}</el-button>
						</el-popover>
					</div>
				</template>
			</el-table-column>
			<el-table-column
		    	label="操作"
		    	width="220"
		    >
		    	<template slot-scope="scope" >
		    		<template v-if="ARAuthor.hasRole">
			    		<el-button type="warning" size="mini" @click.native="FastAddReceivable(scope.row)">
			    			应收
			    		</el-button>
			    		<el-button type="success" size="mini" @click.native="FastAddReceivebill(scope.row)">
			    			收款
			    		</el-button>
			    		<el-button type="danger" size="mini" @click.native="FastAddRefund(scope.row)">
			    			退货
			    		</el-button>
			    	</template>
			    	<template v-if="user.id == scope.row.user_id">
			    		<el-button type="danger" size="mini" @click.native="OpenPlanForm(scope.row)">
			    			收款计划
			    		</el-button>
			    	</template>
		    	</template>
		    </el-table-column>
		</el-table>
		<el-pagination
		  background
		  :page-sizes="Pagination.pagesizes"
		  :page-size="Pagination.pagesize"
		  :currentPage = "currentPage"
		  @size-change="handleSizeChange" 
		  @current-change="handleCurrentChange" 
		  style="margin-top: 20px;text-align: center"
		  :layout="Pagination.layout"
		  :total="ARSumTotal">
		</el-pagination>
	</div>
</template>
<script>

export default {
	
	data() {
		
		return {
			tabType: 'ARSum',
			FilterVisible: false,
			ImportCustVisible: false,
			ARFormVisible: false,
			ReceivableFormVisible:false,
			UpdateReceivableVisible: false,
			UpdateReceivebillVisible: false,
			CustVisible: false,
			ProfitVisible: false,
			RefundFormVisible: false,
			ImportResultVisible: false,
			ProjectVisible: false,
			PlanVisible: false,
			loadingCust: false,
			loadingProject: false,
			uploading: false,
			ARSumLoading: false,
			ShowInit: true,
			UploadButtonVisible: false,
			UpdateRefundVisible: false,
			CurrentARSumYear:  new Date().getFullYear().toString(),
			expands: [],
			filterlWidth: '120px',
			formLabelWidth: '120px',
			activeName:['0'],
			tableHeight: 'calc(100% - 100px)',
			lastCollapseHeight: '',
			CurrentARSumRow: {},
			ARForm: {
				cust_id: '',
				pid: '',
				date: '',
				amountfor: '',
				remark: '',
				discount: 0
			},
			ReceivableForm: {
				id: '',
				cust_id: '',
				pid: '',
				date: '',
				is_init: true,
				amountfor: '',
				remark: ''
			},
			CustForm: {
				name: ''
			},
			ImportCustForm: {
				file: ''
			},
			ProfitForm: {
				id: '',
				percent: '',
				month: ''
			},
			UpdateReceivableForm: {
				id: '',
				name: '',
				project: '',
				date: '',
				amountfor: '',
				is_init: '',
				remark: ""
			},
			UpdateReceivebillForm: {
				id: '',
				name: '',
				project: '',
				date: '',
				amountfor: '',
				discount: 0,
				remark: ''
			},
			
			ProjectForm: {
				cust_id: '',
				name: '',
				payment_days: '',
				agreement: '',
				type: '',
				tax: ''
			},
			RefundForm: {
				id: '',
				cust_id: '',
				pid: '',
				date: '',
				refund: '',
				remark: ''
			},
			UpdateRefundForm: {
				id: '',
				date: '',
				refund: '',
				remark: '',
				name: '',
				project: ''
			},
			PlanWeek: new Date(),
			PlanForm: {
				content: '',
				project: '',
				date: '',
				pid: ''
			},
			pickerOptions: {
				disabledDate(time) {
	            	return time.getTime() > Date.now();
	          	},
	          	shortcuts: 
	          	[{
	          	
	            	text: '今天',
	            	onClick(picker) {
	              		picker.$emit('pick', new Date());
	            	}
	          	}, 
	          	{
	            	text: '昨天',
	            	onClick(picker) {
	              		const date = new Date();
	              		date.setTime(date.getTime() - 3600 * 1000 * 24);
	              		picker.$emit('pick', date);
	            	}
	          	}, 
	          	{
	            	text: '一周前',
	            	onClick(picker) {
	              		const date = new Date();
	              		date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
	              		picker.$emit('pick', date);
	            	}
	          	}]
			},
			ARules: {
				pid: [
					{required: true, message: '请选择项目',trigger: 'blur'}
				],
				date: [
					{required: true, message: '请选择收款日期', trigger: 'blur'}
				],
				amountfor: [
					{required: true, message: '请录入收款金额', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
				discount: [
					{required: true, message: '请录入折扣金额', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
			},
			ReceivableRules: {
				pid: [
					{required: true, message: '请选择项目',trigger: 'blur'}
				],
				date: [
					{required: true, message: '请选择收款日期', trigger: 'blur'}
				],
				amountfor: [
					{required: true, message: '请录入金额', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
			},
			RefundRules: {
				pid: [
					{required: true, message: '请选择项目',trigger: 'blur'}
				],
				date: [
					{required: true, message: '请选择退货日期', trigger: 'blur'}
				],
				refund: [
					{required: true, message: '请录入金额', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
				
			},
			UpdateReceivableRules: {
				date: [
					{required: true, message: '请选择收款日期', trigger: 'blur'}
				],
				amountfor: [
					{required: true, message: '请录入金额', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
				 
			},
			UpdateReceivebillRules: {
				date: [
					{required: true, message: '请选择收款日期', trigger: 'blur'}
				],
				amountfor: [
					{required: true, message: '请录入金额', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
				discount: [
					{required: true, message: '折扣优惠不能为空，无优惠则填0', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				], 
			},
			CustRules: {
				name: [
					{required: true, message: '客户名称必须填写',trigger: 'blur'}
				]
			},
			ImportCustRules: {
				file: [
					{required: true, message: '客户名称必须填写',trigger: 'blur'}
				]
			},
			ProfitRules: {
				percent: [
					{required: true, message: '利润率必须填写',trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				]
			},
			
			ProjectRules: {
				cust_id: [
					{required: true, message: '请选择客户',trigger: 'blur'}
				],
				name: [
					{required: true, message: '项目名称必须填写', trigger: 'blur'}
				]
			},
			PlanRules: {
				date: [
					{required: true, message: '请选择时间',trigger: 'blur'}
				],
				content: [
					{required: true, message: '请填写计划内容',trigger: 'blur'}
				]
			},
			UpdateRefundRules: {
				
				date: [
					{required: true, message: '请选择退货日期', trigger: 'blur'}
				],
				refund: [
					{required: true, message: '请录入金额', trigger: 'blur'},
					{validator: this.onlyNumber, trigger: 'blur'}
				],
			},
			CustList: [],
			ProjectList: [],
			query: {
				date: new Date().toLocaleDateString(),
				user_id: 0,
				cust_id: 0,
				pid: 0,
				order: 0,
				agreement: 2,
				limit: 15,
				offset: 0,
			} ,
			queryOrderAsc: [
				{value: 'months_asc',id:1, label: '按欠款月正序'},
				{value: 'amountfor_asc',id:2, label: '按应收款金额正序'},
				{value: 'realamountfor_asc',id:3, label: '按回款金额正序'}
			],
			queryOrderDesc: [
				{value: 'months_desc',id:1, label: '按欠款月倒序'},
				{value: 'amountfor_desc',id:2, label: '按应收款金额倒序'},
				{value: 'realamountfor_desc',id:3, label: '按回款金额倒序'}
			],
			agreementList: [
				{value: 0, label: '无合同'},
				{value: 1, label: '有合同'},
				{value: 2, label: '全部'}
			],
			fileList: [],
			uploadUrl: '',
			appUrl: '',
			token: '',
			headers: '',
			upSuccess: 0,
			upFail: [],
			upStatus: false,
			currentPage: 1,
			pageSize: 15
		}
	},
	methods: {
		init() {
			
			this.InitUpload();
			this.InitUserRole();
			this.InitPagination();
		},
		/**初始化权限**/
		InitUserRole() {
			this.$store.dispatch('ARSumUserRole').then(() => {
				let ARAuthor = this.$store.state.user.ARSumUserRole;

				if (!ARAuthor.hasRole) {
					this.query.user_id = ARAuthor.user[0].id;
				}

				this.sumTable();
			});	
		},
		/**初始化分页配置**/
		InitPagination() {
			this.$store.dispatch('InitPagination').then(() => {
				this.query.limit = this.$store.state.user.BasePagination.pagesize;
			});
		},
		EnableEdit(parentRow, curentRowIndex) {
			this.parentId = parentRow;
			this.currentId = curentRowIndex;
		},
		DisableEdit() {
			this.parentId = null;
			this.currentId = null;
		},

		expandChange(data,expandedRows) {

			//控制只显示当前行
	      	if (expandedRows.length) {
	         	this.expands = []; 
	        	if (data) {
	          		this.expands.push(data.pid);
	        	} 
	      	}else{
	        	this.expands = [];
	      	}
		},
		getRowKeys(row) {
			return row.pid;
		},
		rowClick(row, event, column) {
			this.CurrentARSumRow = row;

			this.CurrentARSumYear = new Date().getFullYear().toString();

			if (column.label != '点击展开' && column.label != '操作' && column.label != '收款计划') {
				let temp = this.expands;
				this.expands = [];
				if ( temp[0] != row.pid ) {
					this.expands.push(row.pid);
				}
			} 
		},
		remoteMethod(query) {

			if (query !== '') {
	          	this.loadingCust = true;
		        this.$store.dispatch('SearchCust', {keyword: query}).then(() => {
		        	this.CustList = this.$store.state.user.SearchCust;

		        	this.loadingCust = false;
		        });
	        } else {
	        	this.CustList = [];
	        }
		},
		remoteQueryProject(query) {
			if (query !== '') {

	          	this.loadingProject = true;
		        this.$store.dispatch('SearchProject', {keyword: query}).then(() => {
		        	this.ProjectList = this.$store.state.user.SearchProject;

		        	this.loadingProject = false;
		        });
	        } else {
	        	this.ProjectList = [];
	        }
		},
		/**数字验证规则**/
		onlyNumber(rule, value, callback) {
			let patt = /^[0-9\.\-]+$/;

			if (!patt.test(value)) {
				callback(new Error('金额必须是数字'));
			} else {
				callback();
			}
		},
		/**字母验证规则**/
		onlyChar(rule, value, callback) {
			let patt = /^[a-z]+$/;

			if (!patt.test(value)) {
				callback(new Error('key只能是字母'));
			} else {
				callback();
			}
		},
		/**应收客户切换后判断有没有期初**/
		ReceivableSelectChange(item) {
			 
			this.ProjectList.forEach((items) => {
				 
				if (items.value == item) {

					this.ShowInit = !items.endInit;
					
					this.ReceivableForm.cust_id = items.custid;

				}
			});
		},
		OpenReceivableForm() {
			this.ProjectList = [];
			this.ReceivableForm.cust_id = '';
			this.ReceivableForm.is_init = true;
			this.ShowInit = true;
			this.ReceivableFormVisible = true;
		},
		OpenReceivebillForm() {
			this.ProjectList = [];
			this.ShowInit = true;
			this.ARForm.cust_id = '';
			this.ARFormVisible =  true;
		},
		OpenPlanForm(row) {
			this.PlanForm.project = row.project;
			this.PlanForm.pid = row.pid;
			this.PlanVisible = true;
		},
		OpenRefundForm() {
			this.ProjectList = [];
			this.RefundForm.pid = "";
			this.RefundForm.cust_id = "";
			this.RefundForm.date = "";
			this.RefundForm.refund = "";
			this.RefundForm.remark = "";
			// this.$refs['RefundForm'].clearValidate();
			this.RefundFormVisible = true;
		},
		/**提交新增客户**/
		submitAddCustomer() {
			this.$refs['CustForm'].validate((valid) => {
				if (!valid) {
					return ;
				}

				this.$store.dispatch("AddMyCustomer", this.CustForm).then(() => {
					let response = this.$store.state.user.AddMyCustomer;

					if (response.status == 'success') {
						this.CustVisible = false;
						this.$refs['CustForm'].resetFields();
						this.$notify.success('客户添加成功！');
						this.sumTable();
					} else {
						this.$notify.error('客户添加失败, '+response.errmsg);
					}
				});
			})
		},
		/**应收提交**/
		ReceivableFormSubmit() {
			this.$refs['ReceivableForm'].validate((valid) => {
				if (!valid) {
					return ;
				} 

				let data = this.ReceivableForm;

				data.is_init = Number(data.is_init);

				this.$store.dispatch('AddReceivable', data).then(() => {
					let response = this.$store.state.user.AddReceivable;

					if (response.status == 'success') {
						this.$notify.success('创建成功');
						this.sumTable();
						this.ReceivableFormVisible = false;
						this.CustList = [];
						this.$refs['ReceivableForm'].resetFields();
					} else {
						this.$notify.error('创建失败, '+response.errmsg);
					}
				});
			});
		},
		ARProChange(value) {
			let list = this.ProjectList;

			list.forEach((item) => {
				if (item.value == value) {
					this.ARForm.cust_id = item.custid;
				}
			});
		},
		ReProChange(value) {
			let list = this.ProjectList;

			list.forEach((item) => {
				if (item.value == value) {
					this.RefundForm.cust_id = item.custid;
				}
			});
		},
		/**收款提交**/
		ARFormSubmit() {
			this.$refs['ARForm'].validate((valid) => {
				if (!valid) {
					return;
				}

				this.$store.dispatch('AddReceivebill', this.ARForm).then(() => {
					let response = this.$store.state.user.AddReceivebill;

					if (response.status == 'success') {
						this.$notify.success('创建成功');
						this.sumTable();
						this.ARFormVisible = false;
						this.CustList = [];
						this.$refs['ARForm'].resetFields();
					} else {
						this.$notify.error('创建失败, '+response.errmsg);
					}
				});
			})
		},
		

		/**修改应收单**/
		updateReceivable(cusName,project, row) {
			this.UpdateReceivableForm.id = row.id;
			this.UpdateReceivableForm.name = cusName;
			this.UpdateReceivableForm.project = project;
			this.UpdateReceivableForm.amountfor = row.amountfor;
			this.UpdateReceivableForm.date = row.date;
			this.UpdateReceivableForm.is_init = row.is_init;
			this.UpdateReceivableForm.remark = row.remark;
			
			this.UpdateReceivableVisible = true;
		},
		/**修改收款**/
		UpdateReceivebill(cusName, project, row) {

			this.UpdateReceivebillForm.id = row.id;
			this.UpdateReceivebillForm.name = cusName;
			this.UpdateReceivebillForm.project = project;
			this.UpdateReceivebillForm.amountfor = row.amountfor;
			this.UpdateReceivebillForm.date = row.date;
			this.UpdateReceivebillForm.discount = row.discount;
			this.UpdateReceivebillForm.remark = row.remark;

			this.UpdateReceivebillVisible = true;
		},
		/**提交退货修改**/
		UpdateRefund(cusName, project, row) {
			this.UpdateRefundVisible = true;
			this.UpdateRefundForm.name = cusName;
			this.UpdateRefundForm.project = project;
			this.UpdateRefundForm.id = row.id;
			this.UpdateRefundForm.remark = row.remark;
			this.UpdateRefundForm.refund = row.refund;
			this.UpdateRefundForm.date = row.date;
		},
		/**提交应收修改**/
		submitUpdateReceivable() {
			this.$refs['UpdateReceivableForm'].validate((valid) => {
				if (!valid) {
					return ;
				}
				this.$store.dispatch('UpdateReceivable', this.UpdateReceivableForm).then(() => {
					let response = this.$store.state.user.UpdateReceivable;
					if (response.status == 'success') {
						this.$notify.success('操作成功');
						this.sumTable();
						this.UpdateReceivableVisible = false;
						this.$refs['UpdateReceivableForm'].resetFields();
					} else {
						this.$notify.error('操作失败, '+response.errmsg);
					}
				});
			});
		},
		/**提交收款修改**/
		submitUpdateReceivebill() {
			this.$refs['UpdateReceivebillForm'].validate((valid) => {
				
				if (!valid) {
					return;
				}

				this.$store.dispatch('UpdateReceivebill', this.UpdateReceivebillForm).then(() => {
					let response = this.$store.state.user.UpdateReceivebill;

					if (response.status == 'success') {
						this.$notify.success('操作成功');
						this.sumTable();
						this.UpdateReceivebillVisible = false;
						this.$refs['UpdateReceivebillForm'].resetFields();
					} else {
						this.$notify.error('操作失败, '+response.errmsg);
					}
				});
			});
		},

		/**提交退货修改**/
		submitUpdateRefundForm() {
			this.$refs['UpdateRefundForm'].validate((valid) => {

				if (!valid) {
					return false;
				}

				this.$store.dispatch('UpdateRefund', this.UpdateRefundForm).then(() => {
					let response = this.$store.state.user.UpdateRefund;

					if (response.status == 'success') {
						this.$notify.success('操作成功');
						this.sumTable();
						this.UpdateRefundVisible = false;
						this.$refs['UpdateRefundForm'].resetFields();
					} else {
						this.$notify.error('操作失败, '+response.errmsg);
					}
				});

			});
		},
		/**快速新增应收**/
		FastAddReceivable(row) {
			this.ProjectList = [];
			this.ProjectList.push({label: row.project, value: row.pid});
			this.ReceivableForm.pid = row.pid;
			this.ReceivableForm.cust_id = row.cust_id;
			this.ShowInit = !row.end_init;
			this.ReceivableFormVisible = true;
		},
		/**快速新增收款**/
		FastAddReceivebill(row) {
			this.ProjectList = [];
			this.ProjectList.push({label: row.project, value: row.pid});
			this.ARForm.pid = row.pid;
			this.ARForm.cust_id = row.cust_id;
			this.ARFormVisible = true;
		},
		
		/**快速新增退货**/
		FastAddRefund(row) {
			this.ProjectList = [];
			this.ProjectList.push({label: row.project, value: row.pid});
			this.RefundForm.pid = row.pid;
			this.RefundForm.cust_id = row.cust_id;
			this.RefundFormVisible = true;
		},
		
		sumTable() {
			this.ARSumLoading = true;
			return this.$store.dispatch('ARSum',this.query).then(() => {
				this.ARSumLoading = false;
			});
		},
		
		submitUpload() {
			
			if (this.fileList.length < 1 || this.upStatus) {
				return ;
			}
			this.uploading = true;
        	this.$refs.upload.submit();
	    },
	    uploadSuccess(response, file, fileList) {

	    	if (response.status == 'success') {

		    	this.upSuccess = response.success;
		    	this.upFail = response.fail;
		    	this.uploading = false;
		    	this.upStatus = true;
		    	this.sumTable();
		    }
	    },
	    handleBeforeUpload(file) {
	        let ext = file.name.substring(file.name.lastIndexOf('.'));

	        if (ext != '.xlsx' && ext != '.xls') {
	        	this.fileList = [];
	        } else {
	        	this.fileList[0] = file;
	        }

	        if ( this.fileList.length > 0 ) {
	        	this.UploadButtonVisible = true;
	        } 
	    },
	    handleBeforeRemove(file, fileList) {
	    	this.UploadButtonVisible = false;
	    },
	    InitUpload() {
	    	this.$store.dispatch('ARUploadUrl').then((response) => {
	    		this.token = response.token;
	    		this.headers = { authorization: 'Bearer ' + this.token ,'X-Requested-With': 'XMLHttpRequest'};
	    		this.appUrl = response.url;
				this.uploadUrl = this.appUrl + 'realcustomer/import';
			});
	    },
	    uploadClose() {
	    	this.fileList = [];
	    	this.upStatus = false;
	    },
	    downloadTemplate() {
	    	window.open(this.appUrl + 'realcustomer/template?token='+this.token, '模板下载');
	    },
	    /**新增项目**/
	    submitAddProject() {
	    
	    	this.$refs['ProjectForm'].validate((valid) => {

	    		if (valid) {
	    			this.$store.dispatch('AddProject', this.ProjectForm).then(() => {
	    				let response = this.$store.state.user.AddProject;

						if (response.status == 'success') {
							this.$notify.success('操作成功');
							this.sumTable();
							this.ProjectVisible = false;
							this.$refs['ProjectForm'].resetFields();
						} else {
							this.$notify.error('操作失败, '+response.errmsg);
						}
	    			});
	    		}	
	    	})
	    },
	    /**提交收款计划**/
	    submitAddPlan() {
	    	let date = this.PlanWeek;
	    	
	    	if (date != null || typeof(date) == 'object') {

		    	this.PlanForm.date = date.getFullYear() + '-'+ parseInt(date.getMonth() + 1) +'-'+ date.getDate();

		    	this.$refs['PlanForm'].validate((valid) => {

		    		if (valid != true) {
		    			return false;
		    		}

		    		this.$store.dispatch('AddReceivablePlan', this.PlanForm).then(() => {
		    			let response = this.$store.state.user.AddReceivablePlan;

		    			if (response.status == 'success') {
		    				this.$notify.success('操作成功');
		    				this.PlanVisible = false;
		    				this.PlanForm.pid = 0;
		    				this.PlanForm.content = '';
		    				this.sumTable();
		    			} else {
		    				this.$notify.error('操作失败!'+response.errmsg);
		    			}
		    		});
		    	});
	    	}
	    },
	    /**提交退货**/
	    RefundFormSubmit() {

	    	let method = 'RefundAdd';

	    	this.$refs['RefundForm'].validate((valid) => {
	    		 
	    		this.$store.dispatch(method, this.RefundForm).then(() => {

	    			let response = this.$store.state.user.RefundAdd; 

	    			if (response.status == 'success') {
	    				this.$notify.success('操作成功');
	    				this.RefundFormVisible = false;
	    				this.RefundForm.pid = 0;
	    				this.RefundForm.remark = '';
	    				this.RefundForm.id = '';
	    				this.RefundForm.refund = '';
	    				this.RefundForm.cust_id = '';
	    				this.RefundForm.date = '';
	    				this.sumTable();
	    			} else {
	    				this.$notify.error('操作失败!'+response.errmsg);
	    			} 
	    		});
	    	})
	    },
	    /**查询**/
	    submitQuery() {
	    	if (!this.ARSumLoading) {
	    		this.sumTable().then(() => {
	    			this.FilterVisible = false;
	    		});
	    	}
	    },
	    handleSizeChange(val) {
	    	this.query.limit = val;
	    	this.handleCurrentChange(this.currentPage);
	    	// console.log(this.query)
	    },
	    handleCurrentChange(page) {
	    	this.currentPage = page;
	    	this.query.offset = (page - 1) * this.query.limit;

	    	this.sumTable();
	    },
	    handleChangeARSumYear(val) {
	    	
	    },
	    getSummaries(params) {
	    	const {columns, data} = params;
			const sums = [];

			columns.forEach((item, index) => {
				if (index === 0) {
					sums[index] = '总合计';
				}

				if (item.label == '应收汇总') {
					sums[index] = this.ARSummaries.amountfor + '(应收)';
				}

				if (item.label == '收款汇总') {
					sums[index] = this.ARSummaries.real_amountfor + '(收款)';
				}

				if (item.label == '优惠汇总') {
					sums[index] = this.ARSummaries.discount + '(优惠)';
				}

				if (item.label == '欠款汇总') {
					sums[index] = this.ARSummaries.balance + '(欠款)';
				}

				if (item.label == '退货汇总') {
					sums[index] = this.ARSummaries.refund + '(退货)';
				}
			});

			return sums;
		}
	},
	created() {
		this.init();
		
	},
	
	computed: {
		tableData: function() {
			return this.$store.state.user.ARSum;
		},
		
		ARAuthor: function() {
			return this.$store.state.user.ARSumUserRole;
		},
		ARSumTotal: function() {
			return this.$store.state.user.ARSumTotal;
		},
		Pagination: function() {
			return this.$store.state.user.BasePagination;
		},
		ARSumYearOptions: function() {
			let data = [];

			for (var i in this.CurrentARSumRow.ar_sum) {
				let row = {};
				row.label = i + '年';
				row.value = i;

				data.push(row);
			}

			return data;
		},
		CurrentARSumYearData: function() {

			return this.CurrentARSumRow.ar_sum[this.CurrentARSumYear];
		},
		ARSummaries: function() {
			return this.$store.state.user.ARSummaries;
		},
		user: function() {
			return this.$store.state.user.userInfo;
		} 
	},

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.ar-wapper
	width: 100%;
	height: 100%;
	// 
	padding: 10px;
	position: relative;
	.filter-box
		width: 100%;
		position: relative;
		// border: 1px solid #ebebeb;
		padding: 15px;
		// border-radius: 5px;
	.table-tool
		margin-bottom: 15px;
	.table-container
		text-align: center;
		height: 100%;
		overflow-y: auto;
		.table-right
			margin-top: 15px;
			
</style>