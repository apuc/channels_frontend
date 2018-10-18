import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  setModal: false,
  setCreateGroup: false,
  setCreateChannel: false,
  setUserProfile: false,
  userProfileInfo: {
    name: '',
    avatar: '',
    slug: '',
    id: null
  },
  editMode: false
};

export default {
  state,
  getters,
  actions,
  mutations
};
