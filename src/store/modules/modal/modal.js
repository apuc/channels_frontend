import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  setModal: false,
  setCreateGroup: false,
  setCreateChannel: false,
  setUserProfile: false,
  setEditProfile: false,
  deleteChannelOrGroup: false,
  editMode: false,
  channelUsers: false,
  currentModal: '',
  userProfileInfo: {
    name: '',
    avatar: '',
    slug: '',
    id: null
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
