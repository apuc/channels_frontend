import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from './views/layouts/MainLayout'
import AuthLayout from './views/layouts/AuthLayout'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main-layout',
      component: MainLayout
    },
    {
      path: '/auth',
      name: 'auth-layout',
      component: AuthLayout
    }
  ]
})
