<!--合作客户-->
<template>
	<div class="cooperate-wallper">
		<el-table 
			border
			class="ar-table"
			:style="{'margin-top': '15px','font-size': fontSize}"
			v-loading="tableLoading"
			:data="tableData"
			:height="height"
			:expand-row-keys="expands"
			:row-key="getRowKeys"
			highlight-current-row
			@row-click="rowClick"
			@expand-change="expandChange"
			v-if="DomRefresh"
		>
			<el-table-column type="expand" v-show="false" width="-1">
				<template slot-scope="scope" v-if="scope.row.rowkey == expands[0]">
					<div class="row-expand">
						<div class="expand-button">
							<el-button-group>
								<el-button type="info" size="mini" icon="el-icon-sold-out" @click.native="OpenSaleOrderDialog" v-if="Role.hasRole">添加销售</el-button>
								<el-button type="info" size="mini" icon="el-icon-check" @click.native="OpenReceivebillOrderDialog" v-if="Role.hasRole">添加收款</el-button>
								<el-button type="info" size="mini" icon="el-icon-sort" @click.native="OpenRefundOrderDialog" v-if="Role.hasRole">添加退货</el-button>
								<el-button type="info" size="mini" icon="el-icon-star-on" @click.native="OpenRecePlanDialog" v-if="user.id == scope.row.user_id">收款计划</el-button>
								<el-button type="info" size="mini" icon="el-icon-service" @click.native="OpenChangeCusDialog" v-if="user.id == scope.row.user_id">设置状态</el-button>
							</el-button-group>
						</div>
					
						<el-tabs type="border-card" v-if="scope.row.rowkey == expands[0]" @tab-click="tabClick" style="transition: all 0.5s;height: 370px;position: relative;">
							<el-tab-pane v-for="(item, key) in Tabs" :key="key" :label="item.name"  style="height: 300px;position:relative;">
								<component v-bind:is="item.component" :moduleName="item.moduleName"></component>
							</el-tab-pane>
						</el-tabs>
						
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="id" fixed="left" label="展开" width="50">
				<template slot-scope="scope">
					<i class="el-icon-arrow-right el-icon-arrow-rotate-leave" :class="{'el-icon-arrow-rotate-active': scope.row.index == ArrowActiveIndex}"></i>
				</template>
			</el-table-column>
			<el-table-column prop="rowkey" label="rowKey" v-if="false">
				<template slot-scope="scope" ></template>
			</el-table-column>
			<el-table-column prop="status_name" v-if="ColumnVisible.status_name.value" label="状态" fixed="left" width="80">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.nameshow == true && scope.row.status_name == '平稳'">平稳</el-tag>
					<el-tag type="warning" v-if="scope.row.nameshow == true && scope.row.status_name == '衰减'">衰减</el-tag>
					<el-tag type="info" v-if="scope.row.nameshow == true && scope.row.status_name == '流失'">流失</el-tag>
				</template>	
			</el-table-column>
			<el-table-column prop="department" label="部门名称" fixed="left" width="80" v-if="ColumnVisible.department.value"></el-table-column>
			<el-table-column prop="name" label="客户名称" fixed="left" min-width="250" >
				<template slot-scope="scope" v-if="scope.row.nameshow==true">
					<el-tooltip effect="dark" :content="scope.row.name" placement="top">
						<a class="tip" style="color:#ff4081" :style="{'font-size': fontSize}">{{scope.row.name}}</a>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="project" label="旗下项目" fixed="left" min-width="250" >
				<template slot-scope="scope" v-if="scope.row.project != '' && scope.row.projectshow == true">
					<el-tooltip effect="dark" :content="scope.row.project" placement="top">
						<span  class="tip " :style="{'font-size': fontSize}">{{scope.row.project}}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="protype" label="施工范围" fixed="left"  v-if="ColumnVisible.protype.value"></el-table-column>
			<el-table-column prop="affiliate" label="挂靠" fixed="left" width="50" v-if="ColumnVisible.affiliate.value">
				<template slot-scope="scope" v-if="scope.row.affiliate != null && scope.row.affiliate != ''">
					<el-tooltip effect="dark" :content="scope.row.affiliate" placement="top" >
						<span class="tip " :style="{'font-size': fontSize}">有</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="user_name" label="业务员"  fixed="left"   width="120" v-if="ColumnVisible.user_name.value">
			</el-table-column>
			<el-table-column prop="tag" label="标签"  fixed="left"  width="80" v-if="ColumnVisible.tag.value">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.tag">{{scope.row.tag}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="cooperation_amountfor" label="合作金额" fixed="left" width="200" v-if="ColumnVisible.cooperation_amountfor.value" >
				<template slot-scope="scope">
					{{scope.row.cooperation_amountfor}}
				</template>
			</el-table-column>
			<el-table-column prop="estimate" label="预计金额"  width="150" v-if="ColumnVisible.estimate.value" ></el-table-column>
			<el-table-column prop="agreement" label="合同"   width="100" v-if="ColumnVisible.agreement.value">
				<template slot-scope="scope">
					<template v-if="scope.row.agreement">
						<template v-if="scope.row.attachment">
							<el-popover
								placement="top"
								title="合同附件"
								width="200"
								trigger="hover"
							>
								<el-button type="success" @click.native="OpenViewWindow(scope.row.attachment)">点击查看</el-button>
								<el-button type="text" slot="reference">{{scope.row.agreement}}</el-button>
							</el-popover>
						</template>
						<span v-else>
							<!-- {{scope.row.agreement}} -->
							<el-tooltip effect="dark" :content="scope.row.agreement" placement="top">
								<a class="tip" style="color:#606266" :style="{'font-size': fontSize}">{{scope.row.agreement}}</a>
							</el-tooltip>
						</span>
					</template>
					<template v-else>
						<template v-if="scope.row.attachment">
							<el-popover
								placement="top"
								title="合同附件"
								width="200"
								trigger="hover"
								:content="String(scope.row.attachment)">
								<el-button type="text" slot="reference">查看附件</el-button>
							</el-popover>
						</template>
					</template>
				</template>
			</el-table-column>
			<el-table-column prop="tax" label="税率"   width="80" v-if="ColumnVisible.tax.value"></el-table-column>
			<el-table-column prop="payment_days" label="账期"     width="180" v-if="ColumnVisible.payment_days.value"></el-table-column>
			
			<el-table-column prop="init_data" label="期初" width="180" v-if="ColumnVisible.init_data.value"></el-table-column>
			<el-table-column prop="id" label="">
				<template slot-scope="scope">
					<div class="month-td" v-if="initAmount">期初</div>
					<div class="month-td" v-if="sale">销售</div>
					<div class="month-td" v-if="receive">回款</div>
					<div class="month-td" v-if="balance">欠款</div>
				</template>
			</el-table-column>
			<el-table-column label="每月销量" >
				<el-table-column  v-for="(item, key) in month" :key="key" :label="item" width="120">
					<template slot-scope="scope">
						<span v-for="(it, mk) in scope.row.monthly_sales" :key="mk" v-if="item == it.name">
							<div class="month-td" :class="{stripe: scope.row.id % 2 == 0 && key <3}" v-if="initAmount">{{it.initAmount}}</div>
							<div class="month-td" :class="{stripe: scope.row.id % 2 == 0 && key < 5}" v-if="sale">{{it.amountfor}}</div>
							<div class="month-td" :class="{stripe: scope.row.id % 2 == 0 && key < 5}" v-if="receive">{{it.real_amountfor}}</div>
							<div class="month-td" :class="{stripe: scope.row.id % 2 == 0 && key <3}" v-if="balance">{{it.arrears}}</div>	
						</span>
					</template>
				</el-table-column>
			</el-table-column>
		</el-table>
		<div class="cooperate-pagination">
			<el-pagination
				small
				background
				:layout="pagination.layout"
				:page-sizes="pagination.pagesizes"
				:page-size="pageSize"
				:total="total"
				:current-page="currentPage"
				@current-change="pageChange"
				@size-change="sizeChange"
				v-if="total > 0"
			>
			</el-pagination>
		</div>
	</div>
