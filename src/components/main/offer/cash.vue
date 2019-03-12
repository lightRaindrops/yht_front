<template>
    <div class="cash-wappler">
        <div class="cash-container">
            <div class="operate" :class="{'operate__shadow': isScroll}">
                <div class="cash-title">
                    <h2>操作</h2>
                </div>
                <el-button type="success" @click.native="SaveOrder">保存报价单</el-button>
            </div>
            <div class="data-container" ref="DataContainer">
                <div class="cash-form-container">
                    <div class="cash-title">
                        <h2>基础资料</h2>
                    </div>
                    <el-form :model="form" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" class="cash-form">
                        <el-form-item label="项目名称" prop="name">
                            <el-input v-model="form.name" placeholder="项目名"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="linkman">
                            <el-input v-model="form.linkman" placeholder="联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="phone">
                            <el-input v-model="form.phone" placeholder="联系方式"></el-input>
                        </el-form-item>
                        <el-form-item label="开票税率" prop="tax">
                            <el-input v-model="form.tax" placeholder="税率"></el-input>
                        </el-form-item>
                        <el-form-item label="品牌">
                            <el-select v-model="form.brand_id">
                                <el-options v-for="(item, key) in brand" :key="key" :label="item.label" :value="item.value"></el-options>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="配送">
                            <el-input v-model="form.dispatching"></el-input>
                        </el-form-item>
                        <el-form-item label="装卸">
                            <el-input v-model="form.unloading"></el-input>
                        </el-form-item>
                        <el-form-item label="服务人员">
                            <el-input v-model="form.waiter" placeholder="报价人"></el-input>
                        </el-form-item>
                        <el-form-item label="报价日期">
                            <el-date-picker
                                    v-model="form.date"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="form.remark" autosize placeholder="备注信息"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="atta-container">
                    <div class="cash-title">
                        <h2>附件列表</h2>
                    </div>
                    <div class="atta-container__file">
                        <div class="btn-tool">
                            <el-upload
                                    class="upload-demo"
                                    drag
                                    name="uploadfile"
                                    :on-success="handleUploadSuccess"
                                    :on-remove="handleFileRemove"
                                    :action="ActionURL"
                                    multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">文件大小不超过20MB</div>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="cash-product">
                <div class="cash-title">
                    <h2>产品名称</h2>
                </div>
                <div class="btn-tool">
                    <el-button type="success" size="mini" @click.native="addRow">添加行</el-button>
                    <el-button type="danger" size="mini" @click.native="deleteRow">删除行</el-button>
                </div>
                <div class="cash-table-container">
                    <el-table
                            :data="table"
                            border
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                            highlight-current-row
                    >
                        <el-table-column
                                type="selection"
                                width="55"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="index"
                                label="序号"
                                width="50"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="材料名称"
                        >
                            <template slot-scope="scope">
                                <el-input
                                        size="mini"
                                        suffix-icon="el-icon-search"
                                        placeholder="请选择材料名称"
                                        v-model="tableData[scope.row.index-1].name"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="spec"
                                label="规格型号"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="units"
                                label="单位"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="sums"
                                label="数量"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="price"
                                label="单价"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="amount"
                                label="金额"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="brand"
                                label="品牌"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="remark"
                                label="备注"
                        >
                        </el-table-column>
                    </el-table>
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
				form: {
					name: '',
					linkman: '',
					phone: '',
					tax: '',
					dispatching: '',
					unloading: '',
					waiter: '',
					date: new Date(),
					remark: '',
					files: []
				},
				rules: {
					name: [
						{required: true, trigger: 'blur', message: "项目名称不能为空"}
					],
					linkman: [
						{required: true, trigger: 'blur', message: "联系人不能为空"}
					],
					phone: [
						{required: true, trigger: 'blur', message: "联系方式不能为空"}
					],
					tax: [
						{required: true, trigger: 'blur', message: "税率不能为空"}
					]
				},
				CurrentIndex: 1,
				selectRow: [1],
				table: [],
				tableData: [],
				defaultRow: {
					index: 1,
					name: '',
					date: '',
					spec: '',
					units: '',
					sums: '',
					price: '',
					amount: '',
					brand: '',
					remark: ''
				},
				isScroll: false
			}
		},
		methods: {
			addRow() {

				let row = JSON.parse(JSON.stringify(this.defaultRow));
				row.index = this.CurrentIndex;
				this.tableData.push(row);
				this.table.push(row);
				++this.CurrentIndex;
			},
			deleteRow() {
				this.selectRow.forEach(item => {
					this.table.some((tableItem, index) => {
						if (tableItem.index == item) {
							this.table.splice(index, 1);
							return true;
						}
					});
				});

				this.table.map((item, index) => {
					item.index = index + 1;
				});

				this.CurrentIndex -= this.selectRow.length;
			},
			handleSelectionChange(val) {
				let list = [];

				val.forEach(item => {
					list.push(item.index);
				});

				this.selectRow = list;

			},
			onScroll($e) {
			    let scroll = this.$refs.DataContainer.scrollTop;

			    if (scroll > 0) {
			        this.isScroll = true;
			    }
			    else {
			        this.isScroll = false;
			    }
			},
			//文件上传成功
			handleUploadSuccess(response, file, filelist) {
			    if (response.status == 'success') {
			        this.form.files.push({uid:file.uid,path:response.path});
			    }

			},
			handleFileRemove(file, fileList) {
			    this.form.files.some((item,index) => {
			        if (item.uid == file.uid) {
			            this.form.files.splice(index, 1);
			            return true;
			        }
			    });
			},
			SaveOrder() {
			    this.$progress.start();
			}
		},
		computed: {
			ActionURL: function() {
			    return this.$appConst.FILE_UPLOAD_URL + '?token='+this.$store.state.user.token;
			},
			brand: function() {
			    return [];
			}
		},
		created() {
			this.addRow();
		},
		mounted() {
		    this.$nextTick(() => {
				this.$refs.DataContainer.addEventListener('scroll', this.onScroll);
		    });
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
    .cash-wappler
        width: 100%;
        height: 100%;
        position: relative;
        overflow:hidden;

        .cash-container
            width: 90%;
            height: 100%;
            position: relative;
            //overflow-y: auto;
            overflow:hidden;
            padding: 15px;
            border: 1px solid #ebebeb;
            margin: 0px auto;
            border-radius: 5px;
            box-shadow: 0 1px 1px rgba(26, 26, 26, .3);
            h2
                color: #1a1a1a;
                font-size: 14px;
                margin-bottom: 5px;

            .cash-title
                margin-bottom: 12px;
                border-bottom: 1px solid #ebebeb;
            .operate
                padding-bottom: 15px;
                position: relative;
                transition: all 0.3s;
                z-index: 9999;
            .operate__shadow
                box-shadow: 0px 2px 2px -2px rgba(26, 26, 26, .3);
            .data-container
                overflow-y: auto;
                height: calc(100% - 100px);
                padding-right: 15px;
                .cash-form-container
                    position: relative;
                .atta-container__file
                    position: relative;
                    width: 50%;

                    .file-container
                        padding: 15px;

                .cash-product

                    .cash-table-container
                        padding: 15px;
            .btn-tool
                padding-left: 15px;

</style>