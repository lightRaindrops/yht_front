<template>
	<div class="answer-wapper">
		<div class="list-item" v-for="(item, keys) in list" :key="keys">
			<div class="item-meta">
				<span class="meta-title">
					{{item.message}}
				</span>
				<span class="created">
					{{item.created}}
				</span>
			</div>
			<div class="item-content">
				<h2><router-link :to="'/app/forum/list/article/'+item.article_id">{{item.title}}</router-link></h2>
				<div class="content-body" @click="redirectTo(item.article_id)">
					<span v-html="item.body"></span> 
					<!-- <span class="read-all">阅读全文<i class="iconfont icon-down"></i></span> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	methods: {
		init() {
			this.$store.dispatch('ArticleAnswerNotify').then(() => {

			});
		},
		redirectTo(id) {
			this.$router.push('/app/forum/list/article/'+id);
		}
	},
	created() {
		this.init();
	},
	computed: {
		list: function() {
			return this.$store.state.user.ArticleAnswerNotify;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.answer-wapper
	width: 100%;
	position: relative;
	// padding: 15px;
	.list-item
		position: relative
		padding: 16px 20px;
		.item-meta
			color: #8590a6;
			width: 30%;
			.meta-title
				margin-right: 18px;
			// .created
		.item-content
			font-size: 15px;
			h2
				margin: 0;
				a
					font-size: 15px;
					color: #1a1a1a;
			.content-body
				margin-top: 9px;
				// font-size: 14px;
				line-height: 1.6;
				word-break: break-word;
				cursor:pointer;
				&:hover
					color: #646464;
				.read-all
					color: #175199;
					margin-left: 4px;
					&:hover
						color: #646464;
		&::after
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			border-bottom: 1px solid #f6f6f6;
			margin: 0 20px;
				
</style>