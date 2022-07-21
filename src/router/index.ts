import Vue from 'vue';
import { cloneDeep } from 'lodash';
import VueRouter, { RouteConfig } from 'vue-router';

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: Error) => err);
};

Vue.use(VueRouter);

const routers: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  }
];

// 必须使用路由懒加载
export const constantRoutes: Array<RouteConfig> = routers;

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: Array<RouteConfig> = [];

const createRouter = () =>
  new VueRouter({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: routers
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
