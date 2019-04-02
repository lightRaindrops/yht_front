webpackJsonp([20],{"2TW8":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"cash-wallpaper"},[e("div",{staticClass:"cash-wallpaper_main"},[e("div",{staticClass:"action-tool"}),a._v(" "),e("div",{staticClass:"offer-bill"},[a._m(0),a._v(" "),e("div",{staticClass:"offer-bill_content"},[e("div",{staticClass:"offer-bill_page",style:{transform:"translateY("+a.translateY+"px)"}},[e("div",{staticClass:"section"},[e("div",{staticClass:"section_title"},[a._v("基础信息")]),a._v(" "),e("hr"),a._v(" "),e("div",{staticClass:"base-data"},[e("el-form",{ref:"baseDataForm",staticStyle:{width:"50%"},attrs:{model:a.baseData,rules:a.rules.baseDataForm,"label-width":"100px"}},[e("el-form-item",{attrs:{label:"客户名称",prop:"customer"}},[e("el-input",{model:{value:a.baseData.customer,callback:function(t){a.$set(a.baseData,"customer",t)},expression:"baseData.customer"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"项目名称",prop:"project"}},[e("el-input",{model:{value:a.baseData.project,callback:function(t){a.$set(a.baseData,"project",t)},expression:"baseData.project"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"施工范围",prop:"buildRange"}},[e("el-select",{staticStyle:{width:"100%"},model:{value:a.baseData.buildRange,callback:function(t){a.$set(a.baseData,"buildRange",t)},expression:"baseData.buildRange"}},a._l(a.FIELD.F_BUILD_RANGE,function(a,t){return e("el-option",{key:t,attrs:{label:a.label,value:a.value}})}),1)],1),a._v(" "),e("el-form-item",{attrs:{label:"业务员",prop:"saleman"}},[e("el-select",{staticStyle:{width:"100%"},model:{value:a.baseData.saleman,callback:function(t){a.$set(a.baseData,"saleman",t)},expression:"baseData.saleman"}},a._l(a.SaleMans,function(a,t){return e("el-option",{key:t,attrs:{value:a.value,label:a.label}})}),1)],1),a._v(" "),e("div",{staticStyle:{display:"flex"}},[e("el-form-item",{staticStyle:{flex:"1"},attrs:{label:"联系人",prop:"contact"}},[e("el-input",{model:{value:a.baseData.contact,callback:function(t){a.$set(a.baseData,"contact",t)},expression:"baseData.contact"}})],1),a._v(" "),e("el-form-item",{staticStyle:{flex:"1"},attrs:{label:"联系方式"}},[e("el-input",{model:{value:a.baseData.information,callback:function(t){a.$set(a.baseData,"information",t)},expression:"baseData.information"}})],1)],1),a._v(" "),e("el-form-item",{attrs:{label:"开票税率"}},[e("el-input",{model:{value:a.baseData.tax,callback:function(t){a.$set(a.baseData,"tax",t)},expression:"baseData.tax"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"配送"}},[e("el-input",{model:{value:a.baseData.dispatch,callback:function(t){a.$set(a.baseData,"dispatch",t)},expression:"baseData.dispatch"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"装卸"}},[e("el-input",{model:{value:a.baseData.unload,callback:function(t){a.$set(a.baseData,"unload",t)},expression:"baseData.unload"}})],1)],1),a._v(" "),e("div",{staticClass:"attachment"},[e("div",{staticClass:"upload-container"},[e("el-upload",{attrs:{drag:"",action:"https://jsonplaceholder.typicode.com/posts/",multiple:""}},[e("i",{staticClass:"el-icon-upload"}),a._v(" "),e("div",{staticClass:"el-upload__text"},[a._v("将文件拖到此处，或"),e("em",[a._v("点击上传")])]),a._v(" "),e("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[a._v("只能上传20MB以内的附件")])])],1)])],1)]),a._v(" "),e("div",{staticClass:"section"},[e("div",{staticClass:"section_title"},[a._v("产品信息")]),a._v(" "),e("hr"),a._v(" "),e("div",{staticClass:"materiel-data"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:a.productList,"row-class-name":a.tableRowClassName}},[e("el-table-column",{attrs:{prop:"id",label:"序号"}}),a._v(" "),e("el-table-column",{attrs:{prop:"materiel",label:"物料名称"}}),a._v(" "),e("el-table-column",{attrs:{prop:"spec",label:"规格型号"}}),a._v(" "),e("el-table-column",{attrs:{prop:"units",label:"销售单位"}}),a._v(" "),e("el-table-column",{attrs:{prop:"unitprice",label:"单价"}}),a._v(" "),e("el-table-column",{attrs:{prop:"amount",label:"金额"}}),a._v(" "),e("el-table-column",{attrs:{prop:"brind",label:"品牌"}}),a._v(" "),e("el-table-column",{attrs:{prop:"description",label:"备注"}})],1)],1)])])])])]),a._v(" "),e("div",{staticClass:"page-tool"},[e("div",{staticClass:"change-list"},a._l(a.navList,function(t,l){return e("p",{key:l},[e("el-button",{attrs:{type:t.index==a.currentPage?"success":"info"},nativeOn:{click:function(e){return a.PageChange(t.index)}}},[a._v(a._s(t.label))])],1)}),0)])])},staticRenderFns:[function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticClass:"offer-bill_header"},[t("h3",[this._v("报价清单")])])}]};var s=e("VU/8")({data:function(){return{baseData:{customer:"",project:"",buildRange:"",saleman:"",contact:"",information:"",tax:"",dispatch:"",unload:""},rules:{baseDataForm:{customer:[{required:!0,message:"请输入客户名称",trigger:"blur"}],project:[{required:!0,message:"请输入项目名称",trigger:"blur"}],buildRange:[{required:!0,message:"请选择施工范围",trigger:"blur"}],saleman:[{required:!0,message:"请选择业务员",trigger:"blur"}],contact:[{required:!0,message:"联系人不能为空",trigger:"blur"}]}},productList:[],currentPage:0,navList:[{index:0,label:"基础信息"},{index:1,label:"产品信息"}],translateY:0}},created:function(){this.$store.dispatch("getBindAttrFromPath",{path:this.$route.path})},methods:{PageChange:function(a){this.currentPage=a,this.translateY=450*a*-1},tableRowClassName:function(a){a.row;var t=a.rowIndex;return 1===t?"warning-row":3===t?"success-row":""}},computed:{FIELD:function(){return this.$store.state.user.FIELDS},SaleMans:function(){return[{label:"张三",value:1}]}}},l,!1,function(a){e("xfOt")},"data-v-7e930aed",null);t.default=s.exports},xfOt:function(a,t){}});