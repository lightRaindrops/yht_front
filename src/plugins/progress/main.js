import Vue from 'vue';
import Main from './main.vue';

const Constructor = Vue.extend(Main);
const progress = function() {
	var instance;
	var isServer = Vue.prototype.$isServer;
}
progress.init = function () {
	if (this.isServer || this.instance) return;
	this.instance = new Constructor();
	this.instance.$mount();
	document.body.appendChild(this.instance.$el);
}
progress.start = function () {
	this.init();
	this.instance.start();
}
progress.done = function() {
	if (!this.instance || this.isServer) return;
	this.instance.done();
}

export default progress;