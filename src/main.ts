import axios from 'axios';
import Vue, { DirectiveOptions } from 'vue';

import 'normalize.css';

import '@/styles/index.scss'; // global css

import App from './App.vue';
import router from '@/router';

import '@/permission';
import '@/icons';

import * as filters from '@/filters';
import * as directives from '@/directives';

import plugin from '@/plugin';

// 注册过滤函数
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});
// 注册指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
});

Vue.use(plugin);

Vue.config.productionTip = false;

axios
  .get('config.json')
  .then(res => {
    console.log(res);
    Object.defineProperty(Vue.prototype, '$config', { value: res.data });

    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  })
  .catch(err => {
    console.error(err, '项目初始化失败');
  });
