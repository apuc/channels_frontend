export default {
  'SET_MODAL': (state, payload) => {
    state.modal.status= true;

    switch (payload) {
      case 'group':
        state.setCreateGroup = true;
        state.modal.current = payload;
        break;
      case 'channel':
        state.setCreateChannel = true;
        state.modal.current = payload;
        break;
      case 'userProfile':
        state.setUserProfile = true;
        state.modal.current = payload;
        break;
      case 'editProfile':
        state.setEditProfile = true;
        state.modal.current = payload;
        break;
      case 'deleteChannel':
        state.deleteChannelOrGroup = true;
        state.modal.current = payload;
        break;
      case 'deleteGroup':
        state.deleteChannelOrGroup = true;
        state.modal.current = payload;
        break;
      case 'channelUsers':
        state.channelUsers = true;
        state.modal.current = payload;
        break;
      case 'addChannelsToGroup':
        state.addChannelsToGroup = true;
        state.modal.current = payload;
        break;
      default:
        break;
    }
  },
  'DELETE_MODAL': (state) => {
    switch (state.modal.current) {
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
      case 'channelUsers':
        state.channelUsers = false;
        break;
      case 'addChannelsToGroup':
        state.addChannelsToGroup = false;
        break;
      default:
        break;
    }

    state.modal.status = false;
    state.modal.current = '';
  },
  'TOGGLE_EDIT_MODE': (state) => {
    state.editMode = !state.editMode;
  },
};
