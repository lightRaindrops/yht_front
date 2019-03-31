<template>
	<div class="sale-list-wapper" >
		<el-table :data="tableData" border class="no-table-shadow"></el-table>
	</div>
</template>
<script>
export default {
	
	data() {
		return {
			// manageVisible: false
		}
	},
	methods: {
	 
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.DiscountList;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
</style>