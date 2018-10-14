export default {
  setModal(state, payload) {
    state.setModal = true;

    if (payload === 'group') {
      state.setCreateGroup = true;
    }
    if (payload === 'channel') {
      state.setCreateChannel = true;
    }
    if (payload === 'userProfile') {
      state.setUserProfile = true;
    }
  },
  deleteModal(state) {
    state.setModal = false;
    state.setCreateGroup = false;
    state.setCreateChannel = false;
    state.setUserProfile = false;
  },
  // set current user info to modal
  setCurrentUserInfo(state, payload) {
    state.userProfileInfo = payload;
  },
  // delete current user info to modal
  deleteCurrentUserInfo(state, payload) {
    state.userProfileInfo = payload;
  }
};
