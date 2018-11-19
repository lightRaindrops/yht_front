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
						<span class="ContentItem-author">作者 : {{item.user}}</span>
						<span class="ContentItem-created">发表于:{{item.created}}</span>
						<!-- <span class="ContentItem-clicks">阅读量： {{item.id}}</span> -->
						<span class="ContentItem-agree">
							<i class="iconfont icon-dianzan"></i>
							&nbsp;{{item.agree}}
						</span>
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
			this.$store.dispatch('ArticleShow', this.query).then(() => {

			});
			this.loadCategory();
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
			
</style>