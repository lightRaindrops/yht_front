<template>
	<div class="count-wapper">
		<div class="tool">
			<span label="date">
				选择日期:
			</span>
			<span class="date-pick">
				<el-date-picker
			      v-model="year"
			      type="year"
			      @change="UserChange"
			      placeholder="选择年">
			    </el-date-picker>
			</span>
		</div>
		<p class="notify">注: 当前页面只统计总经理和经理的赞</p>
		<div class="table">
			<el-table
		    	:data="tableData"
		    	show-summary
		    	:summary-method="getSummaries"
		    	max-height="400px"
		   	>
		   		<el-table-column
					prop="name"
					label="来源"
		   		>
		   		</el-table-column>
	    		<el-table-column
	    			prop="detail.January"
	    			label="一月"
			    >
			   	</el-table-column>
				<el-table-column
	    			prop="detail.February"
	    			label="二月"
			    >
			   	</el-table-column>
			   	<el-table-column
	    			prop="detail.March"
	    			label="三月"
			    >
			   	</el-table-column>
			   	<el-table-column
	    			prop="detail.April"
	    			label="四月"
			    >
			   	</el-table-column>
			   	<el-table-column
	    			prop="detail.May"
	    			label="五月"
			    >
			   	</el-table-column>
			   	<el-table-column
	    			prop="detail.June"
	    			label="六月"
			    >
			   	</el-table-column>
			   	<el-table-column
	    			prop="detail.July"
	    			label="七月"
			    >
			   	</el-table-column>
			   	<el-table-column
	    			prop="detail.August"
	    			label="八月"
			    >
			   	</el-table-column>
			   	<el-table-column
	    			prop="detail.September"
	    			label="九月"
			    >
			   	</el-table-column>
			   	<el-table-column
	    			prop="detail.October"
	    			label="十月"
			    >
			   	</el-table-column>
			   	<el-table-column
	    			prop="detail.November"
	    			label="十一月"
			    >
			   	</el-table-column>
			   	<el-table-column
	    			prop="detail.December"
	    			label="十二月"
			    >
			   	</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			year: new Date().getFullYear().toString(),
		};
	},
	methods: {
		init() {
			this.loadTable();
		},
		loadTable() {
			this.$store.dispatch('AgreeEveryMonth', {year: this.year});
		},
		UserChange() {
			this.year = this.year.getFullYear().toString();
 			this.loadTable();
		},
		getSummaries(param) {
        	const { columns, data } = param;

	        const sums = [];
	        
	        columns.forEach((column, index) => {
	        	if (index === 0) {
	            	sums[index] = '合计';
	            	return;
	          	}
	          	const values = data.map(item => {
	          		//遍历每行的数据
	          		let list = [];
	          		let detail = item.detail;
	          		//
	          		for (let i in detail) {
	          			list.push(detail[i]);
	          		}
	          		//只返回当前列对应行的数据
	          		return list[index-1];
	          	});

	          	//汇总每列的数据
	          	 if (!values.every(value => isNaN(value))) {
		          	sums[index] = values.reduce((pre, curr) => {
		          		const value = Number(curr);

		          		if (!isNaN(value)) {
		          			return pre+curr;
		          		} else {
		          			return pre;
		          		}
		          	});
		        }
	        });
	        
	        let temp = 0;

	        for (let i in sums) {
	        	if (i == 0 || sums[i] < 1) continue;

	        	temp = sums[i]+temp;
	        }

	        sums[0] = '合计('+temp+")";
	       	
	        return sums;
	    }
	},
	created() {


		this.init();
	},
	computed: {
		tableData: function() {
			return this.$store.state.user.AgreeEveryMonth;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.count-wapper
	width: 100%;
	padding: 15px;
	.tool 
		color: #8590a6;
		margin-bottom: 12px;
		.date-pick
			margin-left: 15px;
	.notify
		color: red;
		font-size: 12px;
</style>