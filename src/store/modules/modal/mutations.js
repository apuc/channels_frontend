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
      case 'editProfile':
        state.setEditProfile = true;
        break;
      case 'deleteChannel':
        state.deleteChannelOrGroup = true;
        break;
      case 'deleteGroup':
        state.deleteChannelOrGroup = true;
        break;
    }
  },
  currentModal(state, modalType) {
    state.currentModal = modalType;
  },
  deleteModal(state) {
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
      case 'editProfile':
        state.setEditProfile = false;
        break;
      case 'deleteChannel':
        state.deleteChannelOrGroup = false;
        break;
      case 'deleteGroup':
        state.deleteChannelOrGroup = false;
        break;
    }

    state.setModal = false;
    state.currentModal = '';
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
    state.editMode = !state.editMode;
  },
};
