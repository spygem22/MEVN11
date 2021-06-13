import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';


Vue.use(VueRouter)

const routes = [
  {
    path: '/home', 
    name: 'Home',
    component: Home,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/dashboard', 
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import ('../views/dashboardlink/User.vue')
  },
  {
    path: '/editUser',
    name: 'edit',
    component: () => import ('../views/dashboardlink/editUser.vue')
  },
  {
    path: '/lll',
    name: 'lll',
    component: () => import ('../views/dashboardlink/lll.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

  router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/home');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/dashboard');
    } else {
      next();
    }
  } else {
    next()
  }
});

export default router
