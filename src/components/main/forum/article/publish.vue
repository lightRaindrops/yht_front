<template>
	<div class="wapper">
		<div class="content-list">
			<div class="content-item" v-for="(item , keys) in article" :key="keys">
				<!-- <div class="ContentItem-avatar">
					<img :src="item.headimg ? item.headimg : 'http://e.yhtjc.com/v2/public/img/default.png'">
				</div> -->
				<div class="ContentItem-container">
					<div class="ContentItem-title">
						<div class="ContentItem-title-text">
							<router-link :to="'/app/forum/article/'+item.id">{{item.title}}</router-link>
						</div>
						<div class="ContentItem-subtitle">
							<span class="ContentItem-created">最后修改时间:{{item.created}}</span>
							<span class="ContentItem-agree">
								<i class="iconfont icon-dianzan"></i>
								&nbsp;{{item.agree}}
							</span>
						</div>
					</div>
					<div class="ContentItem-actions">
						<el-button type="primary" @click.native="edit(item.id)">编辑</el-button>
						<el-button type="danger" @click.native="del(item.id)">删除</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			query: {
				category_id: 0,
			},
			fixedStyle: {},
			CategoryPopver: false,
			DateSection: 0,
		}
	},
	methods: {
		
		init() {
			this.list();
			this.loadCategory();
		},
		list() {
			this.$store.dispatch('ArticlePublishList', this.query);
		},
		loadCategory() {
    		this.$store.dispatch('ArticleCategory');
    	},
    	
    	/**编辑文章**/
    	edit($id) {
    		this.$router.push('/app/forum/create/article?id='+$id);
    	},
		del(id) {
			this.$confirm('删除该文章, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'danger'
	        }).then(() => {
	          this.$store.dispatch('ArticleDelete', {id:id}).then(() => {
					let response = this.$store.state.user.ArticleDelete;

				  	if (response.status == 'success') {
						this.$notify.success('操作成功');
						this.list();
				  	}
					else {
						this.$notify.error('操作失败');
					}
			  });
	        }).catch(() => {
	                  
	        });
		}
	},
	created() {
		this.init();
	},
	computed: {
		article: function() {
			return this.$store.state.user.ArticlePublishList;
		},
    	category: function() {
    		let data = this.$store.state.user.ArticleCategory;
    		let list = [
    			{value: 0, label: '全部分类'}
    		];

    		for (let i in data) {
    			let obj = {};
    			obj.value = data[i].id;
    			obj.label = data[i].name;
    			list.push(obj);
    		}

    		return list;
    	},
    	CurrentCategory: function() {
    		for (let i in this.category) {
    			if (this.query.category_id == this.category[i].value) {
    				return this.category[i].label;
    			}
    		}
    	},
    	dateList: function() {
    		return [
    			{label: '时间不限', value: 0},
    			{label: '一周内', value: 1},
    			{label: '三个月内', value: 2},
    			{label: '六个月内', value: 3}
    		]
    	},
    	
    },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wapper
	width: 100%;
	height: 100%;
	position: relative;
	.content-list
		position: relative;
		padding: 15px;
		width: 100%;
		overflow-y: auto;
		.content-item
			padding-top: 5px;
			margin-bottom: 10px;
			display: flex;
			align-items:center;
			position: relative;
			&:not(:first-child)::after
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				border-top: 1px solid #f6f6f6;
			.ContentItem-avatar
				flex: 0 1 36px;
				width: 36px;
				height: 36px;
				margin-right: 10px;
				img
					width: 36px;
					height: 36px;
					border-radius: 2px;
			.ContentItem-container
				position: relative;
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				.ContentItem-title
					flex: 1;
					position: relative;
					.ContentItem-title-text
						color: #666;
						font-size: 16px;
						line-height: 1.6;
						padding-top: 10px;
						padding-bottom: 6px;
						cursor: pointer;
						// font-weight: 600;
						a
							color: #666;
							&:hover
								color: #ff4081;
					.ContentItem-subtitle
						color: #aaa;
						span
							margin-right: 10px;
							font-size: 12px;
				.ContentItem-actions
					margin-left: 15px;
			
</style>