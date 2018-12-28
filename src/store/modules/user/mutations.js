export default {
  'SET_USER_INFO': (state, info) => {
    state.info = info;
  },
  'SET_CURRENT_USER_DATA': (state, data) => {
    state.currentUserInfo = data;
  },
  'SET_USER_AVATAR_ID': (state, avatar_id) => {
    state.info.avatar = avatar_id;
  },
  'SET_USER_DATA_LOADING_FLAG': state => {
    state.isUserLoading = !state.isUserLoading;
  },
  'SET_AVATAR_UPLOAD_PROGRESS': (state, percentage) => {
    state.imageUploadPersentage = percentage;
  },
  /**
   * User position at site (channel/group/user profile)
   * @param position {String}
   */
  'SET_USER_POSITION': (state, position) => {
    state.userPosition = position;
  },
  'SET_SEARCH_RESULTS_USERS': (state, results) => {
    state.searchResults.users = results;
  },
  'SET_SEARCH_RESULTS_PAGES': (state, results) => {
    state.searchResults.pages = results.last_page;
  },
  'SET_SEARCH_RESULTS_CURRENT_PAGE': (state, results) => {
    state.searchResults.currentPage = results.current_page;
  },
  'SET_USER_CONTACTS': (state, contacts) => {
    state.userContacts = contacts;
  },
  'SET_USER_FRIENDSHIP_REQUESTS': (state, requests) => {
    state.friendshipRequests = requests;
  },
  'REMOVE_USER_REQUEST_FROM_STORE': (state, user_id) => {
    const requests = state.friendshipRequests;
    for (let i = 0; i < requests.length; i++) {
      if (requests[i] === user_id) {
        requests.splice(i, 1);
      }
    }
  },
  'ADD_USER_TO_CONTACTS': (state, user) => {
    state.userContacts.push(user);
  },
  'SET_DEFAULT_USER_STATE': state => {
    state.info = {
      avatar: undefined,
      email: '',
      user_id: null,
      username: '',
    };
    state.currentUserInfo = {
      avatar: undefined,
      email: '',
      user_id: '',
      username: '',
    };
    state.isUserLoading = false;
    state.imageUploadPersentage = 0;
    state.searchResults = {
      users: [],
      pages: 0,
    };
  },
};
