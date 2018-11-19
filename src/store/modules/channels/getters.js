export default {
  channels: state => state.channels,
  currentChannelData: state => state.currentChannelData,
  channelData: state => state.channelData,
  currentChannelUsers: state => state.currentChannelUsers,
  channelToDelete: state => state.channelToDelete,
  isChannelsLoading: state => state.isChannelsLoading,
  isChannelUsersLoading: state => state.isChannelUsersLoading,
  imageUploadPersentage: state => state.imageUploadPersentage,
};
