import Vue from 'vue';
import Router from 'vue-router';
import Printer from './views/Printer';
import { USER_ROLES } from '@/api/constants';

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
        canAccess: ['root', 'clientadmin']
      },
      name: 'Labels',
      component: () => import(/* webpackChunkName: "about" */ './views/Labels.vue'),
    },
    {
      path: '/clients',
      meta: {
        requiresAuth: true,
        canAccess: ['root']
      },
      name: 'Clients',
      component: () => import(/* webpackChunkName: "users" */ './views/Clients.vue'),
    },
    {
      path: '/authorizations',
      meta: {
        requiresAuth: true,
        canAccess: ['root']
      },
      name: 'Authorizations',
      component: () => import(/* webpackChunkName: "auth" */ './views/Authorizations.vue'),
    },
    // {
    //   path: '/dashboard',
    //   meta: {
    //     requiresAuth: true,
    //     isAdmin: true
    //   },
    //   name: 'Dashboard',
    //   component: () => import(/* webpackChunkName: "auth" */ './views/Dashboard.vue'),
    // },
    {
      path: '/progress',
      meta: { public: true },
      name: 'Progress',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Progress.vue'),
    },
    {
      path: '*',
      redirect: '/Login'
    }
  ],
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('USER'));
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const role = user.role.type;
    if (to.name === 'Labels' && (role === USER_ROLES.ADMINISTRATOR || role === USER_ROLES.CLIENT_ADMIN)) {
      next();
    }

    if (to.name === 'Clients' && role !== USER_ROLES.ADMINISTRATOR) {
      next({ name: 'Printer' });
    }

    if (to.name === 'Printer' && role !== USER_ROLES.AUTHENTICATED) {
      next({ name: 'Labels' });
    }

    next();
  } else {
    next();
  }
});

export default router;
