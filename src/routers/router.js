import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
import AuthLogin from '../components/Auth/AuthLogin';
import AuthRegistration from '../components/Auth/AuthRegistration';
import Group from '../components/Group/Group';
import Chat from '../components/Chat/Chat';
import ChatBlank from '../components/Chat/ChatBlank';
import NotFoundComponent from '../views/NotFoundComponent';
import UserProfile from '../components/UserProfile';
import Contacts from '../components/Contacts/Contacts';
import ContactsList from '../components/Contacts/ContactsList';
import ContactsSearchUsers from '../components/Contacts/ContactsSearchUsers';
import ContactsFriendshipRequests from '../components/Contacts/ContactsFriendshipRequests';
import {ioGetUserStatus} from "../services/socket/status.service";

Vue.use(Router);
const pathnameArray = location.pathname.split('/');
const slug = pathnameArray[pathnameArray.length - 1];

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
      name: 'chatBlank',
      component: ChatBlank,
      meta: {
        requiresAuth: true,
        layout: 'main'
      },
    },
    {
      path: '/contacts',
      component: Contacts,
      children: [
        {
          path: '',
          component: ContactsList,
          name: 'contacts',
          meta: {
            requiresAuth: true,
            layout: 'main'
          },
        },
        {
          path: 'search',
          component: ContactsSearchUsers,
          name: 'contactsSearchUsers',
          meta: {
            requiresAuth: true,
            layout: 'main'
          },
        },
        {
          path: 'requests',
          component: ContactsFriendshipRequests,
          name: 'ContactsFriendshipRequests',
          meta: {
            requiresAuth: true,
            layout: 'main'
          },
        }
      ],
      beforeEnter: (to, from, next) => {
        store.commit('user/SET_USER_POSITION', 'contacts');
        next();
      }
    },
    {
      path: '/not-found',
      name: 'not_found',
      component: NotFoundComponent,
      beforeEnter: (to, from, next) => {
        store.commit('user/SET_USER_POSITION', 'not-found');
        next();
      }
    },
    {
      path: '/group/:id',
      name: 'group',
      component: Group,
      meta: {
        layout: 'main'
      },
      beforeEnter: (to, from, next) => {
        store.commit('user/SET_USER_POSITION', 'group');
        next();
      }
    },
    {
      path: '/user/:user_id',
      name: 'user_profile',
      component: UserProfile,
      meta: {
        layout: 'main'
      },
      beforeEnter: (to, from, next) => {
        store.commit('user/SET_USER_POSITION', 'user');
        next();
      }
    },
    {
      path: '/:id',
      name: 'chat',
      component: Chat,
      meta: {
        layout: 'main'
      },
      beforeEnter: (to, from, next) => {
        store.commit('user/SET_USER_POSITION', 'channel');
        next();
      }
    },
  ],
});