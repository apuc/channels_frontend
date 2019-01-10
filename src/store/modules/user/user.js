import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = {
  userData: {
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
  imageUploadPercentage: 0,
  userContacts: [],
  userContactsSearch: [],
  userPosition: '',
  searchRequest: '',
  searchResults: {
    users: [],
    currentPage: 1,
    pages: 1,
    isLoading: false,
  },
  friendshipRequests: []
};

export default {
  state,
  getters,
  actions,
  mutations,
};
