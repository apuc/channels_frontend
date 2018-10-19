import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  channels: [],
  channelInfo: {
    title: '',
    slug: '',
    status: '',
    user_ids: [],
    type: '',
    private: '',
    avatar: '',
  },
  channelId: '',
  users: [],
};

export default {
  state,
  getters,
  actions,
  mutations
};
