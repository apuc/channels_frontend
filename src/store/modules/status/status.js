import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  status: 'offline',
  connections: []
};

export default {
  state,
  getters,
  actions,
  mutations
};
