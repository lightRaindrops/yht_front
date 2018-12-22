<template>
	<div class="wapper">
		<div class="layout-main">
			<div class="title-pic" v-if="showTitlePic" :class="{'title-pic-empty': !showTitlePic}">
				<div class="previewWrapper" v-show="!showTitlePic">
					<i class="iconfont icon-xiangji"></i>
					<input type="file"  name="titlePic" ref="titlePic" @change="AddTitlePic('titlePic')" />
				</div>
				<div class="previewContent" v-show="showTitlePic">
					<img :src="titlePicBase64">
					<div class="WriteCover-editWrapper">
						<button type="button" title="更换">
							<i class="iconfont icon-xiangji"></i>
						</button>
						<button type="button" title="删除" @click="RemoveTitlePic('titlePic')">
							<i class="iconfont icon-shanchu"></i>
						</button>
					</div>
				</div>
			</div>
			
			<div class="write-title">
				<input  v-model.trim="article.title" class="titleInput" placeholder="请输入标题" />
			</div>
			
  			<div class="editor"  >
				  <v-editor v-model="article.body" :height="350"></v-editor>
  			</div>
			<div class="category">
				<div class="article-attribute">
					<p>
						<span>文章属性:</span>
						<el-select v-model="article.attr" placeholder="请选择文章属性">
							<el-option
							v-for="item in ArticleAttr"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</p>
					<p v-show="AttrErrStatus" class="error-msg"> 请选择一个文章的属性</p>
				</div>	
				<div class="article-attribute" v-if="article.attr === 'public'">
					<p>
						<span>发&nbsp;布&nbsp;到&nbsp;:</span>
						<el-select v-model="article.module_id" placeholder="请选择发布模块">
							<el-option
							v-for="item in ForumModule"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</p>
					<p v-show="ModuleErrStatus" class="error-msg"> 请选择要发布到的区域</p>
				</div>	
  			</div>
			<div class="write-tool" v-if="!update">
				<el-button type="warning"  size="medium" :disabled="article.body =='' ? true : false" @click="saveArticle">保存到草稿箱</el-button>
				<el-button type="success" size="medium" :disabled="article.body =='' ? true : false	" @click="publishArticle">发表文章</el-button>
			</div>
			<div class="write-tool" v-else>
				<el-button type="warning"  size="medium" :disabled="article.body =='' ? true : false" @click="saveArticle">保存修改</el-button>
				<el-button type="success" v-if="article.status == 0" size="medium" :disabled="article.body =='' ? true : false	" @click="publishArticle">发表文章</el-button>
			</div>
	  	</div>
	</div>
