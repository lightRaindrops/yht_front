<template>
	<div class="wapper">
		<div class="hot-content-list">
			<div class="hot-item" v-for="(item,key) in article" :key="key" >
                <div class="item-content">
                    <div class="rich-pic" v-if="typeof(item.titlepic !=' undefined') && item.titlepic">
                        <img :src="item.titlepic" >
                    </div>
                    <div class="rich-text">
                        <a href="javascript:void(0)" @click="JumpArticle(item.id)">
                            {{item.title}}
                        </a>
                        <div class="content">
                            {{str}}
                            <span class="read-article" @click="JumpArticle(item.id)">阅读全文<i class="el-icon-arrow-down"></i></span>
                        </div>
                    </div>
                </div>
                <div class="foot-list">
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
                        <i class="iconfont icon-Collection"></i>
                        <span class="foot-name">
                            收藏
                        </span>
                    </span>
                </div>
            </div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.moduleId = to.params.id;
			vm.moduleAttr = to.params.attr;
			vm.checkRoute();
		});
	},	
	beforeRouteUpdate(to, from, next) {
		this.moduleId = to.params.id;
		this.moduleAttr = to.params.attr;
		this.checkRoute();
		next();
	},
	data() {
		return {
			query: {
				category_id: 0,
			},
			fixedStyle: {},
			CategoryPopver: false,
			DateSection: 0,
			str: '鹤云声： 这个事非常容易，我在河南工作的时候，经常去一些非常贫困的县村里。比如，在河南的平顶山叶县。叶县下面的各乡镇非常的贫穷，有些村甚至没有电，没有自来水，甚至有的连砖房都没有。 那么，这种村子就会充斥…',
			moduleId: "",
			moduleAttr: ""
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
    	},
		//检查路由
		checkRoute() {
			let data = this.$store.state.user.ForumModule, flag = false;

			data.forEach((item) => {
				if (item.id == this.moduleId && item.attr == this.moduleAttr) {
					flag = true;
				}
			});
			
			if (flag === false) {
				this.$router.push('/app/forum/portal');
			}
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
	
	.hot-content-list
		padding: 0px;
		.break-path
			margin-bottom: 20px;
		.hot-item
			width: 710px;
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
</style>