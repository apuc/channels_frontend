import store from "./store/store";
import router from "./routers/router";
import {
  ioGetUserStatus
} from './services/socket/status.service';

export default {
  methods: {
    $_authGettingData_gettingData() {
      const pathnameArray = location.pathname.split('/');
      const slug = pathnameArray[pathnameArray.length - 1];

      if (pathnameArray[1] === 'contacts') {
        router.next();
      } else if (pathnameArray[1] === 'group') {
        this.$_authGettingData_getGroupData(slug);
      } else if (pathnameArray[1] === 'user') {
        this.$_authGettingData_getUserData(slug);
      } else if (slug.length > 0 && slug !== 'not-found') {
        this.$_authGettingData_getChannelData(pathnameArray, slug);
      } else {
        router.push('/login');
      }
    },
    async $_authGettingData_getChannelData(pathnameArray, slug) {
      store.commit('user/SET_USER_POSITION', 'channel');

      if (slug !== 'login' && slug !== 'registration' && pathnameArray[1] !== 'user') {
        await store.dispatch('channels/GET_CHANNEL_DATA', slug);
        const currentChannel = store.getters['channels/currentChannelData'];

        store.dispatch('messages/GET_MESSAGES');
        store.dispatch('channels/GET_CHANNEL_USERS', currentChannel.id).then(async data => {
          store.commit('channels/SET_CURRENT_CHANNEL_USERS', data);
          store.commit('channels/SET_CHANNEL_USER_SEARCH_RESULTS', data);
          if (store.getters['user/userData'].user_id) {
            await store.commit('channels/SET_CONTACTS_FREE_TO_ADD', store.getters['user/userContacts']);
            store.commit('channels/SET_CONTACTS_FREE_TO_ADD_SEARCH', store.getters['channels/contactsToAdd']);
          }
        });
      }
    },
    async $_authGettingData_getUserData(slug) {
      store.commit('user/SET_USER_POSITION', 'user');
      const isAuthenticated = store.getters['auth/isAuthenticated'];
      if (isAuthenticated) {
        const userMe = store.getters['user/userData'];
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
        store.commit('groups/SET_CURRENT_GROUP_CHANNELS_TO_SEARCH', currentGroup.channels);
      } else {
        await store.dispatch('groups/GET_GROUP_DATA', slug).then(data => {
          store.commit('groups/SET_CURRENT_GROUP_DATA', data);
          store.commit('groups/SET_CURRENT_GROUP_CHANNELS_TO_SEARCH', data.channels);
        });
      }
    },
  }
};