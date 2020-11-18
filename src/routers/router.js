import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
const AuthLogin = () => import('../components/Auth/AuthLogin');
const AuthRegistration = () => import('../components/Auth/AuthRegistration');
const AuthPasswordResetRequest = () => import('../components/Auth/AuthPasswordResetRequest');
const AuthPasswordReset = () => import('../components/Auth/AuthPasswordReset');
const Group = () => import('../components/Group/Group');
const ChatLayout = ()  => import('../views/ChatLayout');
const ChatBlank = ()  => import('../components/Chat/ChatBlank');
const NotFoundComponent = () => import('../views/NotFoundComponent');
const UserProfile = () => import('../components/UserProfile');
const Contacts = () => import('../components/Contacts/Contacts');
const ContactsList = () => import('../components/Contacts/ContactsList');
const ContactsSearchUsers = () => import('../components/Contacts/ContactsSearchUsers');
const ContactsFriendshipRequests  = () => import('../components/Contacts/ContactsFriendshipRequests');
const Bots = () => import('../components/Bots/Bots');
const BotsList = () => import('../components/Bots/BotsList');
const BotsCreate = () => import('../components/Bots/BotsCreate');
const BotsEdit = () => import('../components/Bots/BotsEdit');
const EditProfile =()=>import('../components/Modal/ModalProfileEdit')

const Integrations = () => import('../components/Integrations/Integrations');
const IntegrationsList = () => import('../components/Integrations/IntegrationsList');
const IntegrationsCreate = () => import('../components/Integrations/IntegrationsCreate');

import {ioGetUserStatus} from "../services/socket/status.service";

Vue.use(Router);
const pathnameArray = location.pathname.split('/');
const slug = pathnameArray[pathnameArray.length - 1];

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/edit_profile',
      name: 'edit_profile',
      component : EditProfile,
      meta: {layout: 'main'},
    },
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
      path: '/password/request-reset',
      name: 'reset-request',
      meta: {layout: 'auth'},
      component: AuthPasswordResetRequest,
    },
    {
      path: '/password/reset/:token',
      name: 'reset',
      meta: {layout: 'auth'},
      component: AuthPasswordReset,
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
      path: '/bots',
      component: Bots,
      children: [
        {
          path: '',
          component: BotsList,
          name: 'bots',
          meta: {
            requiresAuth: true,
            layout: 'main'
          },
        },
        {
          path: 'create',
          component: BotsCreate,
          name: 'botsCreate',
          meta: {
            requiresAuth: true,
            layout: 'main'
          },
        },
        {
          path: 'edit',
          component: BotsEdit,
          name: 'botsEdit',
          meta: {
            requiresAuth: true,
            layout: 'main'
          },
        }
      ],
      beforeEnter: (to, from, next) => {
        store.commit('user/SET_USER_POSITION', 'bots');
        next();
      }
    },

    {
      path: '/integrations',
      component: Integrations,
      children: [
        {
          path: '',
          component: IntegrationsList,
          name: 'integrations',
          meta: {
            requiresAuth: true,
            layout: 'main'
          },
        },
        {
          path: 'create',
          component: IntegrationsCreate,
          name: 'integrationsCreate',
          meta: {
            requiresAuth: true,
            layout: 'main'
          },
        }
      ],
      beforeEnter: (to, from, next) => {
        store.commit('user/SET_USER_POSITION', 'integrations');
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
      component: ChatLayout,
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