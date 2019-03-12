webpackJsonp([20],{"8osN":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wapper"},[a("div",{staticClass:"content-box"},[a("div",{staticClass:"tool"},[a("el-button",{attrs:{type:"success",icon:"el-icon-plus"},nativeOn:{click:function(e){t.showAddDialog=!0}}},[t._v("添加部门")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],staticStyle:{"max-width":"100%"},attrs:{data:t.tableData,"max-height":"350"}},[a("el-table-column",{attrs:{prop:"id",label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"部门名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"负责人"}},[t._v("\n\t\t     >\n\t\t     \t\n\t\t     ")]),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"编辑",placement:"top"}},[a("el-button",{attrs:{size:"mini",icon:"el-icon-edit",type:"success"},on:{click:function(a){t.handleEdit(e.row)}}})],1),t._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"设置成员",placement:"top"}},[a("el-button",{attrs:{size:"mini",icon:"el-icon-setting",type:"warning"},on:{click:function(a){t.handleSet(e.row)}}})],1),t._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"设置管理",placement:"top"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){t.handleSetManager(e.row)}}},[a("i",{staticClass:"iconfont icon-jingli",staticStyle:{"font-size":"12px"}})])],1)]}}])})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:1==t.edit?"修改部门":"添加部门",visible:t.showAddDialog,center:""},on:{"update:visible":function(e){t.showAddDialog=e},close:function(e){t.edit=!1}}},[a("el-form",{ref:"form",staticClass:"el-form",attrs:{"status-icon":"",model:t.form,rules:t.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"部门名称",prop:"name"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name","string"==typeof e?e.trim():e)},expression:"form.name"}})],1),t._v(" "),a("el-form-item",[t.edit?a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.onSubmit("form")}}},[t._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.onSubmit("form")}}},[t._v("立即创建")])],1)],1)],1),t._v(" "),a("el-dialog",{staticClass:"department-dialog",attrs:{title:"设置部门成员",visible:t.showSetStaffDialog,center:""},on:{"update:visible":function(e){t.showSetStaffDialog=e}}},[a("div",{staticClass:"department-dialog-content"},t._l(t.staff,function(e){return a("mu-flex",{key:e.id,staticClass:"select-control-row"},[a("mu-checkbox",{attrs:{value:e.id,label:e.name},model:{value:t.staffCheckbox,callback:function(e){t.staffCheckbox=e},expression:"staffCheckbox"}})],1)})),t._v(" "),a("div",{staticClass:"foot"},[a("el-button",{attrs:{type:"primary"},on:{click:t.saveStaff}},[t._v("保存")])],1)]),t._v(" "),a("el-dialog",{staticClass:"department-dialog",attrs:{title:"设置部门管理者",visible:t.showSetManagerDialog,center:""},on:{"update:visible":function(e){t.showSetManagerDialog=e}}},[a("div",{staticClass:"department-dialog-content"},t._l(t.departmentStaff,function(e){return a("mu-flex",{key:e.id,staticClass:"select-control-row"},[a("mu-radio",{attrs:{value:e.id,label:e.name},model:{value:t.manager,callback:function(e){t.manager=e},expression:"manager"}})],1)})),t._v(" "),a("div",{staticClass:"foot"},[a("el-button",{attrs:{type:"primary"},on:{click:t.saveManger}},[t._v("保存")])],1)])],1)},staticRenderFns:[]};var n=a("VU/8")({data:function(){return{showAddDialog:!1,showSetStaffDialog:!1,showSetManagerDialog:!1,edit:!1,tableLoading:!0,form:{id:"",name:""},rules:{name:[{required:!0,trigger:"blur",message:"名称不能为空"}]},staffCheckbox:[],currentDepartmentId:0,manager:0}},methods:{onSubmit:function(t){var e=this;this.$refs[t].validate(function(t){t&&e.$store.dispatch(e.actionName,e.form).then(function(){"success"==e.result.status?(e.$notify.success({title:"操作成功"}),e.showAddDialog=!1,e.initTable(),e.form.name=""):e.$notify.error({title:"操作失败",message:e.result.error})})})},handleEdit:function(t){this.form.name=t.name,this.form.id=t.id,this.showAddDialog=!0,this.edit=!0},handleSet:function(t){this.currentDepartmentId=t.id,this.showSetStaffDialog=!0,this.initStaff(t.id)},handleSetManager:function(t){this.currentDepartmentId=t.id,this.showSetManagerDialog=!0,this.initStaff(t.id)},saveStaff:function(){var t=this;this.$store.dispatch("departmentSetStaff",{departmentId:this.currentDepartmentId,list:this.staffCheckbox}).then(function(){"success"==t.$store.state.user.departmentSetStaff.status?t.$notify.success({title:"操作成功"}):t.$notify.error({title:"操作失败",message:t.$store.state.user.departmentSetStaff.error}),t.showSetStaffDialog=!1})},saveManger:function(){var t=this;this.$store.dispatch("departmentSetManager",{userId:this.manager,departmentId:this.currentDepartmentId}).then(function(){"success"==t.$store.state.user.departmentSetManager.status?t.$notify.success({title:"操作成功"}):t.notify.error({title:"操作失败",error:t.$store.state.user.departmentSetManager.error}),t.showSetManagerDialog=!1})},initTable:function(){var t=this;this.$store.dispatch("departmentList").then(function(){t.tableLoading=!1})},initStaff:function(t){var e=this;this.$store.dispatch("departmentStaff",{department_id:t}).then(function(){e.staffCheckbox=e.$store.state.user.departmentStaff.checked,e.managerRadio()})},managerRadio:function(){var t=this.$store.state.user.department_list;for(var e in t)t[e].id==this.currentDepartmentId&&(this.manager=t[e].user_id)}},created:function(){this.initTable()},computed:{tableData:function(){return this.$store.state.user.department_list},actionName:function(){return this.edit?"departmentModify":"departmentCreate"},result:function(){return this.edit?this.$store.state.user.departmentModify:this.$store.state.user.departmentCreate},staff:function(){return this.$store.state.user.departmentStaff.data},departmentStaff:function(){var t=this.$store.state.user.departmentStaff.data,e=[];for(var a in t)for(var i in this.staffCheckbox)t[a].id==this.staffCheckbox[i]&&e.push(t[a]);return e}}},i,!1,function(t){a("TLWJ")},"data-v-81405660",null);e.default=n.exports},TLWJ:function(t,e){}});