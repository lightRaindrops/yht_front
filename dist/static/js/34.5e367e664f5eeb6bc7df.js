webpackJsonp([34],{L9u0:function(t,e){},"Wwj+":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wapper"},[n("div",{staticClass:"menu-container"},[n("div",{staticClass:"sub-menu"},[n("div",{staticClass:"Submenu-list Card"},[n("ul",t._l(t.ForumModule,function(e,s){return n("li",{key:s,staticClass:"Submenu-item ",class:{"Submenu-active":t.CurrentModuleId==e.id},style:{"animation-delay":s/10+"s"},on:{click:function(n){return t.JumpModule(e.id,e.attr)}}},[n("mu-ripple",[n("div",{staticClass:"Button Submenu-item-link"},[n("span",[t._v(t._s(e.name))])])])],1)}),0)]),t._v(" "),n("div",{staticClass:"Submenu-info Card"},[n("div",{staticClass:"Submenu-content-list"},[n("div",{staticClass:"Submenu-content-item"},[n("div",{staticClass:"label"},[t._v("\n                            发文\n                        ")]),t._v(" "),n("div",{staticClass:"value"},[t._v("\n                            "+t._s(t.NotifyInfo.article)+"\n                        ")])]),t._v(" "),n("div",{staticClass:"Submenu-content-item"},[n("div",{staticClass:"label"},[t._v("\n                            获赞\n                        ")]),t._v(" "),n("div",{staticClass:"value"},[t._v("\n                            "+t._s(t.NotifyInfo.agree)+"\n                        ")])]),t._v(" "),n("div",{staticClass:"Submenu-content-item"},[n("div",{staticClass:"label"},[t._v("\n                            回复\n                        ")]),t._v(" "),n("div",{staticClass:"value"},[t._v("\n                            "+t._s(t.NotifyInfo.answer)+"\n                        ")])])]),t._v(" "),n("p",[n("el-badge",{attrs:{"is-dot":""}},[n("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.MyMessage(e)}}},[t._v("我的动态")])],1)],1),t._v(" "),n("div",{staticClass:"hr"}),t._v(" "),n("div",{staticClass:"Submenu-content-action"},[n("el-menu",{staticClass:"forum-el-menu",attrs:{mode:"horizontal"},on:{select:t.handleSelect}},[n("el-submenu",{attrs:{index:"888"}},[n("template",{slot:"title"},[t._v("我的工作台")]),t._v(" "),t._l(t.ForumMenu,function(e,s){return n("el-menu-item",{key:s,staticClass:"forum-el-menu-item",attrs:{index:e.front_path},on:{click:function(n){return t.changeRoute(e.front_path)}}},[n("i",{staticClass:"iconfont ",class:e.classname}),n("span",[t._v(t._s(e.name))])])})],2)],1)],1)])])]),t._v(" "),n("div",{staticClass:"sub-main"},[n("keep-alive",[t.$route.meta.keepAlive?n("router-view",{key:t.routeKey}):t._e()],1),t._v(" "),t.$route.meta.keepAlive?t._e():n("router-view",{key:t.routeKey})],1)])},staticRenderFns:[]};var i=n("VU/8")({beforeRouteEnter:function(t,e,n){n(function(e){e.CurrentModuleId=t.params.id||0})},data:function(){return{CurrentModuleId:0,CurrentModuleAttr:"public",transitionName:"fade"}},methods:{init:function(){this.$emit("handleChangeNavbar",!1),this.LoadMenu(),this.LoadNotify(),this.$store.dispatch("GetForumModule")},LoadMenu:function(){this.$store.dispatch("ForumMenu").then(function(){})},LoadNotify:function(){this.$store.dispatch("MyArticleNotify")},changeRoute:function(t){this.$router.push(t)},MyMessage:function(){this.$router.push("/app/forum/message")},handleSelect:function(){},JumpModule:function(t,e){var n="";n=t>0?"/app/forum/module/"+t+"/attr/"+e:"/app/forum/portal",this.CurrentModuleId=t,this.CurrentModuleAttr=e,this.$router.push(n)}},created:function(){this.init()},computed:{ForumMenu:function(){return this.$store.state.user.ForumMenu},user:function(){return this.$store.state.user.userInfo},NotifyInfo:function(){return this.$store.state.user.MyArticleNotify},ForumModule:function(){return this.$store.state.user.ForumModule},routeKey:function(){return this.$route.path.replace(/\//g,"_")}}},s,!1,function(t){n("L9u0")},"data-v-5138d4a2",null);e.default=i.exports}});