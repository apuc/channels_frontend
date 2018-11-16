import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  channels: [],
  currentChannelData: {
    channel_id: '',
    title: '',
    slug: '',
    status: '',
    user_count: '',
    type: '',
    private: '',
    avatar: undefined,
  },
  channelData: {
    channel_id: '',
    title: '',
    slug: '',
    status: '',
    user_ids: [],
    type: '',
    private: '',
    avatar: undefined,
  },
  currentChannelUsers: [],
  channelToDelete: '',
  isChannelsLoading: false,
  isChannelUsersLoading: true,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
