import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';

Vue.use(Router);

export default new Router({
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
      path: '/',
      name: 'Home',
      meta: { requiresAuth: true },
      component: Home,
    },
    {
      path: '/about',
      meta: { requiresAuth: true },
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/users',
      meta: { requiresAuth: true },
      name: 'Users',
      component: () => import(/* webpackChunkName: "users" */ './views/Users.vue'),
    },
  ],
});
