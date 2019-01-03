export default {
  channels: state => state.channels,
  currentChannelData: state => state.currentChannelData,
  channelData: state => state.channelData,
  channelToEdit: state => id => state.channels.find(channel => channel.channel_id === id),
  currentChannelUsers: state => state.currentChannelUsers,
  channelToDelete: state => state.channelToDelete,
  isChannelsLoading: state => state.isChannelsLoading,
  isChannelUsersLoading: state => state.isChannelUsersLoading,
  imageUploadPersentage: state => state.imageUploadPersentage,
  channelUsers: state => state.channelUsers,
  contactsToAdd: state => state.currentChannelData.contactsToAdd,
  channelSearchUsers: state => state.currentChannelData.searchUsers,
};
