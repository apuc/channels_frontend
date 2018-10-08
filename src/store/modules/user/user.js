import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  info: {},
  groups: [],
  channels: [],
};

export default {
  state,
  getters,
  actions,
  mutations
};
