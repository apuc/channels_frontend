import store from "./store/store";
import router from "./routers/router";

export default {
  methods: {
    gettingData() {
      console.log(321);
      const pathnameArray = location.pathname.split('/');
      const slug = pathnameArray[pathnameArray.length - 1];

      if (pathnameArray.indexOf('group') !== -1) {
        const currentGroup = store.getters['groups/groups'].find(channel => channel.slug === slug);
        store.commit('user/SET_USER_POSITION', 'group');

        if (currentGroup) {
          store.commit('groups/SET_CURRENT_GROUP_DATA', currentGroup);
        } else {
          router.push('/not-found');
        }
      }
      else if (pathnameArray.indexOf('user') !== -1) {
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
      }
      else if (slug.length > 0 && slug !== 'not-found') {
        const currentChannel = store.getters['channels/channels'].find(channel => channel.slug === slug);
        store.commit('user/SET_USER_POSITION', 'channel');

        if (currentChannel) {
          store.commit('channels/SET_CURRENT_CHANNEL_DATA', currentChannel);
          store.dispatch('channels/GET_USERS', currentChannel.channel_id);
          store.dispatch('messages/GET_MESSAGES');
        } else {
          router.push('/not-found');
        }
      } else {
        router.push('/login');
      }
    }
  }
};
