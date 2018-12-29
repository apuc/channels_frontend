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
  userContacts: [],
  userContactsSearch: [],
  userPosition: '',
  searchResults: {
    users: [],
    currentPage: 1,
    pages: 1,
  },
  friendshipRequests: []
};

export default {
  state,
  getters,
  actions,
  mutations,
};
