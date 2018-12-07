<template>
	<div class="filter-manager-wapper" v-if="visible">
		<el-dialog
	      	width="30%"
	      	title="导入客户"
	      	:visible.sync="visible"
	      	:before-close="Close"
	      	append-to-body
	    >
	    	<el-upload
			  class="upload-demo"
			  ref="upload"
			  :headers = "headers"
			  :action="uploadUrl"
			  :on-success="uploadSuccess"
			  :limit="1"
			  :on-change="handleBeforeUpload"
			  :before-remove="handleBeforeRemove"
			  :file-list="fileList"
			  :auto-upload="false"
			  >
			  	<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			  	<el-button style="margin-left: 10px;" type="info" size="small" @click.native="downloadTemplate">模板下载</el-button>
			  	<div slot="tip" class="el-upload__tip">只支持excel文件的导入</div>
			</el-upload>
	    	<p style="font-size: 12px" v-if="upStatus">操作完成，成功{{upSuccess}}个, <el-button type="text" @click.native="ImportResultVisible = true">失败{{upFail.length}}个。点击查看</el-button></p>
		    <div slot="footer" class="dialog-footer">
		    	<el-button v-if="UploadButtonVisible" size="small" type="success" @click="submitUpload" :loading="uploading">确定导入</el-button>
				<el-button type="warning" @click="resetUpload">重置表单</el-button>
		    	<el-button @click="Close">取 消</el-button>
		    	
		  	</div>
	    </el-dialog>
	    <el-dialog
	      	width="30%"
	      	title="导入失败"
	      	:visible.sync="ImportResultVisible"
	      	append-to-body
	    >
	    	<el-table
				:data="upFail"
				height="200px"
	    	>
	    		<el-table-column prop="name" label="客户名称"></el-table-column>
	    	</el-table>
		    <div slot="footer" class="dialog-footer">
		    	<el-button @click="ImportResultVisible = false">关闭</el-button>
		  	</div>
	    </el-dialog>
	</div>
</template>
<script>
export default {
	
	data() {
		return {
			fileList: [],
			upStatus: false,
			headers: {},
			token: "",
			appUrl: '',
			uploadUrl: "",
			upSuccess: 0,
			upFail: [],
			uploading: false,
			UploadButtonVisible: false,
			ImportResultVisible: false,
		}
	},
	methods: {
		init() {
			this.InitUpload();
		},
		InitUpload() {
	    	this.$store.dispatch('ARUploadUrl').then((response) => {
	    		this.token = response.token;
	    		this.headers = { authorization: 'Bearer ' + this.token ,'X-Requested-With': 'XMLHttpRequest'};
	    		this.appUrl = response.url;
				this.uploadUrl = this.appUrl + 'realcustomer/import';
			});
	    },
	    uploadSuccess(response, file, fileList) {

	    	if (response.status == 'success') {

		    	this.upSuccess = response.success;
		    	this.upFail = response.fail;
		    	this.uploading = false;
		    	this.upStatus = true;
		    	this.$store.dispatch('ARSum', this.$store.state.user.filterQuery);
		    }
	    },
	    handleBeforeUpload(file) {
	        let ext = file.name.substring(file.name.lastIndexOf('.'));

	        if (ext != '.xlsx' && ext != '.xls') {
	        	this.fileList = [];
	        } else {
	        	this.fileList[0] = file;
	        }

	        if ( this.fileList.length > 0 ) {
	        	this.UploadButtonVisible = true;
	        } 
	    },
	     handleBeforeRemove(file, fileList) {
	    	this.UploadButtonVisible = false;
	    },
	    downloadTemplate() {
	    	window.open(this.appUrl + 'realcustomer/template?token='+this.token, '模板下载');
	    	// console.log(this.token)
	    },
	    submitUpload() {
			
			if (this.fileList.length < 1 || this.upStatus) {
				return ;
			}
			this.uploading = true;
        	this.$refs.upload.submit();
	    },
		/**关闭**/
		Close: function() {
			this.$store.dispatch('AlterTableConfig', {ImportVisible: false});
		},
		uploadClose() {
	    	this.fileList = [];
	    	this.upStatus = false;
	    },
		resetUpload() {
			this.upStatus = false;
			this.UploadButtonVisible = false;
			this.fileList = [];
		}
	},
	created() {
    	this.init();
    },
	computed: {
		visible: function() {
			return this.$store.state.user.ARTableConfig.ImportVisible;
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
</style>