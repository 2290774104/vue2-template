import Vue from 'vue';
import SvgIcon from 'vue-svgicon';
import '@/icons/components';

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
});
