<template>
	<div class="wapper">
		<div class="content-title">
			
		</div>
		<div class="content-list">
			<div class="content-item" v-for="(item , keys) in article">
				<div class="ContentItem-avatar">
					<img :src="item.headimg ? item.headimg : 'http://e.yhtjc.com/v2/public/img/default.png'">
				</div>
				<div class="ContentItem-title" :class="{'is-top': item.isfine == 1}">
					<div>
						<router-link class="title-link" :to="'/app/forum/list/article/'+item.id">{{item.title}}</router-link>
						<span v-if="item.isfine == 1" style="margin-left: 10px;font-size: 12px;color:#F26C4F"> 精华</span>
					</div>
					<div class="ContentItem-subtitle">
						<span class="ContentItem-author">楼主 : {{item.user}}</span>
						<span class="ContentItem-created">发表于:{{item.created}}</span>
						<!-- <span class="ContentItem-clicks">阅读量： {{item.id}}</span> -->
						<span class="ContentItem-agree">
							<i class="iconfont icon-dianzan"></i>
							&nbsp;{{item.agree}}
						</span>
					</div>
				</div>
				<div class="title-action">
					<el-button type="success" v-if="item.isfine == 0" @click.native="SetFine(item.id)">加精</el-button>
					<el-button type="warning" v-else  @click.native="CancleFine(item.id)">取消加精</el-button>
					<el-button type="danger" @click.native="DeleteArticle(item.id)">删除</el-button>
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
		list () {
			this.$store.dispatch('ArticleShow', this.query).then(() => {

			});
		},
		loadCategory() {
    		this.$store.dispatch('ArticleCategory');
    	},
    	JumpArticle(id) {
    		this.$router.push('/app/forum/list/article/'+id);
    	},
    	
    	ChangeCategory(id) {
    		this.query.category_id = id;
    	},
    	ChangeDate(id) {
    		this.DateSection = id;
    	},
    	
    	SetFine($id) {
    		this.$confirm('把该文章设置精品, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'success'
	        }).then(() => {

	        	this.FineSubmit($id, 1);
	          	
	        }).catch(() => {
	                  
	        });
    	},
    	CancleFine($id) {
    		this.$confirm('取消该文章精品, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {

	        	this.FineSubmit($id, 0);
	          	
	        }).catch(() => {
	                  
	        });
    	},
    	FineSubmit($id,$type) {
    		this.$store.dispatch('ArticleSetFine', {article_id:$id, status: $type}).then(() => {
          		if (this.$store.state.user.ArticleSetFine.status == 'success') {
          			this.$notify.success('操作成功');
          			this.list();
          		} else {
          			this.$notify.error('操作失败!请重试');
          		}
          	});
    	},
    	DeleteArticle($id) {
    		this.$confirm('删除该文章, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {

	        	this.SubmitDelete($id);
	          	
	        }).catch(() => {
	                  
	        });
    	},
    	SubmitDelete($id) {
    		this.$store.dispatch('ArticleDelete', {id:$id}).then(() => {
          		if (this.$store.state.user.ArticleDelete.status == 'success') {
          			this.$notify.success('操作成功');
          			this.list();
          		} else {
          			this.$notify.error('操作失败!请重试');
          		}
          	});
    	}
	},
	created() {
		this.init();
	},
	computed: {
		article: function() {
			return this.$store.state.user.article;
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
    	}
    },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wapper
	width: 100%;
	height: 100%;
	position: relative;
	overflow-y: auto;
	.content-list
		position: relative;
		padding: 15px;
		width: 100%;
		.content-item
			padding-top: 5px;
			padding-bottom: 10px;
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
			.ContentItem-title
				position: relative;
				
				.title-link
					color: #666;
					font-size: 16px;
					line-height: 1.6;
					padding-top: 10px;
					padding-bottom: 6px;
					// font-weight: 600;
					&:hover
						color: #175199;
				.ContentItem-subtitle
					color: #aaa;
					span
						margin-right: 10px;
						font-size: 12px;
			.is-top
				.title-link
					color: #EE5023;
					font-weight: 600;
			.title-action
				position: absolute;
				right: 0;
			
			
</style>