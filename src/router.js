import Vue from 'vue';
import Router from 'vue-router';
import Printer from './views/Printer';
import { roles } from '@/api/constants';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      meta: { public: true },
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/printer',
      name: 'Printer',
      meta: { requiresAuth: true },
      component: Printer,
    },
    {
      path: '/labels',
      meta: {
        requiresAuth: true,
        isAdmin: true
      },
      name: 'Labels',
      component: () => import(/* webpackChunkName: "about" */ './views/Labels.vue'),
    },
    {
      path: '/clients',
      meta: {
        requiresAuth: true,
        isAdmin: true
      },
      name: 'Clients',
      component: () => import(/* webpackChunkName: "users" */ './views/Clients.vue'),
    },
    {
      path: '*',
      redirect: '/Login'
    }
  ],
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('USER'));
  if (to.matched.some(record => record.meta.isAdmin)) {
    if (user.role._id === roles.admin) {
      next();
    } else {
      next({ name: 'Printer' });
    }
  } else {
    next();
  }
});

export default router;
