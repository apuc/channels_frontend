import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  info: {
    avatar: {
      average:'',
      origin:'',
      small:'',
    },
    email: '',
    user_id: null,
    username: '',
  },
  refreshTokenBody: {
    grant_type: 'refresh_token',
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET,
    refresh_token: localStorage.getItem('refresh_token'),
  },
  currentUserInfo: {
    avatar: undefined,
    email: '',
    user_id: '',
    username: '',
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
