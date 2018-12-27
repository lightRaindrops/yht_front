<template>
	<div class="editor-container" ref="ckeditor">
		<froala :tag="'textarea'" :config="froalaConfig" v-model="content"></froala>
	</div>
</template>
<script>
import VueFroala from 'vue-froala-wysiwyg';

export default { 
	props: {
      	PropConfig: {
			type: Object,
			default: () => {
				return {};
			}
		},
		value: {//双向数据流绑定中必须要用value
			default: ""
		},
		height: {
			type: Number,
			default: 350
		}
    },
    data() {
      	return {
			froalaConfig: {
				pluginsEnabled:[
					'align', 
					'charCounter', 
					'codeBeautifier', 
					'colors', 
					'draggable', 
					'entities', 
					'file', 
					'fontAwesome', 
					'fontFamily', 
					'fontSize', 
					'image', 
					'imageTUI', 
					'imageManager', 
					'inlineStyle', 
					'inlineClass', 
					'lineBreaker', 
					'lineHeight', 
					'link', 
					'lists', 
					'paragraphFormat', 
					'paragraphStyle', 
					'quote',
					'table', 
					'url', 
					'video', 
					'wordPaste'
				],
                toolbarButtons: ['undo', 'redo', 'clearFormatting', '|', 'bold', 'italic', 'underline','strikeThrough','|', 'fontFamily', 'fontSize', 'color', '|','paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertTable',  'specialCharacters', 'insertHR'],
        		theme: "dark",//主题
                placeholder: "请输入内容",
                language: "zh_cn",//国际化
                imageUploadURL: this.$appConst.EDITOR_IMG_URL+'?token='+this.$store.state.user.token,//上传url
          		//fileUploadURL: "http://i.froala.com/upload",//上传url 更多上传介绍 请访问https://www.froala.com/wysiwyg-editor/docs/options
                // quickInsertButtons: [],//快速插入项
          		// toolbarVisibleWithoutSelection: true,//是否开启 不选中模式
          		disableRightClick: true,//是否屏蔽右击
                colorsHEXInput: true,//关闭16进制色值
                toolbarSticky: true,//操作栏是否自动吸顶
                // zIndex: 99999,
				height: this.height,
				charCounterMax: -1,//字数
        	},
      	}
    },
    created() {
		
		//合并配置信息
		if (Object.keys(this.PropConfig).length > 0) {
			for (let i in this.PropConfig) {
				this.editorConfig[i] = this.PropConfig[i];
			}
		}
	},
	computed: {
		content: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		}
	},
	methods: {
		onEditorReady() {
			this.$el.querySelector('.ck-content').style.height = this.height + 'px';
		}
	}
}
</script>