import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  messages: [],
  usersTyping: []
};

export default {
  state,
  getters,
  actions,
  mutations
};
