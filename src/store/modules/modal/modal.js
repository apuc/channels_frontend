import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  setModal: false,
  setCreateGroup: false,
  setCreateChannel: false,
  setUserProfile: false,
  deleteChannelOrGroup: false,
  editMode: false,
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
