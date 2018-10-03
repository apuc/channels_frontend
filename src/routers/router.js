import Vue from 'vue';
import Router from 'vue-router';
import Links from '../components/Links';
import MainLayout from '../views/layouts/MainLayout';
import AuthLayout from '../views/layouts/AuthLayout';
import Login from '../components/Login';
import Registration from '../components/Registration';
import GroupLayout from '../views/layouts/GroupLayout';
import NotFoundComponent from '../views/NotFoundComponent';
import ProfileModal from '../components/ModalWindows/ProfileModal';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Links,
    },
    {
      path: '/chat',
      component: MainLayout,
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
          {path: '/', redirect: 'login'},
          {path: 'login', component: Login},
          {path: 'registration', component: Registration},
      ]
    },
    {
      path: '/:id',
      component: MainLayout,
    },
    {
      path: '/group/:id',
      component: GroupLayout
    },
    {
      path: '/user/:user_id',
      name: 'profile_modal',
      component: ProfileModal
    },
    {
      path: '/create-group',
      name: 'create_group',
      component: ProfileModal
    },
    {
      path: '*',
      component: NotFoundComponent,
    },
  ],
})
