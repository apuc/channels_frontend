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
    status: 'active',
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
  channelToDelete: {},
  isGroupsLoading: false,
  imageUploadPercentage: 0,

  groupInfoIsOpened: false,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
