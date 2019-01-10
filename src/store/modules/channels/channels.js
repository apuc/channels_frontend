import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  channels: [],
  currentChannelData: {
    id: '',
    title: '',
    slug: '',
    status: '',
    count: '',
    owner_id: '',
    type: '',
    private: '',
    avatar: undefined,
  },
  channelData: {
    id: undefined,
    title: '',
    slug: '',
    status: '',
    user_ids: [],
    owner_id: '',
    type: '',
    private: '',
    avatar: undefined,
  },
  currentChannelUsers: {
    users: [],
    searchUsers: [],
  },
  contactsToAdd: {
    users: [],
    searchUsers: [],
    channelId: null
  },
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