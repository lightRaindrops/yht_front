webpackJsonp([13],{UisH:function(e,t){},iMDK:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={data:function(){return{loading:!0,addRoleVisible:!1,setRoleVisible:!1,editRoleVisible:!1,form1:{name:"",desc:""},form2:{id:"",name:"",desc:""},form3:{id:"",list:[]},formLabelWidth:"120px",defaultProps:{children:"children",label:"label"},rules1:{name:[{required:!0,message:"请输入角色名",trigger:"blur"}]},rules2:{name:[{required:!0,message:"请输入角色名",trigger:"blur"}]}}},methods:{showDialog:function(){this.addRoleVisible=!0},submitForm1:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.$store.dispatch("addRole",t.form1).then(function(){for(var e in"success"==t.$store.state.user.roleAdd?t.openNotify("操作成功","角色新建成功!","success"):t.openNotify("操作失败","角色新建不成功!","error"),t.form1)t.form1[e]="";t.addRoleVisible=!1})})},handleEditRole:function(e){var t=this;this.$store.dispatch("getRoleTreeSelectNode",e.id).then(function(){t.form3.id=e.id,t.setRoleVisible=!0,setTimeout(function(){for(var e in t.$refs.tree.setCheckedKeys([]),t.treeSelected)t.$refs.tree.setChecked(t.treeSelected[e],!0)},1)})},handleSetRole:function(){var e=this;this.form3.list=this.$refs.tree.getCheckedKeys(),this.$store.dispatch("putRole",this.form3).then(function(){if("success"!=e.$store.state.user.role_put_status.status)return e.openNotify("操作失败",e.$store.state.user.role_put_status.msg,"error"),!1;e.openNotify("操作成功","功能修改成功","success"),e.setRoleVisible=!1})},handleEditUesr:function(e){var t=this;this.$store.dispatch("getRoleOne",e.id).then(function(e){t.form2=t.$store.state.user.role_info,t.editRoleVisible=!0})},submitForm2:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.$store.dispatch("updateRole",t.form2).then(function(){t.openNotify("操作成功","角色修改成功","success"),t.editRoleVisible=!1})})},handleDelete:function(){},closeDialog:function(){this.$store.dispatch("getRoleList")},openNotify:function(e,t,o){this.$notify({title:e,message:t,type:o})}},created:function(){var e=this;this.$store.dispatch("getRoleList").then(function(){e.loading=!1}),this.$store.dispatch("getRoleTree")},computed:{tableData:function(){return this.$store.state.user.role_table_data},treeData:function(){return this.$store.state.user.roleTreeData},treeSelected:function(){return this.$store.state.user.tree_select}}},l={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"role-wapper"},[o("div",{staticClass:"role-wapper"},[o("div",{staticClass:"role-tool"},[o("el-button",{attrs:{type:"success"},nativeOn:{click:function(t){return e.showDialog(t)}}},[e._v("新增角色")])],1),e._v(" "),o("div",{staticClass:"table-wapper"},[o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData}},[o("el-table-column",{attrs:{prop:"id",label:"id",width:"180"}}),e._v(" "),o("el-table-column",{attrs:{prop:"name",label:"角色名称"}}),e._v(" "),o("el-table-column",{attrs:{prop:"desc",label:"描述"}}),e._v(" "),o("el-table-column",{attrs:{prop:"date",label:"添加时间"}}),e._v(" "),o("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"设置功能",placement:"top"}},[o("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(o){return e.handleEditRole(t.row)}}},[o("i",{staticClass:"el-icon-edit-outline"})])],1),e._v(" "),o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"编辑",placement:"top"}},[o("el-button",{attrs:{size:"mini"},on:{click:function(o){return e.handleEditUesr(t.row)}}},[o("i",{staticClass:"el-icon-edit"})])],1),e._v(" "),o("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"删除",placement:"top"}},[o("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(o){return e.handleDelete(t.row)}}},[o("i",{staticClass:"el-icon-delete"})])],1)]}}])})],1)],1)]),e._v(" "),o("el-dialog",{attrs:{title:"新增角色",visible:e.addRoleVisible,center:"",width:"30%"},on:{"update:visible":function(t){e.addRoleVisible=t},close:e.closeDialog}},[o("el-form",{ref:"form1",attrs:{model:e.form1,rules:e.rules1}},[o("el-form-item",{attrs:{label:"角色名称",prop:"name","label-width":e.formLabelWidth}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form1.name,callback:function(t){e.$set(e.form1,"name",t)},expression:"form1.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"描述",prop:"desc","label-width":e.formLabelWidth}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form1.desc,callback:function(t){e.$set(e.form1,"desc",t)},expression:"form1.desc"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.submitForm1("form1")}}},[e._v("确 定")]),e._v(" "),o("el-button",{on:{click:function(t){e.addRoleVisible=!1}}},[e._v("取 消")])],1)],1),e._v(" "),o("el-dialog",{attrs:{title:"设置功能",visible:e.setRoleVisible,center:"",width:"30%"},on:{"update:visible":function(t){e.setRoleVisible=t},close:e.closeDialog}},[o("el-tree",{ref:"tree",attrs:{data:e.treeData,"show-checkbox":"","default-expand-all":"","node-key":"id","highlight-current":""}}),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:e.handleSetRole}},[e._v("确 定")]),e._v(" "),o("el-button",{on:{click:function(t){e.setRoleVisible=!1}}},[e._v("取 消")])],1)],1),e._v(" "),o("el-dialog",{attrs:{title:"编辑角色",visible:e.editRoleVisible,center:"",width:"30%"},on:{"update:visible":function(t){e.editRoleVisible=t},close:e.closeDialog}},[o("el-form",{ref:"form2",attrs:{model:e.form2,rules:e.rules2}},[o("el-form-item",{attrs:{label:"角色名称",prop:"name","label-width":e.formLabelWidth}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form2.name,callback:function(t){e.$set(e.form2,"name",t)},expression:"form2.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"描述",prop:"desc","label-width":e.formLabelWidth}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form2.desc,callback:function(t){e.$set(e.form2,"desc",t)},expression:"form2.desc"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.submitForm2("form2")}}},[e._v("确 定")]),e._v(" "),o("el-button",{on:{click:function(t){e.editRoleVisible=!1}}},[e._v("取 消")])],1)],1)],1)},staticRenderFns:[]};var s=o("VU/8")(i,l,!1,function(e){o("UisH")},"data-v-c3b4b5ac",null);t.default=s.exports}});