import * as utils from '@/utils';

const plugin = {
  install: async(Vue: any, options: any) => {
    Object.defineProperty(Vue.prototype, '$utils', { value: utils });
  }
};

export default plugin;
