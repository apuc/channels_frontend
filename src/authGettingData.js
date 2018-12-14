import store from "./store/store";
import router from "./routers/router";
import {ioGetUserStatus} from './services/socket/status.service';

export default {
  methods: {
    $_authGettingData_gettingData() {
      const pathnameArray = location.pathname.split('/');
      const slug = pathnameArray[pathnameArray.length - 1];

      if (pathnameArray.indexOf('group') !== -1) {
        this.$_authGettingData_getChannelData(slug);
      }
      else if (pathnameArray.indexOf('user') !== -1) {
        this.$_authGettingData_getUserData(slug);
      }
      else if (slug.length > 0 && slug !== 'not-found') {
        this.$_authGettingData_getGroupData(slug);
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
        await store.dispatch('GET_CHANNEL_DATA', slug);
        const currentChannel = store.getters['channels/channels'].find(channel => channel.slug === slug);
        store.dispatch('channels/GET_USERS', currentChannel.channel_id);
        store.dispatch('messages/GET_MESSAGES');
      }
    },
    async $_authGettingData_getUserData(slug) {
      store.commit('user/SET_USER_POSITION', 'user');
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      if (isAuthenticated) {
        const userMe = store.getters['user/info'];
        if (slug === userMe.user_id) {
          store.commit('SET_CURRENT_USER_DATA', userMe)
        } else {
          store.dispatch('user/GET_USER_DATA', slug);
        }
      } else {
        store.dispatch('user/GET_USER_DATA', slug);
      }
      // ioGetUserStatus('USERuser_id);
    },
    async $_authGettingData_getGroupData(slug) {
      const currentGroup = store.getters['groups/groups'].find(channel => channel.slug === slug);
      store.commit('user/SET_USER_POSITION', 'group');

      if (currentGroup) {
        store.commit('groups/SET_CURRENT_GROUP_DATA', currentGroup);
      } else {
        router.push('/not-found');
      }
    },
  }
};
