<template>
	<div class="manager-wapper">
		<el-tabs type="border-card" style="height:600px;position: relative;">
		  	<el-tab-pane label="枚举列表">
				<v-enumberate />
		  	</el-tab-pane>
		  	<el-tab-pane label="属性绑定">
		  		<v-bind />
		  	</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import BindAttr from './arset/bindAttr.vue';
import Enumberate from './arset/enumberate.vue';

export default {
	
	data() {
		return {
			// manageVisible: false
			form: {
				name: "",
				type: ""
			},
			FormRules: {}
		}
	},
	methods: {
		
	},
	components: {
		'v-bind': BindAttr,
		'v-enumberate': Enumberate
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.manager-wapper
	width: 100%;
	height: 100%;
	position: relative;
</style>