import Vue from 'vue';
import Vuex from 'vuex';
import user from './vuex/index.js';

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
  	user
  }
})