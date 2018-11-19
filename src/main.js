import Vue from 'vue';
import store from './store.js';
import router from './router/index.js';
import Start from './start.vue';
import 'muse-ui/dist/muse-ui.css';
import 'vant/lib/vant-css/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/animate.css';

import VueAxios from 'vue-axios'
import Element from 'element-ui';
import tool from './util/tool.js';
import MuseUI from 'muse-ui';
import { Tab, Tabs } from 'vant';
import { Button } from 'vant';
import { Actionsheet } from 'vant';
import { Dialog } from 'vant';
import { Field } from 'vant';
import { Popup } from 'vant';
import './assets/styl/base.styl';

// import '../static/UEditor/ueditor.config.js'
// import '../static/UEditor/ueditor.all.js'
// import '../static/UEditor/lang/zh-cn/zh-cn.js'
// import '../static/UEditor/ueditor.parse.min.js'
// import '../'
    // use
   

Vue.use(Popup);
Vue.use(Field);
Vue.use(MuseUI);
Vue.use(Button);
Vue.use(Tab).use(Tabs);
Vue.use(Actionsheet);
Vue.use(Dialog);
Vue.use(Element, {size: 'small'});

Vue.config.productionTip = false;
Vue.prototype.$tool = tool;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Start),
});


