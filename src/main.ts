import Vue from 'vue';
import App from './App.vue';
import 'normalize.css';
import SvgIcon from 'vue-svgicon';
import '@/icons/components';

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
