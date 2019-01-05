<template>
	<div class="article-list-wapper" @scroll="LoadMore" ref="ArticleList" @scroll.passive="onScroll">
		<div class="article-list-category " :class="{'holder-top': TopBarFixed}">
			<span 
				v-for="(item,key) in category" :key="key" 
				:class="{'is-active': CurrentCateId == item.id}" 
				@click="ChangeCategory(item.id)"
				class="category-item" 
			>
				{{item.name}}
			</span>
		</div>
		<div class="hot-content-list">
			<div class="hot-item" v-for="(item,key) in article" :key="key" >
                <div class="item-content">
                    <div class="rich-pic" v-if="typeof(item.titlepic !=' undefined') && item.titlepic">
                        <img :src="item.titlepic" >
                    </div>
                    <div class="rich-text">
                        <a href="javascript:void(0)" @click="JumpArticle(item.id)">
                            {{item.title}}
							<span v-if="item.top" class="hot-top-title">
								<i class="iconfont icon-redu"></i>
							</span>
                        </a>
                        <div class="content">
                            {{item.abstract}}
                            <span class="read-article" @click="JumpArticle(item.id)">阅读全文<i class="el-icon-arrow-down"></i></span>
                        </div>
                    </div>
                </div>
                <div class="foot-list">
					<span class="foot-item" v-if="hasRole">
						<el-button type="primary" size="mini" v-if="!item.top" @click.native="setTop(item.id)">置顶</el-button>
						<el-button type="info" size="mini" v-else @click.native="cancelTop(item.id)">取消置顶</el-button>
					</span>
                    <span class="foot-item">
                        <i class="iconfont icon-zuozhe"></i>
                        <span class="foot-name">
                            作者：{{item.user}}
                        </span>
                    </span>
                    <span class="foot-item">
                        <i class="iconfont icon-shijian01"></i>
                        <span class="foot-name">
                            发表时间：{{item.created}}
                        </span>
                    </span>
                    <span class="foot-item">
                        <i class="iconfont icon-ai45"></i>
                        <span class="foot-name">
                            点赞：{{item.agree}}
                        </span>
                    </span>
					<span class="foot-item">
                        <i class="iconfont icon-biaoqian"></i>
                        <span class="foot-name">
                            分类： {{item.category}}
                        </span>
                    </span>
                    <span class="foot-item">
                        <i class="iconfont icon-Collection"></i>
                        <span class="foot-name">
                            收藏
                        </span>
                    </span>
                </div>
            </div>
			<div class="hot-item">
				<p class="article-loading" >{{LoadMoreStr}}</p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			fixedStyle: {},
			CategoryPopver: false,
			DateSection: 0,
			pagesize: 15,
			pagenow: 1,
			triggerHeight: 50, //触发无限滚动的距离
			scrollInit: false,
			CurrentCateId: "",//当前分类
			TopBarFixed: false,
			isLoading: false,
			lastCategory: ""
		}
	},
	methods: {
		init: function() {
			this.LoadArticleModuleCategory(this.$route.params.id)	
		},
		ReloadArticle() {
			this.$store.dispatch('ForumModuleArticlesClear');
			this.LoadArticle();
		},
		LoadArticle() {
			this.isLoading = true;
			let params = {
				attr: this.moduleAttr,
				module_id: this.moduleId,
				pagesize: this.pagesize,
				pagenow: this.pagenow,
				category: this.CurrentCateId
			};
		
			this.$store.dispatch('ForumModuleArticles', params).then(() => {
				this.isLoading = false;
			});
		},
    	JumpArticle(id) {
    		this.$router.push('/app/forum/article/'+id);
    	},
    	//读取当前部门下的分类
    	LoadArticleModuleCategory(moduleId) {
			this.$store.dispatch('LoadArticleModuleCategory',{module_id: moduleId}).then(() => {
				this.ReloadArticle();
			});;
		},
		//无限滚动
		LoadMore() {
			let dom = this.$refs.ArticleList;
			let height = dom.scrollHeight - dom.offsetHeight - dom.scrollTop; //距离底部的高度

			if (height <= this.triggerHeight && !this.loaded && !this.isLoading) {
				this.pagenow += 1;
				this.LoadArticle();
			}	
		},
		setTop(id) {
			this.$confirm('置顶该文章?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'primary'
			}).then(() => {
				this.$store.dispatch('SetArticleTop',{id:id}).then(() => {
					let response = this.$store.state.user.SetArticleTop;

					if (response.status == 'success') {
						this.$notify.success('操作成功');
						this.pagenow = 1;
						this.init();
					}
					else {
						this.$notify.error('操作失败!'+response.errmsg);
					}
				});
			}).catch(() => {
				         
			});
		},
		cancelTop(id) {
			this.$confirm('取消该文章的置顶?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'info'
			}).then(() => {
				this.$store.dispatch('CancelArticleTop',{id:id}).then(() => {
					let response = this.$store.state.user.SetArticleTop;

					if (response.status == 'success') {
						this.$notify.success('操作成功');
						this.ReloadArticle();
					}
					else {
						this.$notify.error('操作失败!'+response.errmsg);
					}
				});
			}).catch(() => {
				         
			});
		},
		onScroll() {
			if (this.scrollInit) {
				this.$route.meta.scrollTop = this.$refs.ArticleList.scrollTop;

				if (this.$route.meta.scrollTop > 50) {
					this.TopBarFixed = true;
				}
				else {
					this.TopBarFixed = false;
				}
			}
		},
		//切换分类
		ChangeCategory(categoryid) {
			if (categoryid != this.lastCategory) {
				this.CurrentCateId = categoryid;
				this.pagenow = 1;
				this.$route.meta.category = categoryid;
				this.ReloadArticle();
				this.lastCategory = categoryid;
			}
		}
	},
	created() {
		
	},
	activated() {
		this.$nextTick(() => {
            this.$refs.ArticleList.scrollTo(0, this.$route.meta.scrollTop);
            this.scrollInit = true;
        });
		this.CurrentCateId = this.$route.meta.category;
		 
		this.init();
	},
	deactivated() {
        this.scrollInit = false;
    },
	computed: {
		article: function() {
			return this.$store.state.user.ForumModuleArticles.data;
		},
		hasRole: function() {
			return this.$store.state.user.ForumModuleArticles.hasRole;
		},
    	moduleId: function() {
			return this.$route.params.id;
		},
    	moduleAttr: function() {
			return this.$route.params.attr;
		},
    	
		loaded: function() {
			return this.$store.state.user.ForumModuleArticles.loaded;
		},
		LoadMoreStr: function() {
			if (this.loaded) {
				return "加载完毕 共"+this.article.length+"篇文章";
			}
			else {
				return "加载中...";
			}
		},
		category: function() {
			let data = this.$store.state.user.ArticleModuleCategory;

			if (data.length > 0 && !this.CurrentCateId) {
				this.CurrentCateId = data[0].id;
			}

			return data;
		},
		
    },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.article-list-wapper
	width: 100%;
	height: 100%;
	position: relative;
	overflow-y: auto;
	.article-list-category
		width: 100%;
		height: 35px;
		margin-left: 35px;
		width: 1200px;
		user-select: none;
		border-bottom: 1px solid #ebebeb;
		.category-item
			font-size: 14px;
			font-weight: 400;
			cursor: pointer;
			margin-right: 25px;
			color: rgba(0,0,0,0.4);
			display: inline-block;
			height: 100%;
			transition: all 0.3s;
			&.is-active
				color: #3397cf;
				border-bottom: 2px solid #3397cf;
		&.holder-top
			position: fixed;
			background: #fff;
			z-index: 999;
			box-shadow: 0 1px 0 rgba(0,0,0,.04);
	.hot-content-list
		padding: 0px 0px 0px 20px;
		width: 100%;
		position:relative;
		.break-path
			margin-bottom: 20px;
		.hot-item
			width: 910px;
			padding: 20px;
			.item-content
				display: flex;
				.rich-pic
					cursor: pointer;
					width: 190px;
					height: 105px;
					flex-basis: 190px;
					margin-right: 10px;
					border-radius: 3px;
					overflow: hidden;
					box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
					img 
						width: 100%;
						height: 100%;
						transition: all 0.3s;
						&:hover
							transform: scale(1.1);
				.rich-text
					flex:1;
					a
						font-size: 	16px;
						font-weight: 600;
						color: #1a1a1a;
						margin-bottom: 15px;
						&:hover
							color: #175199;
						.hot-top-title
							color: red;
					.content
						cursor:pointer;
						.read-article
							cursor: pointer;
							margin-left: 5px;
							color: #175199;
							&:hover
								color:#646464
						&:hover
							color: #646464;
			.foot-list
				display: flex;
				color: #646464;
				padding: 10px 10px 0px 20px;
				.foot-item
					margin-right: 20px;
		.article-loading
			color:#ff4081;
			text-align: center;
</style>