<template>
	<div class="wapper" >
		<div class="article-container" ref="ArticleContainer">
			<div class="artilce-item Item-Card" 
				v-for="(item,keys) in article" 
				:key="keys"
				:style="{'animation-delay': keys*0.3+'s'}"
			>
				<div class="FeedSource-firstline">
					类别: {{item.category}} 
				</div>
				<p class="AuthorInfo-content">
					<span class="head-img"><img :src="item.headimg ? item.headimg : 'http://e.yhtjc.com/v2/public/img/default.png'"></span>
					<span class="user-name">{{item.user}}</span>
				</p>
				<h2 class="Item-title" @click="JumpArticle(item.id)">{{item.title}}</h2>
				<div class="Item-content" >
					<div class="title-pic" v-show="item.titlepic == null ? false : true">
						<img :src="item.titlepic" />
					</div>
					<div class="item-abstract" @click="JumpArticle(item.id)">
						<!-- 国内一线城市，首推北京、上海、广州、深圳，而在这四个强一线城市中互联网氛围最浓厚的，尤其以北京最为典型。那么我们就从北京这个大背景下开始聊起。从闲谈说开去从今天起，我拥有了一个新朋友，他叫王小闰（花名) -->
						{{item.abstract}}<a href="javascript:void(0)">阅读全文 <i class="iconfont icon-down"></i></a>
					</div>
				</div>
				<div class="ContentItem-actions">
					<span>
						<button type="button" class="VoteButton"><i class="iconfont icon-dianzan"></i>赞同 0</button>
					</span>
					<span>发布于 {{item.created}}</span>
					<span>
						<button type="button" class="Button-withIcon"><i class="iconfont icon-icon_comment"></i> 55条 评论</button>
					</span>
					<span>最后发言 {{item.lastUser}}</span>
				</div>

			</div>
			
		</div>
		<div class="Sticky is-fixed" :style="fixedStyle">
			<div class="Sticky-list Item-Card">
				<div class="Sticky-item">
					<span class="Sticky-item-name"><i class="iconfont icon-gongnengguanli"></i> 类别：</span>		
					<v-popover
						:list="category"
						:defaultIndex="query.category_id"
						@Itemchange="ChangeCategory"
					/>
				</div>

				<div class="Sticky-item">
					<span class="Sticky-item-name"><i class="iconfont icon-shijian01"></i> 时间：</span>		
					<v-popover
						:list="dateList"
						:defaultIndex="DateSection"
						@Itemchange="ChangeDate"
					/>
				</div>
			</div>
			<div class="Sticky-list Item-Card Mine-actions">
				<div class="Mine-action-item">
					<span class="Mine-action-item-name"><i class="iconfont icon-Collection"></i> 我的文章</span>
					<span class="Mine-action-item-label">5</span>
				</div>
				<div class="Mine-action-item">
					<span class="Mine-action-item-name"><i class="iconfont icon-dianzan"></i> 我的获赞</span>
					<span class="Mine-action-item-label">6</span>
				</div>
				<div class="Mine-action-item">
					<span class="Mine-action-item-name"><i class="iconfont icon-tixing"></i> 我的提醒</span>
					<span class="Mine-action-item-label">7</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import Popover from './popover.vue';
