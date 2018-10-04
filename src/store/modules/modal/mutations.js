export default {
  setModal (state, payload) {
    state.setModal= true;
    if (payload === 'group') {
      state.setCreateGroup = true;
    }
    if (payload === 'userProfile') {
      state.setUserProfile = true;
    }
  },
  deleteModal (state, payload) {
    state.setModal= false;
    if (payload === 'group') {
      state.setCreateGroup = false;
    }
    if (payload === 'userProfile') {
      state.setUserProfile = false;
    }
  },
};
