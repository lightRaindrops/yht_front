<template>
	<div class="content-wallper" v-loading="loading" ref="wapper">
		<div class="btn-return">
			<div class="return-circle" title="返回" @click="returnPre">
				<i class="el-icon-back"></i>
				<!-- <span>返回</span> -->
			</div>
		</div>
		<div class="artilce-container">
			<div class="content-container " >
				<h1 class="title">{{article.title}}</h1>
				<p class="subtitle">
					<span>{{article.name}}</span>
					<span>{{article.created}}</span>
				</p>
				<div class="content-body" ref="ContentBody" v-html="article.body"></div>
				<!-- <content-body></content-body> -->
				<div class="thend"></div>
				<div class="agree">
					<div class="click-agree" :class="{alreadyAgree: alreadyAgree}" @click="handleAgree">
						<div class="circle">
							<i class="iconfont icon-dianzan"></i>
						</div>
						<span v-if="!alreadyAgree">赞一下 ({{AgreeNum}})</span>
						<span v-if="alreadyAgree">已赞{{AgreeNum}}</span>
					</div>
				</div>
				<div class="QuestionAnswers-Wrapper " ref="editor">
					<div class="QuestionAnswers-answerAdd Item-Card">
						<div class="AnswerAdd">
							<div class="AnswerAdd-header">
								<div class="AnswerAdd-info Author-info">
									<span class="Author-info-avatar">
										<img :src="'http://e.yhtjc.com/v2/public/img/default.png'">
									</span>
									<span class="AnswerAdd-user-name">
										{{user.name}}
									</span>
								</div>
							</div>
							<div class="Answer-editor">
								<v-editor :height="200" v-model="AnswerForm.content"></v-editor>
							</div>
				  			<div class="AnswerForm-footer">
				  				<div class="AnswerForm-footerContent">
				  					<div class="AnswerForm-footerRight">
				  						<el-button type="primary" size="medium" @click.native="SubmitAnswer" :loading="SubmitAnswerStatus">提交评论</el-button>
				  					</div>
				  				</div>
				  			</div>
						</div>
					</div>
					<div class="QuestionAnswers-answers">
						<div class="Answer-list " ref="AnswerList">
							<div class="Answer-List-header">
								<h4 class="List-headerText">
									<span v-if="AnswerList.length > 0">{{AnswerList.length}}个评论</span>
									<span v-else >暂无评论</span>
								</h4>
							</div>
							<div class="Answer-list-item" v-for="(item, keys) in AnswerList" :key="keys">
								<div class="Answer-user-info">
									<div class="Answer-user-avatar">
										<img :src="'http://e.yhtjc.com/v2/public/img/default.png'">
									</div>
									<div class="Answer-user-name">
										{{item.name}}
									</div>
								</div>
								<div class="RichContent">
									<div class="RichContent-inner"  v-html="item.content"></div>

									<p class="RichContent-created">
										
										<el-tooltip effect="dark" :content="item.true_time" placement="top">
									      	<span>发布于 {{item.created}}</span>
									    </el-tooltip>
									</p>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script type="text/javascript">
import Toast from 'muse-ui-toast';
import Editor from '../publish/editor.vue';


