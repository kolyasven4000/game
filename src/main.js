// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Player from './Player';
import store from './store';
/* eslint-disable no-unused-vars */
const globalComponents = require('./globalCompReg.js');
Vue.config.productionTip = false;
/* eslint-disable no-new */
window.store = store;
window.vm = new Vue({
    el: '#app',
    store,
    components: { Player },
    template: '<Player/>'
});
