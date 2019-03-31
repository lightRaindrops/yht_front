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
		<el-table-column prop="index" label="序号" fixed="left" width="50">
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
		<el-table-column prop="protype" label="施工范围" fixed="left"  ></el-table-column>
		<el-table-column prop="user_name" label="业务员"  fixed="left"   width="80">
		</el-table-column>
		<el-table-column prop="tag" label="标签"  fixed="left"  width="80">
			<template slot-scope="scope">
				<el-tag type="success" v-if="scope.row.tag">{{scope.row.tag}}</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="estimate" label="预计金额"   fixed="left" ></el-table-column>
		
	</el-table>
</template>
<script>
export default{
	data() {
		return {
			height: "calc(100% - 35px - 100px)",
			
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
			this.$store.dispatch('updatePotentialFilterQueryParam', this.query);
			this.$store.dispatch('PotentialCustomer', this.query);
		},
		indexMethod(index) {

			return ++index;
		},
		
	},
	activated() {
		this.init();
	},
	computed: {
		tableData: function() {
			console.log(this.$store.state.user.PotentialCustomer.row)
			return this.$store.state.user.PotentialCustomer.row;
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