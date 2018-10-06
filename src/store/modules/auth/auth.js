import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  token: localStorage.getItem('access_token') || '',
  status: '',
  user: {},
  userGroups: [],
  userChannels: [],
};

export default {
  state,
  getters,
  actions,
  mutations
};
