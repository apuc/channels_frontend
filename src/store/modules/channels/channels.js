import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  channels: [],
  newChannelData: {
    title: '',
    slug: '',
    status: '',
    user_ids: [],
    type: '',
    private: '',
    avatar: '',
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
