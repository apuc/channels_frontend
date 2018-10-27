import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  groups: [],
  groupInfo: {
    title: '',
    slug: '',
    status: '',
    user_ids: [],
    type: '',
    private: '',
    avatar: '',
  },
  groupId: '',
  users: [],
};

export default {
  state,
  getters,
  actions,
  mutations
};
