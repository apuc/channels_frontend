export default {
  // activate user profile modal
  setUserModal(state) {
    state.userProfile = true
  },
  // disable user profile modal
  deleteUserModal(state) {
    state.userProfile = false
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
