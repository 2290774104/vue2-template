import Vue from 'vue';
import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Route, NavigationGuardNext } from 'vue-router';

NProgress.configure({ showSpinner: false });

const whiteList: string[] = [];

router.beforeEach(
  async(to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
    NProgress.start();
    if (to.meta && Object.prototype.hasOwnProperty.call(to.meta, 'title')) {
      document.title = to.meta.title;
    }
    if (whiteList.includes(to.path)) {
      next();
    }
    next();
  }
);

router.afterEach(() => {
  NProgress.done();
});
