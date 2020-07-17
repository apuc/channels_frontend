export default {
  channels: state => state.channels,
  allChannels: state => state.allChannels,
  currentChannelData: state => state.currentChannelData,
  channelData: state => state.channelData,
  channelToDelete: state => state.channelToDelete,
  isChannelsLoading: state => state.isChannelsLoading,
  isChannelUsersLoading: state => state.isChannelUsersLoading,
  imageUploadPercentage: state => state.imageUploadPercentage,
  channelUsers: state => state.channelUsers,
  channelIntegrations: state => state.channelIntegrations,
  channelBots: state => state.channelBots,
  channelMeetings: state => state.channelMeetings,
  contactsToAdd: state => state.contactsToAdd,
  contactsToAddUsers: state => state.contactsToAdd.users,
  contactsToAddSearch: state => state.contactsToAdd.searchUsers,
  contactsToAddChannelId: state => state.contactsToAdd.channelId,
  currentChannelUsers: state => state.currentChannelUsers.users,
  currentChannelSearchUsers: state => state.currentChannelUsers.searchUsers,
  userInCurrentChannel: state => id => {
    return state.currentChannelUsers.users.find(user => user.user_id === id);
  },
  channelInfoIsOpened: state => state.channelInfoIsOpened,
};
