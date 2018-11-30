<!--合作客户-->
<template>
	<el-table 
		:data="tableData"
		v-loading="tableLoading"
		class="ar-table"
		border
		
		style="margin-top: 15px;"
		:height="height"
	>
		<!-- <el-table-column prop="" label="状态" fixed="left" width="80"></el-table-column> -->
		<el-table-column prop="name" label="序号" fixed="left" width="50">
			<template slot-scope="scope" v-if="scope.row.nameshow==true">
				{{scope.row.index}}
			</template>
		</el-table-column>
		<el-table-column prop="name" label="客户名称" fixed="left" min-width="200">
			<template slot-scope="scope" v-if="scope.row.nameshow==true">
				<el-tooltip effect="dark" :content="scope.row.name" placement="top">
					<a style="font-size: 12px;cursor:pointer;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.name}}</a>
				</el-tooltip>
			</template>
		</el-table-column>
		<el-table-column prop="project" label="旗下项目" fixed="left" min-width="200">
			<template slot-scope="scope" >
				<el-tooltip effect="dark" :content="scope.row.project" placement="top">
					<span style="font-size: 12px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.project}}</span>
				</el-tooltip>
			</template>
		</el-table-column>
		<el-table-column prop="" label="施工范围" fixed="left"  ></el-table-column>
		<!-- <el-table-column prop="id" label="联系电话" fixed="left"  min-width="100">
			<template slot-scope="scope" v-if="scope.row.nameshow==true"><span>14797753119</span></template>
		</el-table-column> -->
		<!-- <el-table-column prop="" label="挂靠" fixed="left" min-width="50">
			<template slot-scope="scope">
				<el-tooltip effect="dark" :content="scope.row.name" placement="top">
					<span style="font-size: 12px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">是</span>
				</el-tooltip>
			</template>
		</el-table-column> -->
		<el-table-column prop="user_name" label="业务员"  fixed="left"   width="80">
			<template slot-scope="scope">
				<span v-if="scope.row.nameshow==false">{{scope.row.user_name}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="tag" label="标签"  fixed="left"  width="80">
			<template slot-scope="id">
				<el-tag type="success">同行</el-tag>
			</template>
		</el-table-column>
		<!-- <el-table-column prop="agreement" label="合同"   width="100"></el-table-column>
		<el-table-column prop="tax" label="税率"   width="80"></el-table-column>
		<el-table-column prop="payment_days" label="账期"     width="100"></el-table-column> -->
		
		<el-table-column prop="" label="预计金额"   fixed="left" ></el-table-column>
		
	</el-table>
</template>
<script>
export default{
	data() {
		return {
			height: "calc(100% - 35px - 100px)",
			month:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
			query: {
				date: new Date().toLocaleDateString(),
				user_id: 0,
				cust_id: 0,
				pid: 0,
				order: 0,
				agreement: 2,
				limit: 15,
				offset: 0,
				type: 0
			}
		}
	},
	methods: {
		init() {
			this.updateFilterQueryParam();
			// this.$store.dispatch('ARSum', this.query);
		},
		indexMethod(index) {

			return ++index;
		},
		updateFilterQueryParam() {
			this.$store.dispatch('updateFilterQueryParam', {type: 0}).then(() => {
				// console.log(233);
			});

		}
	},
	activated() {
		this.init();
	},
	computed: {
		tableData: function() {
			//console.log(this.$store.state.user.ARSum)
			// return this.$store.state.user.ARSum;
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
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.ar-table
	width: 100%;
	height: 100%;
	position: relative;
	.sub-table
		width: 100%;
		box-sizing: border-box;
		border-bottom: 1px solid #ddd;
	td .sub-table:nth-child(2) 
		padding: 2px 0px;
	td .sub-table:nth-last-child(1)
		border: 0px; 
	td .stripe
		background: #ccc;
</style>