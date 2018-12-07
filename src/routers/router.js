import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Group from '../components/group/Group';
import CreateGroup from '../components/ModalWindows/CreateGroup';
import CreateChannel from '../components/ModalWindows/CreateChannel';
import Chat from '../components/chat/Chat';
import Empty from '../components/chat/Empty';
import NotFoundComponent from '../views/NotFoundComponent';
import UserProfile from '../components/UserProfile';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Empty,
      meta: {requiresAuth: true}
    },
    {
      path: '/group',
      redirect: '/',
      meta: {requiresAuth: true}
    },
    {
      path: '/group/:id',
      component: Group,
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'auth'},
      component: Login,
    },
    {
      path: '/registration',
      name: 'registration',
      meta: {layout: 'auth'},
      component: Registration,
    },
    {
      path: '/user/:user_id',
      name: 'user_profile',
      component: UserProfile,
      meta: {requiresAuth: true}
    },
    {
      path: '/:id',
      component: Chat,
      meta: {requiresAuth: true},
    },
    {
      path: '/not-found',
      component: NotFoundComponent,
    },
  ],
});