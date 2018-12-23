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
    user_id: null,
    username: '',
  },
  isUserLoading: false,
  imageUploadPersentage: 0,
  userContacts: [
    {
      user_id: null,
      email: '',
      username: '',
      avatar: undefined
    }
  ],
  userPosition: '',
  searchResults: [
    {
      user_id: null,
      email: '',
      username: '',
      avatar: undefined
    }
  ],
  friendshipRequests: [
    {
      user_id: null,
      email: '',
      username: '',
      avatar: undefined
    }
  ]
};

export default {
  state,
  getters,
  actions,
  mutations,
};