</template>
<script>
import AppConst from '@/util/appConst.js';
import SaleOrderList from './tabs/SaleOrderList.vue';
import ReceivebillList from './tabs/ReceivebillList.vue';
import DiscountList from './tabs/DiscountList.vue';
import RefundList from './tabs/RefundList.vue';
import RecePlanList from './tabs/RecePlanList.vue';

export default{
	data() {
		return {
			height: "calc(100% - 35px - 100px)",
			pageSize: 10, //一页显示多少
			currentPage: 1,
			month:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
			query: {
				conf: [],
				offset: 0,
				limit: 10,
				initialization: true, 
				type: 1
			},
			
			expands: [],
			Tabs: [
				{name: '销售明细', component: SaleOrderList,moduleName: "SaleOrderList"},
				{name: '收款明细', component: ReceivebillList, moduleName: "ReceiveBillList"},
				// {name: '优惠明细', component: DiscountList, moduleName: ""},
				{name: '退货明细', component: RefundList, moduleName: "RefundList"},
				{name: '收款计划', component: RecePlanList,moduleName: "RecePlanList"}
			],
			CurrentRow: {},
			ArrowActiveIndex: false, //展开图标旋转类
			DomRefresh: true,
		}
	},
	methods: {
		init() {
			this.updateFilterQuery();
			
			this.$store.dispatch('ARSum', this.query).then(() => {
				
				this.initialization = false;
			});
			this.$store.dispatch('InitPagination');
		},
		reloadTable() {
			
			this.updateFilterQuery();
				this.$store.dispatch('ARSum', this.query);
			
			
		},
		indexMethod(index) {

			return ++index;
		},
		rowClick(row, event, column) {
			if (column.label == '展开') {
				let temp = this.expands;
				this.expands = [];

				if ( temp[0] != row.rowkey ) {
					this.expands.push(row.rowkey);
					this.activeRow(row);
					this.ArrowActiveIndex = row.index;
				}
				else {
					this.ArrowActiveIndex = false;
				}
			} 
			
		},
		getRowKeys(row) {

			return row.rowkey;
		},
		expandChange(data,expandedRows) {

			//控制只显示当前行
	    	if (expandedRows.length) {
	         	this.expands = []; 
	        	if (data) {
	          		this.expands.push(data.rowkey);
	          		this.activeRow(data);
	        	} 
			}
			else {
	        	this.expands = [];
			}
			this.CurrentRow = data;  
		},
		activeRow(row) {
			this.$store.dispatch('ARSumCurrentRow', row);
 			this.Tabs.forEach((item) => {
				this.$store.dispatch('Get'+item.moduleName, {pid:row.pid});
			});
		},
		updateFilterQuery() {
			this.$store.dispatch('updateFilterQuery', this.query);
		},
		updateFilterQueryParam() {
			this.$store.dispatch('updateFilterQueryParam', {type: 1}).then(() => {
			});
		},
		OpenSaleOrderDialog() {
			this.$store.dispatch('AlterTableConfig', {SaleOrderVisible: true});
		},
		OpenReceivebillOrderDialog() {
			this.$store.dispatch('AlterTableConfig', { ReceivebillVisible: true});
		},
		OpenRefundOrderDialog() {
			this.$store.dispatch('AlterTableConfig', { RefundVisible: true});
		},
		OpenRecePlanDialog() {
			this.$store.dispatch('AlterTableConfig', { RecePlanVisible: true});
		},
		OpenChangeCusDialog() {
			this.$store.dispatch('AlterTableConfig', { ChangeCustVisible: true});
		},
		//tab切换时的事件函数
		tabClick(tab) {
			this.Tabs.forEach((item) => {
				if (item.name == tab.label) {
					if (!this.$store.state.user[item.moduleName].ready) {
						this.$store.dispatch('Get'+item.moduleName, {pid:this.CurrentRow.pid});
					}
				}
			});
			
		},
		pageChange(pageNow) {
			this.currentPage = pageNow;
			this.query.offset = (pageNow - 1) * this.query.limit;
			this.reloadTable();	
		},
		sizeChange(pageSize) {
			this.query.limit = pageSize;
			this.pageChange(this.currentPage);
			//this.reloadTable();
		},
		/**预览合同附件 */
		OpenViewWindow(id) {
			window.open(AppConst.BACKEND_DOMAIN_VIEW_URL+"?id="+id+"&token="+this.$store.state.user.token, new Date().getTime(),'width=800,height=500');
		}
	},
	created() {
		this.init();
	},
	activated() {
		this.updateFilterQueryParam();
	},
	
	computed: {
		tableData: function() {
			
			return this.$store.state.user.ARSum;
		},
		tableLoading: function() {
			return this.$store.state.user.ARSumLoading;
		},
		sale: function() {
			return this.$store.state.user.ARTableConfig.sale;
		},
		receive: function() {
			return this.$store.state.user.ARTableConfig.receive;
		},
		balance: function() {
			return this.$store.state.user.ARTableConfig.balance;
		},
		initAmount: function() {
			return this.$store.state.user.ARTableConfig.init;
		},
		Role: function() {
			return this.$store.state.user.ARSumUserRole;
		},
		user: function() {
			return this.$store.state.user.userInfo;
		},
		pagination: function() {
			
			return this.$store.state.user.BasePagination;
		},
		total: function() {
			return this.$store.state.user.ARSumTotal;
		},
		ColumnVisible: function() {
			return this.$store.state.user.ARTableConfig.ColumnVisible;
		},
		fontSize: function() {
			this.DomRefresh = false;
			let FontSize = this.$store.state.user.ARTableConfig.FontSize;
			
			if (FontSize && typeof(FontSize) != 'undefined' ) {
				
				this.$nextTick(() => {
					this.DomRefresh = true;
				});
			}
			
			return FontSize + 'px';
		}
	},
	
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.cooperate-wallper
	width: 100%;
	height: 100%;
	position: relative;
	.ar-table
		width: 100%;
		height: 100%;
		position: relative;
		.month-td
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1px solid #ddd;
		td .month-td:nth-child(2) 
			padding: 2px 0px;
		td .month-td:nth-last-child(1)
			border: 0px; 
		td .stripe
			background: #ccc;
		.tip
			font-size: 12px;
			cursor:pointer;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		.row-expand
			padding: 15px;
			max-width: 800px;
			position:relative;
			.expand-button
				margin-bottom: 15px;
	.cooperate-pagination
		margin-top: 20px;
		text-align: center;
	.el-icon-arrow-rotate-leave
		transition: all 0.3s ;
		transform: rotate(0deg);
	.el-icon-arrow-rotate-active
		transition: all 0.3s ;
		transform: rotate(90deg);
</style>