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
};

export default {
  state,
  getters,
  actions,
  mutations
};