export default {
	props: {
		navsTakeUp: {
			type: Boolean,
		}
	},
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
    watch: {
    	navsTakeUp: function() {
    		
    		if (this.navsTakeUp == true) {
    			
				this.fixedStyle = {
    				left: 65 + 45 + 694 + 10+'px'
    			};
	    			
    			
    		} else {
    			this.fixedStyle = '';
    		}

    	}
    },
    components: {
    	'v-popover': Popover
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wapper
	// width: 1025px;
	width: 100%;
	// height: 100%;
	margin-top: 15px;
	position: relative;
	padding: 5px 0px 15px 15px;
	// margin: 0 auto;
	text-align: left;
	overflow-y: auto;
	display: flex;
	align-items: flex-start;
	box-align: start;
	// background: rgb(246,246,246);
	.Item-Card
		margin-bottom: 10px;
		background: #fff;
		overflow: hidden;
		border-radius: 2px;
		box-shadow: 0 1px 3px rgba(26,26,26,.3);
	.Sticky
		flex: 1;
		color: #8590a6;
		font-size: 14px;
		// line-height: 58px;
		// padding: 15px 20px;
		width: 296px;
		transition: all 0.5s;
		.Sticky-list
			width: 100%;
			padding: 10px 15px;
			animation-name: fadeInUp;
			animation-timing-function: ease;
			animation-duration: 0.5s;
			animation-fill-mode: backwards;
			&:last-child
				animation-delay: 0.3s;
			.Sticky-item
				display: flex;
				height: 40px;
				.Sticky-item-name
					display: -webkit-box;
					-webkit-box-align: center;
					-webkit-box-pack:center;
		.Mine-actions
			padding: 10px 0px;
			.Mine-action-item
				padding: 8px 15px;
				margin: 0;
				cursor: pointer;
				display: flex;
				justify-content: space-between;
				&:hover
					background: rgb(246,246,246);
					.Mine-action-item-label
						background: #fff;
				.Mine-action-item-label
					padding: 5px 10px;
					border-radius: 2px;
					background: #f6f6f6
					font-size: 12px;
					font-weight: bold;
				
	.is-fixed
		position: fixed;
		width: 296px;
		left: calc(210px + 694px +30px +10px +15px);
	.article-container
		// padding-top: 15px;
		// flex: 1;
		margin-right: 10px;
		width: 694px;
		flex-basis: 694px;
		// overflow: hidden;
		.artilce-item
			max-width: 100%;
			padding: 16px 20px;
			align-items: center;
			transition: all 0.5s;
			animation-name: fadeInUp;
			animation-timing-function: ease;
			animation-duration: 0.5s;
			animation-fill-mode: backwards;
			.FeedSource-firstline
				color: #8590a6;
				margin-bottom: 8px;
			.AuthorInfo-content
				display: flex;
				align-items: center;
				.head-img
					width: 30px;
					height: 24px;
					flex-basis: 30px;
					img
						height: 24px;
						height: 24px;
						border-radius: 3px;
				.user-name
					margin-left: 10px;
			.Item-title
				// margin-left: 10px;
				font-size: 18px;
				font-weight: 600;
				line-height: 1.6;
				color: #1a1a1a;
				cursor: pointer;
				&:hover
					color: #175199;
			.Item-content
				cursor: pointer;
				display: flex;
				max-height: 100px;
				margin-top: 16px;
				.title-pic
					width: 190px;
					height: 105px;
					flex-basis: 190px;
					margin-right: 18px;
					margin-top: -2px;
					margin-bottom: 4px;
					position: relative;
					img
						width: 100%;
						height: 100%;
						border-radius: 4px;
				.item-abstract
					flex: 1;
					word-break: break-word;
					overflow: hidden;
					// margin-top: 16px;
					// margin-bottom: -4px;
					line-height: 1.6
					font-size: 15px;
			.ContentItem-actions
				padding: 10px 20px;
				margin: 0 -20px -10px;
				color: #646464;
				span
					color: #8590a6;
					font-size: 14px;
					button
						color: #8590a6;
						background: none;
						cursor: pointer;
						outline: none;
						border: 0px;
					&:not(:first-child)
						margin-left: 24px;
					.VoteButton
						color: #0084ff;
						border-radius: 3px;
						background: rgba(0,132,255,.1);
						border-color: transparent;
						line-height: 30px;
						padding: 0 12px;
					.Button-withIcon
						padding: 0;
@media screen and ( max-width : 1300px)
	.is-fixed
		left: calc(65px + 694px +45px +10px) !important;
</style>