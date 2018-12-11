import Vue from 'vue';
import VueRouter from 'vue-router';
import { allRoutes } from './routes';
import verify from './verify';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: allRoutes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  NProgress.start(to, from, next);
  verify(to, from, next);
});
router.afterEach(transition => {
  NProgress.done();
});

export default router;
