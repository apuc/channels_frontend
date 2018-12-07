import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  info: {
    avatar: undefined,
    email: '',
    user_id: null,
    username: '',
  },
  currentUserInfo: {
    avatar: undefined,
    email: '',
    user_id: '',
    username: '',
  },
  isUserLoading: false,
  imageUploadPersentage: 0,
  userContacts: [
    {

    }
  ],
  userPosition: '',
};

export default {
  state,
  getters,
  actions,
  mutations,
};
