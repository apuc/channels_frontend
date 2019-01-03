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
    owner_id: '',
    type: '',
    private: '',
    avatar: undefined,
  currentChannelUsers: [],
  searchUsers: [],
  },
  channelData: {
    channel_id: undefined,
    title: '',
    slug: '',
    status: '',
    user_ids: [],
    owner_id: '',
    type: '',
    private: '',
    avatar: undefined,
  },
  contactsToAdd: [],
  channelUsers: [],
  channelToDelete: '',
  isChannelsLoading: false,
  isChannelUsersLoading: true,
  imageUploadPersentage: 0,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
