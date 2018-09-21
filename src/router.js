import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from './views/layouts/MainLayout';
import GroupLayout from './views/layouts/GroupLayout';
import AuthLayout from './views/layouts/AuthLayout';
import NotFoundComponent from './views/NotFoundComponent';
import Nav from './components/Nav';
import Chat from './components/Chat';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      components: {
        navHome: Nav,
        chat: Chat
      }
    },
    {
      path: '/auth',
      name: 'auth-layout',
      component: AuthLayout
    },
    {
      path: '/:id',
      components: {
        navHome: Nav,
        chat: Chat
      },
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ],
})
