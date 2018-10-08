import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
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
