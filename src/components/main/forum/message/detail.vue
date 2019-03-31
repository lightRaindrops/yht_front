<template>
	<div class="detail-wapper">
		<el-table
	    	:data="tableData"
	    	max-height="400px"
	   	>
    
    		<el-table-column
		      	prop="date"
		      	label="日期"
		      	width="180"
		    >
		    </el-table-column>
		    <el-table-column
				prop="name"
				label="来源"
				width="180"
		    >
			</el-table-column>
    		<el-table-column
				prop="title"
				label="文章"
				
    		>
    			<template slot-scope="scope">
    				<router-link :to="'/app/forum/list/article/'+scope.row.article_id" :title="scope.row.title">{{scope.row.title}}</router-link>
    			</template>
    		</el-table-column>
    		<el-table-column
				prop="type"
				label="类型"
				width="180"
				:filters="[{ text: '老板', value: 'boss' }, { text: '经理', value: 'manager' },{text: '普通', value:'general'}]"
      			:filter-method="filterTag"
    		>
    			<template slot-scope="scope">
			        <el-tag
						v-if="scope.row.type == 'boss'"
						:type="'danger'"
						disable-transitions
			        >老板的赞</el-tag>
			        <el-tag
						v-if="scope.row.type == 'manager'"
						:type="'warning'"
						disable-transitions
			        >经理的赞</el-tag>
			        <el-tag
						v-if="scope.row.type == 'general'"
						:type="'info'"
						disable-transitions
			        >赞</el-tag>
		      	</template>
    		</el-table-column>
      	</el-table>
	</div>
</template>
<script>
export default {
	data() {

		return {
			tdCenter: {'text-align': 'center'}
		}
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.loadTable();
		},
		loadTable() {
			this.$store.dispatch('ArticleAgreeList');
		},
		filterTag(value, row) {
			return row.type === value;
		}
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.ArticleAgreeList;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.detail-wapper
	width: 100%;
	padding: 15px;
	
</style>