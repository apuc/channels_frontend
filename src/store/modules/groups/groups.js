import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  groups: [],
  currentGroupData: {
    group_id: '',
    channels: [],
    channelsToSearch: [],
    title: '',
    slug: '',
    status: '',
    owner_id: '',
    avatar: undefined,
  },
  groupData: {
    group_id: undefined,
    title: '',
    slug: '',
    status: '',
    user_ids: [],
    owner_id: '',
    avatar: undefined,
  },
  addingChannelsData: {
    group_id: '',
    avalaibleChannels: [],
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
