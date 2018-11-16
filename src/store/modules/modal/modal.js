import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  modal: {
    status: false,
    current: '',
  },
  setCreateGroup: false,
  setCreateChannel: {
    status: false,
    isDialog: false
  },
  setUserProfile: false,
  setEditProfile: false,
  deleteChannelOrGroup: false,
  editMode: false,
  channelUsers: false,
  logout: false,
  addChannelsToGroup: false,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
