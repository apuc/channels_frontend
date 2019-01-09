import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  groups: [],
  currentGroupData: {
    id: '',
    channels: [],
    channelsToSearch: [],
    title: '',
    slug: '',
    status: '',
    owner_id: '',
    avatar: undefined,
  },
  groupData: {
    id: undefined,
    title: '',
    slug: '',
    status: '',
    user_ids: [],
    owner_id: '',
    avatar: undefined,
  },
  addingChannelsData: {
    id: '',
    availableChannels: [],
    channelsToSearch: [],
    channelsToAdd: [],
  },
  groupToDelete: '',
  channelToDelete: '',
  isGroupsLoading: false,
  imageUploadPersentage: 0,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