</template>
<script type="text/javascript">
import Editor from '../publish/editor.vue';
export default {
	data() {
		return {
			
			defaultMsg: '',
			titlePicBase64: '',
			showTitlePic: false,
			article: {
				id: '',
				attr: '',
				title: '',
				body: '',
				status: 0,
				module_id: 0
			},
			AttrErrStatus: false,
			ModuleErrStatus: false,
	        update: false,
	        defaultArticle: {},
	        hackReset: false,
			ArticleAttr: [
				{label:'公开',value:'public'},
				{label:'部门可见', value: 'protected'}
			],
		}
	},
	methods: {
		//发布文章
		publishArticle() {
			this.$confirm('发表该文章, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'success'
	        }).then(() => {
	          	this.article.status = 1;
				this.saveArticle();
	        }).catch(() => {
	                  
	        });
		},
		/**保存到草稿箱**/
    	saveArticle() {
    		if (this.article.title == '' || this.article.body == '') {
    			this.$message.error('标题或者内容不能为空!');
    			return false;
    		}	
    		
    		if (!this.article.attr) {
    			this.AttrErrStatus = true;
    			return false;
    		} else {
    			this.AttrErrStatus = false;
    		}

    		let action = 'ArticlePost';
    		if (this.update) {
    			action = 'ArticlePut';
    		} 
    		 
    		this.$store.dispatch(action, this.article).then(() => {

    			let response = this.$store.state.user.ArticlePost;
    			if (this.update) {
    				response = this.$store.state.user.ArticleUpdate;
    			}

    			if (response.status == 'success') {
    				this.$notify.success('操作成功');
    				this.update = false;
    				this.reset();
    				this.UECommand = 'cleardoc';//清空文档
    				// this.$router.push('/app/forum/create/article');
    			} else {
    				this.$notify.error('操作失败,请重试');
    			}
    		});
    	},

    	init() {
    		this.defaultArticle = JSON.parse(JSON.stringify(this.article));
    		this.loadCategory();
    		this.isEdit();
    	},

    	/**更新模式下**/
    	isEdit() {
    		if (this.$route.query.id != '' && typeof(this.$route.query.id) != 'undefined') {
    			this.update = true;
    			
    			//获取文章内容
    			this.getContent(this.$route.query.id);
    		}
    	},	
    	/**获取文章方法**/
    	getContent($id) {
    		this.$store.dispatch('ArticleEdit', {id:$id}).then(() => {
    			
    			let data = this.$store.state.user.ArticleEditOne;

    			this.article.id = data.id;
    			this.article.body = data.body;
    			this.article.title = data.title;
    			this.article.status = data.status;
				this.article.attr = data.attr;
    			this.article.module_id = data.module_id;
    		});
    	},
    	loadCategory() {
    		this.$store.dispatch('ArticleCategory');
    	},
    	//添加缩略图
    	AddTitlePic($name) {
    		// console.log();
    		this.article.titlepic = this.$refs[$name].files[0];
    		this.titlePicBase64 = window.URL.createObjectURL(this.$refs[$name].files[0]);
    		this.showTitlePic = true;
    		
    	},
    	//删除缩略图
    	RemoveTitlePic($name) {
    		this.showTitlePic = false;
    		this.titlePicBase64 = null;
    		this.$refs[$name].value = null; //清空输入框的值
    		this.article.titlepic = null;
    	},
    	
    	//重置字段默认值
    	reset() {
    		for (let i in this.defaultArticle) {
				this.article[i] = this.defaultArticle[i];
			}
    	},

    },
    created() {
    	this.init();
    },
    mounted() {
    	this.$nextTick(() => {
    		this.hackReset = true;
    	});
    },
    computed: {
    	category: function() {
    		let data = this.$store.state.user.ArticleCategory;
    		let list = [];

    		for (let i in data) {
    			let obj = {};
    			obj.value = data[i].id;
    			obj.label = data[i].name;
    			list.push(obj);
    		}

    		return list;
    	},
    	ArticleContent: function() {
    		return this.$store.state.user.ArticleEditOne;
    	},
		ForumModule: function() {
			let list = this.$store.state.user.ForumModule, data = [];

			list.forEach((item) => {
				if (item.attr == 'public') {
					data.push({label:item.name,value:item.id});
				}
			});
			console.log(data);
			return data;
		},
    },
    components: {
		'v-editor': Editor
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
.wapper
	width: 100%;
	height: 100%;
	position: relative;
	// padding: 30px;
	margin: 0 auto;
	overflow-y: auto;
	// background: #fff;
	.layout-main
		// width: 660px;
		width: 100%;
		margin: 0 auto;
		position: relative;
		.title-pic
			width: 100%;
			min-height: 192px;
			z-index: 1;
			position: relative
			transition: all 0.5s;
			.previewWrapper
				width: 100%;
				height: 192px;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				transition: all 0.5s;
				.iconfont
					font-size: 42px;
					position: relative;
					color: rgba(0,0,0,0.2);
				input[type='file']
					display: block;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					opacity: 0;
					cursor: pointer;
					position: absolute;
					z-index: 3;
				&::after
					content: '添加文章缩略图';
					font-size: 16px;
					position: absolute;
					bottom: 52px;
					color: #b3b3b3;
					transition: all .2s;
					transform: translateY(-12px);
					opacity: 0;
				&:hover
					&::after
						opacity: 1;
						transform: translateY(0);
			
			.previewContent
				width: 100%;
				// height: 192px;
				z-index: 99;
				// position: absolute;
				position: relative;	
				animation: fadeIn ease 1s;
				img
					max-width: 100%;
				.WriteCover-editWrapper
					background: rgba(0,0,0,.75);
					width: 96px;
					height: 42px;
					display: flex;
					bottom: 5px;
					right: 0;
					position: absolute;
					button
						flex: 1;
						color: #fff;
						out-line:none;
						border: 0px;
						cursor: pointer;
						background: transparent;
		.title-pic-empty
			background: #f7f8f9;			
		.write-title
			margin: 16px 0;
			width: 100%;
			position: relative;
			padding-left: 15px;
			padding-right: 15px;
			.titleInput
				width: 100%;
				font-size: 20px;
				height: 44px;
				min-height: 44px;
				font-weight: 400;
				out-line: none;
				color: #1a1a1a;
				background: transparent;
				resize: none;
				flex: 1;
				padding: 0;		
				border: 0px;
				position: relative;
				border-bottom: 1px solid #f6f6f6;
		.editor
			padding: 15px;
		.category
			text-align: left;
			padding-left: 30px;
			border-top: 1px solid #ebebeb;	
			span
				margin-right: 15px;
				color: #666;
			.error-msg
				font-size: 12px;
				margin: 0;
				color: red;
				padding-left: 65px;
		.write-tool
			// margin-top: 30px;
			// margin-bottom: 20px;
			margin: 30px;
			// text-align:center;
</style>