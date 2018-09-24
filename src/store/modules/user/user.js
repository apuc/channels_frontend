import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  userProfile: false,
  userProfileInfo: {
    name: '',
    avatar: '',
    slug: '',
    id: null
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
