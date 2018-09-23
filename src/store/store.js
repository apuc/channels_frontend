import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: false,
    userProfileInfo: {
      name: '',
      avatar: '',
      slug: '',
      id: null
    }
  },
  getters: {
    userProfile: state => state.userProfile,
    userProfileInfo: state => {
      console.log('get', state.userProfileInfo);
      return state.userProfileInfo
    }
  },
  mutations: {
    setUserModal(state) {
      state.userProfile = true
    },
    deleteUserModal(state) {
      state.userProfile = false
    },
    setCurrentUserInfo(state, payload) {
      console.log(payload.user);
      state.userProfileInfo = payload.user;
      console.log('set', state.userProfileInfo);
    },
    deleteCurrentUserInfo(state) {
      state.userProfileInfo = {
        name: '',
        avatar: '',
        slug: '',
        id: null
      }
    }
  },
  actions: {
    setUserModal: ({ commit }) => commit('setUserModal'),
    deleteUserModal: ({ commit }) => commit('setUserModal'),
  }
})
