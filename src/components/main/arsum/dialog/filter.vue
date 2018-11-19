<template>
	<div class="filter-manager-wapper" v-if="visible">
		<el-dialog
		  title="过滤"
		  :visible.sync="visible"
		  :before-close="FilterClose"
		  width="30%"
		  >
		  <span>这是一段信息</span>
		  <span slot="footer" class="dialog-footer">
		   
		  </span>
		</el-dialog>
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
		/**关闭**/
		FilterClose: function() {
			this.$store.dispatch('AlterTableConfig', {FilterVisible: false});
		}
	},
	computed: {
		visible: function() {
			return this.$store.state.user.ARTableConfig.FilterVisible;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
</style>