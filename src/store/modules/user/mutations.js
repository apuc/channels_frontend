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
  'SET_SEARCH_RESULTS': (state, results) => {
    state.searchResults = results;
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
    state.searchResults = [];
  },
};
