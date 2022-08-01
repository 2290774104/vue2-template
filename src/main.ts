import Vue, { DirectiveOptions } from 'vue';

import 'normalize.css';

import '@/styles/index.scss'; // global css

import App from './App.vue';
import router from '@/router';

import '@/permission';
import '@/icons';

import * as filters from '@/filters';
import * as directives from '@/directives';

// 注册过滤函数
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});
// 注册指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
