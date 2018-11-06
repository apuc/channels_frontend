import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  modal: {
    status: false,
    current: '',
  },
  setCreateGroup: false,
  setCreateChannel: false,
  setUserProfile: false,
  setEditProfile: false,
  deleteChannelOrGroup: false,
  editMode: false,
  channelUsers: false,
  addChannelsToGroup: false,
};

export default {
  state,
  getters,
  actions,
  mutations
};
