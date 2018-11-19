<template>
	<div class="wapper">
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="群聊管理" name="first">
		    	<v-chat></v-chat>
		    </el-tab-pane>
		    <el-tab-pane label="用户管理" name="second">用户管理</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script type="text/javascript">
import Chat from './chat.vue';
export default{
	data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: {
    	'v-chat': Chat
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.wapper
	width: 100%;
	height: 100%;
	padding: 20px;
</style>