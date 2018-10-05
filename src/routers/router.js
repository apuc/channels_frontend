import Vue from 'vue';
import Router from 'vue-router';
import Links from '../components/Links';
import Login from '../components/Login';
import Registration from '../components/Registration';
import Group from '../components/group/Group';
import Chat from '../components/chat/Chat';
import NotFoundComponent from '../views/NotFoundComponent';
import ProfileModal from '../components/ModalWindows/ProfileModal';

Vue.use(Router);

const isUserInBase = (to, from, next) => {
  // Получить юзера по слагу с базы
  // if (store.getters.isAuthenticated) {
  //   next()
  //   return
  // }
  // next('/login')
};

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Links,
    },
    {
      path: '/group',
      redirect: '/',
    },
    {
      path: '/group/:id',
      component: Group,
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
      name: 'profile_modal',
      component: ProfileModal
    },
    {
      path: '/create-group',
      name: 'create_group',
      component: ProfileModal
    },
    {
      path: '/:id',
      component: Chat,
      // beforeEnter: isUserInBase,
    },
    {
      path: '*',
      component: NotFoundComponent,
    },
  ],
})
