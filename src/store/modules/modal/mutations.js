export default {
  setModal(state, payload) {
    state.setModal = true;

    if (payload === 'group') {
      state.setCreateGroup = true;
    }
    if (payload === 'userProfile') {
      state.setUserProfile = true;
    }
  },
  deleteModal(state) {
    state.setModal = false;
    state.setCreateGroup = false;
    state.setUserProfile = false;
  },
};
