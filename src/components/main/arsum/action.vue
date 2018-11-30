<template>
	<div class="filter-wapper">
		<section>
			<el-button type="primary" size="mini" @click.native="ShowDialog({FilterVisible:true})">过滤</el-button>
			<el-button type="success" size="mini" @click.native="ShowDialog({CreateCustVisible:true})">新建客户</el-button>
			<el-button type="success" size="mini" @click.native="ShowDialog({CreateProVisible:true})">新建项目</el-button>
			<el-button type="success" size="mini" @click.native="ShowDialog({ImportVisible:true})">批量导入</el-button>
			<el-button type="info" size="mini" @click.native="ShowDialog({CreatePotentialProVisible:true})">新建潜在项目</el-button>
			<!-- <el-button type="warning" size="mini">偏好设置</el-button> -->
		</section>
		<section class="action-tool">
			<el-radio-group v-model="tabPosition"  @change="tabHandle" style="margin-left: -80px;">
				<el-radio-button label="cooperate" >合作客户</el-radio-button>
				<el-radio-button label="target"   >目标客户</el-radio-button>
			</el-radio-group>
			<div class="checkbox-group" v-if="this.tabPosition == 'cooperate'">
				<el-checkbox v-model="config.sale" @change="checkBoxHandle">销售额</el-checkbox>
				<el-checkbox v-model="config.receive" @change="checkBoxHandle">回款</el-checkbox>
				<el-checkbox v-model="config.balance" @change="checkBoxHandle">欠款</el-checkbox>
				<el-checkbox v-model="config.init" @change="checkBoxHandle">期初</el-checkbox>
			</div>
		</section>
	</div>
</template>
<script>
export default{
	data() {
		return {
			tabPosition: 'cooperate',
			config: {
				sale: true,
				receive: false,
				balance: false,
				init: false
			}
		}
	},
	methods: {
		init: function() {
			this.setTable();
		},
		setTable: function() {
			this.$store.dispatch('SetARTable', this.tabPosition);
		},
		tabHandle(tab) {
			this.setTable();
		},
		checkBoxHandle() {
			this.$store.dispatch('AlterTableConfig', this.config);
		},
		ShowDialog(obj) {
			this.$store.dispatch('AlterTableConfig', obj);
		},
		
	},
	created() {
		this.init();
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.filter-wapper
	width: 100%;
	position: relative;
	display: flex;
	section
		flex: 1;
		position: relative;
	.action-tool
		display: flex;
		justify-content: space-between;
		.checkbox-group
			display: flex;
			align-items: center;
</style>