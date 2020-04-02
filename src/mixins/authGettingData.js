import store from "../store/store";
import router from "../routers/router";
import {ioGetUserStatus} from '../services/socket/status.service';

export default {
  methods: {
    /**
     * Получает нужные данные при переходе по ссылке
     */
    $_authGettingData_gettingData() {
      const pathnameArray = location.pathname.split('/');
      const slug = pathnameArray[pathnameArray.length - 1];

      if (pathnameArray[1] === 'contacts' || pathnameArray[1] === 'bots') {
        const isAuthenticated = store.getters['auth/isAuthenticated'];
        if (!isAuthenticated) {
          router.push('/login');
        }
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

    /**
     * Каналы
     * @param pathnameArray
     * @param slug
     * @returns {Promise<void>}
     */
    async $_authGettingData_getChannelData(pathnameArray, slug) {
      store.commit('user/SET_USER_POSITION', 'channel');
      
      let notChannels = ['login','registration','password','user'];
      
      if (notChannels.indexOf(pathnameArray[1]) === -1) {
        store.dispatch('channels/SET_CURRENT_CHANNEL_DATA', slug).then(res =>{
          
            let privat = store.getters['channels/currentChannelData'].private;
            let userInChannel = store.getters['channels/userInCurrentChannel'](store.getters['user/userData'].user_id)
          
            if(privat == 1 && !userInChannel){
               router.push('/not-found');
            }
        });
      }
    },

    /**
     * Пользователи
     * @param slug
     * @returns {Promise<void>}
     */
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

    /**
     * Группы
     * @param slug
     * @returns {Promise<void>}
     */
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