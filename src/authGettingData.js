import store from "./store/store";
import router from "./routers/router";
import {ioGetUserStatus} from './services/socket/status.service';

export default {
  methods: {
    $_authGettingData_gettingData() {
      const pathnameArray = location.pathname.split('/');
      const slug = pathnameArray[pathnameArray.length - 1];

      if (pathnameArray.indexOf('group') !== -1) {
        this.$_authGettingData_getGroupData(slug);
      }
      else if (pathnameArray.indexOf('user') !== -1) {
        this.$_authGettingData_getUserData(slug);
      }
      else if (slug.length > 0 && slug !== 'not-found') {
        this.$_authGettingData_getChannelData(slug);
      } else {
        router.push('/login');
      }
    },
    async $_authGettingData_getChannelData(slug) {
      const currentChannel = store.getters['channels/channels'].find(channel => channel.slug === slug);
      store.commit('user/SET_USER_POSITION', 'channel');

      if (currentChannel) {
        store.commit('channels/SET_CURRENT_CHANNEL_DATA', currentChannel);
        store.dispatch('channels/GET_USERS', currentChannel.channel_id);
        store.dispatch('messages/GET_MESSAGES');
      } else {
        if (slug !== 'login' && slug !== 'registration') {
          await store.dispatch('channels/GET_CHANNEL_DATA', slug);
          const currentChannel = store.getters['channels/currentChannelData'];
          if (!currentChannel.private) {
            // store.dispatch('channels/GET_USERS', currentChannel.channel_id);
            // store.dispatch('messages/GET_MESSAGES');
          }
        }
      }
    },
    async $_authGettingData_getUserData(slug) {
      store.commit('user/SET_USER_POSITION', 'user');
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      if (isAuthenticated) {
        const userMe = store.getters['user/info'];
        if (slug === userMe.user_id) {
          store.commit('user/SET_CURRENT_USER_DATA', userMe)
        } else {
          await store.dispatch('user/GET_USER_DATA', slug);
        }
      } else {
        await store.dispatch('user/GET_USER_DATA', slug);
        ioGetUserStatus('user/user_id');
      }
    },
    async $_authGettingData_getGroupData(slug) {
      const currentGroup = store.getters['groups/groups'].find(channel => channel.slug === slug);
      store.commit('user/SET_USER_POSITION', 'group');

      if (currentGroup) {
        store.commit('groups/SET_CURRENT_GROUP_DATA', currentGroup);
      } else {
        await store.dispatch('groups/GET_GROUP_DATA', slug);
      }
    },
  }
};
