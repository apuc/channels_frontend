import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  token: localStorage.getItem('access_token') || '',
  status: '',
  gettingTokenAndData: false,
  refreshTokenBody: {
    grant_type: 'refresh_token',
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET,
    refresh_token: localStorage.getItem('refresh_token') || '',
  },
  isWrongData: false,
};

export default {
  state,
  getters,
  actions,
  mutations
};
