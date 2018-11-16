export default {
  'SET_MODAL': (state, payload) => {
    state.modal.status = true;

    switch (payload) {
      case 'group':
        state.setCreateGroup = true;
        state.modal.current = payload;
        break;
      case 'channel':
        state.setCreateChannel = {status: true, dialog: false};
        state.modal.current = payload;
        break;
      case 'dialog':
        state.setCreateChannel = {status: true, dialog: true};
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
      case 'logout':
        state.logout = true;
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
        state.setCreateChannel = {status: false, dialog: false};
        break;
      case 'dialog':
        state.setCreateChannel = {status: false, dialog: false};
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
      case 'logout':
        state.logout = false;
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
  'SET_DEFAULT_MODAL_STATE': (state, data) => {
    state.modal = {
      status: false,
      current: '',
    };
    state.setCreateGroup = false;
    state.setCreateChannel = {
      status: false,
      isDialog: false
    };
    state.setUserProfile = false;
    state.setEditProfile = false;
    state.deleteChannelOrGroup = false;
    state.editMode = false;
    state.channelUsers = false;
    state.logout = false;
    state.addChannelsToGroup = false;
  }
};
