export default {
  groups: state => state.groups,
  currentGroupData: state => state.currentGroupData,
  groupData: state => state.groupData,
  groupToDelete: state => state.groupToDelete,
  groupForAddingChannels: state => state.addingChannelsData.group_id,
  channelsToAdd: state => state.addingChannelsData.channels,
  isGroupsLoading: state => state.isGroupsLoading,
  imageUploadPersentage: state => state.imageUploadPersentage,
  channelToDelete: state => state.channelToDelete,
  groupToEdit: state => id => state.groups.find(group => group.group_id === id),
};
