export default {
  channels: state => state.channels,
  currentChannelData: state => state.currentChannelData,
  channelData: state => state.channelData,
  channelToEdit: state => id => state.channels.find(channel => channel.id === id),
  channelToDelete: state => state.channelToDelete,
  isChannelsLoading: state => state.isChannelsLoading,
  isChannelUsersLoading: state => state.isChannelUsersLoading,
  imageUploadPersentage: state => state.imageUploadPersentage,
  channelUsers: state => state.channelUsers,
  contactsToAdd: state => state.contactsToAdd.users,
  contactsToAddSearch: state => state.contactsToAdd.searchUsers,
  currentChannelUsers: state => state.currentChannelUsers.users,
  currentChannelSearchUsers: state => state.currentChannelUsers.searchUsers
};
