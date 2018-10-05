import Vue from 'vue';
import Router from 'vue-router';
import Links from '../components/Links';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Group from '../components/group/Group';
import Chat from '../components/chat/Chat';
import NotFoundComponent from '../views/NotFoundComponent';
import ProfileModal from '../components/ModalWindows/ProfileModal';
import store from '../store/store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/');
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next('/login');
};


export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Links,
      // beforeEnter: ifAuthenticated
    },
    {
      path: '/group',
      redirect: '/',
      // beforeEnter: ifAuthenticated
    },
    {
      path: '/group/:id',
      component: Group,
      // beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'auth'},
      component: Login,
      // beforeEnter: ifNotAuthenticated
    },
    {
      path: '/registration',
      name: 'registration',
      meta: {layout: 'auth'},
      component: Registration,
      // beforeEnter: ifNotAuthenticated
    },
    {
      path: '/user/:user_id',
      name: 'profile_modal',
      component: ProfileModal,
      // beforeEnter: ifAuthenticated
    },
    {
      path: '/create-group',
      name: 'create_group',
      component: ProfileModal,
      // beforeEnter: ifAuthenticated
    },
    {
      path: '/:id',
      component: Chat,
      // beforeEnter: ifAuthenticated
    },
    {
      path: '*',
      component: NotFoundComponent,
      // beforeEnter: ifAuthenticated
    },
  ],
})
