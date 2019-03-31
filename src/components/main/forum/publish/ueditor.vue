<template>
	<div>
		<div id="editor"></div>
	</div>
</template>
<script>
import AppConst from '@/util/appConst.js';
export default { 
	  props: {
      	defaultMsg: {
        	type: String,
        	default: ''
      	},
      	command: {
      		type: String,
      	},
      	toolbars: {
      		type: Array,
      		default: function() {
      			return window.UEDITOR_CONFIG.toolbars[0];//默认返回所有的工具
      		}
      	},
      	height: {
      		type: Number,
      		default: 350
      	}
    },
    data() {
      	return {
          	config: {
              	initialFrameWidth: null,
              	initialFrameHeight: this.height,
              	serverUrl: AppConst.UE_SERVER,
              	toolbars: [this.toolbars],
          	},
            editor: {},
      	}
    },
    mounted() {
      	const self = this;
      	this.editor = UE.getEditor('editor', this.config); // 初始化UE
      	this.editor.addListener("ready", function () {
      		//
          self.editor.setContent(self.defaultMsg);
      	});
      	this.editor.addListener("contentChange", function () {
      		self.$emit('input', self.getUEContent());// v-model
      	})
    },
    methods: {
      	getUEContent() { // 获取内容方法
        	return this.editor.getContent();
      	}
    },
    destroyed() {
      	this.editor.destroy();
    },
    watch: {
    	command: function(cmd) {
    		this.editor.execCommand(cmd);
    	},
      defaultMsg: function(content) {
        this.editor.setContent(content);
      }
    }
}
</script>