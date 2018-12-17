import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  modal: {
    status: false,
    current: '',
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