export default {

	data() {
		return {
			loading: true,
			AricleId: 0,
			AnswerForm: {
				content: '',
				article_id: '',
			},
	        AddComment: '',
	        CurrentAnswerId: 0,
	        ContentItemId: 0,
			SubmitAnswerStatus: false,	  
			isFocus: false,  
			CuerrentCommentsFootIndex: '', 
			
		}
	},
	methods: {
		init() {
			this.AricleId = this.$route.params.id;
			let data = {id: this.AricleId};

			this.getArticle(data);
		},
		getArticle(info) {
			this.$store.dispatch('ArticleOne', info).then(() => {
				this.AnswerForm.article_id = this.article.id;
				this.loading = false;
				//获取评论
				this.getAnswer(this.article.id);
				//获取赞数
				this.getAgree(this.article.id);
			});
		},
		getAnswer(id) {
			this.$store.dispatch('ArticleAnswer', {article_id: id});
		},
		getAgree(id) {
			this.$store.dispatch('ArticleAgree',{'article_id': id});
		},
		SubmitAnswer() {
			if (this.AnswerForm.content == '') {
				return false;
			}
			this.SubmitAnswerStatus = true;
			this.$store.dispatch('AddArticleAnswer', this.AnswerForm).then(() => {
				if (this.$store.state.user.AddArticleAnswer.status == 'success') {
					Toast.success('评论成功');	
					this.AnswerForm.content = '';
					this.UECommand = 'cleardoc';
					this.SubmitAnswerStatus = false;
					this.getAnswer(this.article.id);
				} else {
					Toast.error('操作失败');	
				}
			});
		},
		handleOpenComment(id) {
			this.CurrentAnswerId = id;
		},
		handleOpenCommentList(id) {
			this.ContentItemId = id;
		},
		//点赞
		handleAgree() {
			if (!this.alreadyAgree) {
				this.$store.dispatch('AricleAgreeClick', {'article_id': this.AricleId});
			}
		},
		handleGoEdit() {
			this.$refs.wapper.scrollTop = this.$refs.editor.offsetTop;
		},
		handleInputFocus(index) {
    		this.isFocus = true;
    		this.CuerrentCommentsFootIndex = index;
    	},
    	handleBodyClick($e) {
    		
    		if (this.CuerrentCommentsFootIndex != '') {
	    		if (!this.$refs.CommentsFoot[this.CuerrentCommentsFootIndex].contains($e.target)) {
	    			this.isFocus = false;
	    		}
	    	}
    	},
		returnPre() {
			this.$router.go(-1);
		},
		AttaPrevent($el) {
			this.$nextTick(function() {
				let frNode = $el.getElementsByClassName('fr-file');
				
				for (let i = 0;i < frNode.length; ++i) {
					frNode[i].removeEventListener('click', this.AttaClick);
					frNode[i].addEventListener('click', this.AttaClick);
				
				}
			});
			
		},
		AttaClick(e) {
			e.preventDefault();//阻止默认跳转行为
			 
			let href = e.target.href;	
			window.open(href+'?token='+this.$store.state.user.token);
		}	
	},
	created() {
		this.init();
	},

	destroyed() {
		window.removeEventListener('click', this.handleBodyClick);
		this.$store.dispatch('ClearArticle');
	},
	computed: {
		article: function() {
			return this.$store.state.user.ArticleOne;
		},
    	AnswerList: function () {
    		return this.$store.state.user.ArticleAnswer;
    	},
    	alreadyAgree: function () {
    		return this.$store.state.user.ArticleAgree.alreadyAgree;
    	},
    	AgreeNum: function() {
    		return this.$store.state.user.ArticleAgree.count;
    	},
    	user() {
    		return this.$store.state.user.userInfo;
    	}
	},
	components: {
		'v-editor': Editor,
		//渲染函数 终极方案 用于修改附件信息 
		// 'content-body': {
		// 	render: function(createElement) {
		// 		return createElement(
		// 			{
		// 				template:'<div class="content-body">'+this.$store.state.user.ArticleOne.body+'</div>'
		// 			}
		// 		);
		// 	}
		// }
	},
	directives: {
	  	focus: {
	    	// 指令的定义
	    	inserted: function (el) {
	      		el.focus();
	    	}
	  	},
	
	},
	watch: {
		article: {
			deep: true,
			handler: function() {
				this.AttaPrevent(this.$refs.ContentBody);
			}
		},
		AnswerList: {
			deep: true,
			handler: function() {
				this.AttaPrevent(this.$refs.AnswerList);
			}
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.content-wallper
	width: 85%;
	// height: %;
	/*height: auto;*/
	margin-top: 15px;
	position: relative;
	overflow-y: auto;
	padding-left:40px;
	.btn-return
		position: fixed;
		bottom: 100px;
		right: 100px;
		z-index: 9999;
		.return-circle 
			display: block;
			height: 60px;
			width: 60px;
			background: #fff;
			box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
			border-radius: 50%;
			display: flex;
			cursor: pointer;
			align-items: center;
			justify-content: center;
	.Item-Card
		margin-bottom: 10px;
		background: #fff;
		overflow: hidden;
		border-radius: 2px;
		box-shadow: 0 1px 3px rgba(26,26,26,.3);
	.title
		text-align: center;
	.subtitle
		text-align: center;
		font-size: 12px;
		color: #8590a6;
		margin-bottom: 10px;
		span
			margin-right: 12px;
	.artilce-container
		// width: 1042px;
		width: 100%;
		// height: 100%;
		// overflow-y: hidden;
		display: flex;
		padding: 5px 16px;
		// margin: 0 auto;
		position: relative;
		.content-container
			width: 100%;
			max-height: 90%;
			position: relative;
			.content-body
				margin-bottom: 15px;
				
			.thend
				width: 100%;
				height: 1px;
				padding: 15px 0px;
				border-top: 1px solid #ebebeb;
				position: relative;
				z-index: 1;
				&::after
					content: 'THE END'
					margin: 0 auto;
					width: 100px;
					background: #fff;
					padding: 5px;
					position: absolute;
					top: -50%;
					left: calc(50% - 100px/2);
					text-align: center;
					// left: 50%;
			.agree
				width: 100%;
				padding: 30px;
				position: relative;
				display: flex;
				justify-content: center;
				.click-agree
					position: relative;
					cursor: pointer;
					.circle
						width: 66px;
						height: 66px;
						border: 1px solid #0096ff;
						color: #0096ff;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;
						.iconfont
							font-size: 26px;
					span
						display: block;
						color: gray;
						font-size: 12px;
						padding: 5px 0px;
						text-align: center;
				.alreadyAgree
					.circle
						background: #0096ff;
						.iconfont
							color: #fff;
			.QuestionAnswers-Wrapper
				.QuestionAnswers-answerAdd
					min-height: 282px;
					margin-bottom: 10px;
					.AnswerAdd
						position: relative;
						.AnswerAdd-header
							padding: 16px 20px;
							display: flex;
							.AnswerAdd-info
								position: relative;
								display: flex;
								align-items: center;
								.Author-info-avatar
									width: 38px;
									height: 38px;
									img
										width: 38px;
										height: 38px;
										border-radius: 2px;
								.AnswerAdd-user-name
									margin-left: 14px;
									color: #444;
									font-weight: 600;	
						.Answer-editor
							padding: 10px 16px;
						.AnswerForm-footer
							position: relative;
							.AnswerForm-footerContent
								position: relative;
								display: flex;
								height: 52px;
								padding: 5px 24px;
								// justify-content: space-between;
				.QuestionAnswers-answers
					.Answer-list
						margin-bottom: 30px;
						.Answer-List-header
							height: 50px;
							margin: 0 20px;
							border-bottom: 1px solid #f6f6f6;
							display: flex;
							align-items: center;
							.List-headerText
								margin: 0;
						.Answer-list-item
							position: relative;
							padding: 16px 20px;	
							transition: all 0.5s;
							animation: fadeIn ease 1s;
							&::after
								content: '';
								position: absolute;
								bottom: 0;
								left: 0;
								right: 0;
								margin: 0 20px;
								border-bottom: 1px solid #f6f6f6;
							.Answer-user-info
								display: flex;
								align-items: center;
								.Answer-user-avatar
									img
										width: 38px;
										height: 38px;
										border-radius: 3px;
								.Answer-user-name
									color: #646464;
									font-size: 15px;
									margin-left: 14px;
							.RichContent
								position: relative;
								line-height: 1.67;
								.RichContent-inner
									margin-top: 9px;
								.RichContent-created
									font-size: 14px;
									color: #8590a6;
									margin-top: 10px;
									cursor: pointer;
							.ContentItem-actions
								color: #646464;
								padding: 10px 0px 10px 0px;
								.ContentItem-action
									font-size: 14px;
								.Button
									color: #8590a6;
									border: 0px;
									outline: none;
									text-align: center;
									cursor: pointer;
									background: transparent;
							.ContentItem-comments-list
								position: relative;
								.CommentTopbar
									height: 50px;
									padding: 0 20px;
									display: flex;
									align-items: center;
									.CommentTopbar-title
										margin: 0;
										font-size: 15px
										color: #1a1a1a;
								.Comments-list
									.Comments-item
										padding: 12px 20px 10px;
										font-size: 15px;
										position: relative;
										.Comments-item-user
											height: 27px;
											position: relative;
											padding-right: 3px;
											padding-left: 1px;
											padding-bottom: 5px;
											line-height: 24px;
											display: flex;
											align-items: center;
											.Comments-item-user-avatar
												margin-right: 8px;
												img
													width: 24px;
													height: 24px;
											.Comments-item-user-name
												flex: 1;
												.user-link
													cursor: pointer;
												.CommentItem-roleInfo
													margin-right: -8px;
													color: #8590a6;
												.CommentItem-reply
													margin-right: 8px;
													margin-left: 8px;
													color: #8590a6;
										.Comments-item-content
											line-height: 25px;
											margin-bottom: 6px;
										.Comments-item-foot
											color: #8590a6;
											.Comments-item-reply
												margin-left:20px;
												font-size: 15px;
												.Comments-reply-button
													background: none;
													border: 0px;
													color: #8590a6;
													cursor: pointer;
										&::after
											content: '';
											position: absolute;
											margin: 0 20px;
											top: 0;
											left: 0;
											right: 0;
											border-bottom: 1px solid #f6f6f6;
								.ContentItem-comments-foot
									padding: 12px 20px;
									position: relative;
									display: flex;
									border-top: 1px solid #ebebeb;
									.ContentItem-comments-input
										padding: 5px 12px;
										cursor: text;
										background: #f6f6f6;
										color: #8590a6;
										line-height: 1.6;
										border: 1px solid #ebebeb;
										border-radius: 3px;
										width: 100%;
										// flex: 1;
										transition: all 0.3s;
									.is-focus
										background: #fff;
										width: calc(100% - 24px - 18px - 16px);
										border: 1px solid #8590a6;
										border-radius: 3px;
										& + button
											// display: block;
											transition-delay: 0.2s;
											transform: scale(1);
									.Button-comment
										// flex-basis: 60px;
										// width: 0;
										right: 16px;
										bottom: 13px;
										position: absolute;
										margin-left: 18px;
										transform: scale(0);
										
										transition: all 0.3s;
									// 	// display: none;
									// 	transform: scale(1);
										// flex: auto;
										// transition: opacity .3s ease,transform .3s ease;
									
										
		.Sticky
			position: fixed;
			color: #8590a6;
			font-size: 14px;
			margin-left: 10px;
			// left: calc((100% - 210px - 1042px) /2 + 210px +694px + 10px);
			width: 296px;
			
			transition: all 0.5s;
			.Sticky-list
				width: 100%;
				animation-name: fadeInUp;
				animation-timing-function: ease;
				animation-duration: 0.5s;
				animation-fill-mode: backwards;
				&:last-child
					animation-delay: 0.3s;
				.Sticky-item
					
					width: 100%;
					.Sticky-item-title
						display: flex;
						align-items: center;
						padding: 0 20px;
						font-weight: 600;
						color: #1a1a1a;
						height: 50px;
						width: 100%;
						border-bottom: 1px solid #f6f6f6;
					.Sticky-item-section
						padding: 16px 20px;
						position: relative;
						width: 100%;
						// display: flex;
						justify-content: center;
						.Author-user
							height: 60px;
							width: 100%;
							display: flex;
							align-items: center;
							.Author-user-avatar
								height: 60px;
								width: 60px;
								margin-right: 12px;
								img
									width: 60px;
									height: 60px;
									border-radius: 4px;
							.Author-user-name
								font-size: 20px;
								color: #1a1a1a;
								font-weight: 600;
						.Section-list
							display: flex;
							.Section-itemName
								position: relative;
								flex: 1;
								span
									display: block;
									text-align: center;
									width: 100%;
								.Section-itemName-value
									font-weight: 600;
									font-size: 18px;
									color: #1a1a1a;
						.AnswerAuthor-buttons
							margin-top: 16px;
							display: flex;
							button
								flex: 1;
								cursor: pointer;
								outline: none;
								border: 1px solid;
								padding: 0 16px;
								font-size: 14px;
								line-height: 32px;
								border-radius: 3px;
								// background: none;
							// .primary-button
							// 	color: #fff;
							// 	border-color: #0084ff;
							// 	background-color: #0084ff;
							// 	&:hover
							// 		background: rgb(0,119,230);
							.gray-button
								flex: 1;
								margin-left: 16px;
								color: #8590a6;
								display: block;
								border: 1px solid #8590a6;
								border-radius: 3px;
								display: flex;
								align-items: center;
								justify-content: center;
								background: none;
								&:hover
									background: rgb(248,248,250);
						&:not(:nth-of-type(2))
							&::after
								content: '';
								position:absolute;
								display: block;
								margin: 0 20px;
								border-bottom: 1px solid #f6f6f6;
								top: 0;
								left: 0;
								right: 0;
</style>