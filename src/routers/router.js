import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
import AuthLogin from '../components/Auth/AuthLogin';
import AuthRegistration from '../components/Auth/AuthRegistration';
import Group from '../components/group/Group';
import Chat from '../components/chat/Chat';
import ChatBlank from '../components/chat/ChatBlank';
import NotFoundComponent from '../views/NotFoundComponent';
import UserProfile from '../components/UserProfile';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'auth'},
      component: AuthLogin,
    },
    {
      path: '/registration',
      name: 'registration',
      meta: {layout: 'auth'},
      component: AuthRegistration,
    },
    {
      path: '/',
      component: ChatBlank,
      meta: {
        requiresAuth: true,
        layout: 'main'
      },
    },
    {
      path: '/not-found',
      name: 'not_found',
      component: NotFoundComponent,
    },
    {
      path: '/group/:id',
      component: Group,
      meta: {
        requiresAuth: true,
        layout: 'main'
      },
    },
    {
      path: '/user/:user_id',
      name: 'user_profile',
      component: UserProfile,
      meta: {
        requiresAuth: true,
        layout: 'main'
      },
    },
    {
      path: '/:id',
      component: Chat,
      meta: {
        requiresAuth: true,
        layout: 'main'
      },
    },
  ],
});