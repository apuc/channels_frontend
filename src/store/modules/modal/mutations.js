export default {
  setModal(state, payload) {
    state.setModal = true;

    switch (payload) {
      case 'group':
        state.setCreateGroup = true;
        break;
      case 'channel':
        state.setCreateChannel = true;
        break;
      case 'userProfile':
        state.setUserProfile = true;
        break;
      case 'deleteChannel':
        state.setDeleteChannel = true;
        break;
      case 'deleteGroup':
        state.setDeleteGroup = true;
        break;
    }
  },
  currentModal(state, modalType) {
    state.currentModal = modalType;
  },
  deleteModal(state) {
    state.currentModal = '';

    switch (state.currentModal) {
      case 'group':
        state.setCreateGroup = false;
        break;
      case 'channel':
        state.setCreateChannel = false;
        break;
      case 'userProfile':
        state.setUserProfile = false;
        break;
      case 'deleteChannel':
        state.setDeleteChannel = false;
        break;
      case 'deleteGroup':
        state.setDeleteGroup = false;
        break;
    }
  },
  // set current user info to modal
  setCurrentUserInfo(state, payload) {
    state.userProfileInfo = payload;
  },
  // delete current user info to modal
  deleteCurrentUserInfo(state, payload) {
    state.userProfileInfo = payload;
  },
  toggleEditMode(state) {
    state.editMode = !state.editMode
  },
};
