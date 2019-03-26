<template>
    <div class="cash-wallpaper">
        <div class="cash-wallpaper_main">
            <div class="action-tool">
                <!--<el-button type="success" size="medium">保存报价</el-button>-->

            </div>
            <div class="offer-bill">
                <div class="offer-bill_header">
                    <h3>报价清单</h3>
                </div>
                <div class="offer-bill_content">
                    <div class="offer-bill_page" :style="{transform: 'translateY('+translateY+'px)'}">
                        <div class="section">
                            <div class="section_title">基础信息</div>
                            <hr>
                            <div class="base-data">
                                <el-form :model="baseData" :rules="rules.baseDataForm" ref="baseDataForm" label-width="100px" style="width:50%">
                                    <el-form-item label="客户名称" prop="customer">
                                        <el-input v-model="baseData.customer"></el-input>
                                    </el-form-item>
                                    <el-form-item label="项目名称" prop="project">
                                        <el-input v-model="baseData.project"></el-input>
                                    </el-form-item>
                                    <el-form-item label="施工范围" prop="buildRange">
                                        <el-select v-model="baseData.buildRange" style="width: 100%">
                                            <el-option v-for="(item, k) in FIELD.F_BUILD_RANGE" :label="item.label" :value="item.value" :key="k" ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="业务员" prop="saleman">
                                        <el-select v-model="baseData.saleman" style="width: 100%">
                                            <el-option v-for="(item, k) in SaleMans" :value="item.value" :label="item.label" :key="k"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <div style="display: flex">
                                        <el-form-item label="联系人" prop="contact" style="flex:1">
                                            <el-input v-model="baseData.contact"></el-input>
                                        </el-form-item>
                                        <el-form-item label="联系方式" style="flex:1">
                                            <el-input v-model="baseData.information"></el-input>
                                        </el-form-item>
                                    </div>
                                    <el-form-item label="开票税率">
                                        <el-input v-model="baseData.tax"></el-input>
                                    </el-form-item>
                                    <el-form-item label="配送">
                                        <el-input v-model="baseData.dispatch"></el-input>
                                    </el-form-item>
                                    <el-form-item label="装卸">
                                        <el-input v-model="baseData.unload"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div class="attachment">
                                    <div class="upload-container">
                                        <el-upload
                                            drag
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            multiple>
                                            <i class="el-icon-upload"></i>
                                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                            <div class="el-upload__tip" slot="tip">只能上传20MB以内的附件</div>
                                        </el-upload>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section">
                            <div class="section_title">产品信息</div>
                            <hr>
                            <div class="materiel-data">
                                <el-table
                                    :data="productList"
                                    style="width:100%"
                                    :row-class-name="tableRowClassName"
                                >
                                    <el-table-column prop="id" label="序号"></el-table-column>
                                    <el-table-column prop="materiel" label="物料名称"></el-table-column>
                                    <el-table-column prop="spec" label="规格型号"></el-table-column>
                                    <el-table-column prop="units" label="销售单位"></el-table-column>
                                    <el-table-column prop="unitprice" label="单价"></el-table-column>
                                    <el-table-column prop="amount" label="金额"></el-table-column>
                                    <el-table-column prop="brind" label="品牌"></el-table-column>
                                    <el-table-column prop="description" label="备注"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-tool">
            <div class="change-list">
                <p v-for="(item,k) in navList" :key="k">
                    <el-button :type="item.index == currentPage ? 'success' : 'info' " @click.native="PageChange(item.index)">{{item.label}}</el-button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                baseData: {
                    customer: "",
                    project: "",
                    buildRange: "",
                    saleman: "",
                    contact: "",
                    information: "",
                    tax: "",
                    dispatch: "",
                    unload: ""
                },
                rules: {
                    baseDataForm: {
                        customer: [
                            { required: true, message: '请输入客户名称', trigger: 'blur' },
                        ],
                        project: [
                            { required: true, message: '请输入项目名称', trigger: 'blur' },
                        ],
                        buildRange: [
                            { required: true, message: '请选择施工范围', trigger: 'blur' },
                        ],
                        saleman: [
                            { required: true, message: '请选择业务员', trigger: 'blur' },
                        ],
                        contact:[
                            { required: true, message: '联系人不能为空', trigger: 'blur' },
                        ],

                    }
                },
                productList: [

                ],
                currentPage: 0,
                navList: [
                    {index: 0, label: "基础信息"},
                    {index: 1, label: "产品信息"},
                ],
                translateY: 0,
            }
        },
        created() {
            this.$store.dispatch('getBindAttrFromPath', {path:this.$route.path});
        },
        methods: {
            /**page up or page down**/
            PageChange(index) {
                this.currentPage = index;
                this.translateY = index * 450 * -1;
            },
            /**table row classname**/
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            }
        },
        computed: {
            FIELD: function() {
                // this.CreateForm.tid = this.$store.state.user.FIELDS.F_CMK_PROATTR[0].value;
                // this.CreateForm.tag = this.$store.state.user.FIELDS.F_CMK_CUSTAG[0].value;
                //console.log(this.$store.state.user.FIELDS)
                return  this.$store.state.user.FIELDS;
            },
            SaleMans: function() {
                return [{label: "张三",value: 1}];
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cash-wallpaper
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    .cash-wallpaper_main
        width: 95%;
        height: 100%;
        flex: 1;
        .action-tool
            display: flex;
            //justify-content: flex-end;
            margin-bottom: 10px;
        .offer-bill
            height: 100%;
            .offer-bill_header
                background: #009efb;
                border: 1px solid #009efb;
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
                h3
                    font-size: 18px;
                    color: #fff;
                    font-weight: 400;
                    padding: 12px 20px;
            .offer-bill_content
                padding: 20px;
                border: 1px solid #ebebeb;
                border-bottom-left-radius: 3px;
                border-bottom-right-radius: 3px;
                position: relative;
                width: 100%;
                height: calc(100% - 60px);
                overflow: hidden;
                .offer-bill_page
                    transition: all 0.5s;
                    .section
                        .section_title
                            font-size: 18px;
                        hr
                            border: 0;
                            border-top: 1px solid rgba(0,0,0,.1);
                            margin-top: 10px;
                            margin-bottom: 10px;
                        .base-data
                            display: flex;
                            .attachment
                                flex: 1;
                                margin-left: 30px;
                                padding: 8px;
                                //border-left: 1px solid #ebebeb;
                                .upload-container
                                    text-align: center;
    .page-tool
        width: 100px;
        position: relative;
        .change-list
            width: 100%;
            position: absolute;
            bottom: 80px;
            p
                text-align: center;
</style>
