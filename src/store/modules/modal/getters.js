export default {
  modalStatus: state => state.modal.status,
  currentModal: state => state.modal.current,
  setCreateGroup: state => state.setCreateGroup,
  setCreateChannel: state => state.setCreateChannel,
  deleteChannelOrGroup: state => state.deleteChannelOrGroup,
  editMode: state => state.editMode,
  channelUsers: state => state.channelUsers,
  setUserProfile: state => state.setUserProfile,
  setEditProfile: state => state.setEditProfile,
  logout: state => state.logout,
  addChannelsToGroup: state => state.addChannelsToGroup,
};
