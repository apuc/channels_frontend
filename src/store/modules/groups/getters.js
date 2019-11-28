export default {
  groups: state => state.groups,
  currentGroupData: state => state.currentGroupData,
  groupData: state => state.groupData,
  groupToDelete: state => state.groupToDelete,
  addingChannelsData: state => state.addingChannelsData,
  channelsToAdd: state => state.addingChannelsData.channels,
  isGroupsLoading: state => state.isGroupsLoading,
  imageUploadPercentage: state => state.imageUploadPercentage,
  channelToDelete: state => state.channelToDelete,
  groupToEdit: state => id => state.groups.find(group => group.id === id),
  groupChannelsIds: state => id => {
    const group = state.groups.find(group => group.id == id);
    return group.channels.map(channel => channel.id);
  }
};
