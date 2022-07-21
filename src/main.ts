import Vue from 'vue';

import 'normalize.css';

import '@/styles/index.scss'; // global css

import App from './App.vue';

import '@/icons';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
