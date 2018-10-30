export default {
  'USER_GROUPS': (state, groups) => {
    state.groups = groups;
  },
  'SET_GROUP_DATA': (state, data) => {
    state.groupInfo = data;
  },
  'SET_GROUP_AVATAR_ID': (state, avatar_id) => {
    state.groupInfo.avatar = avatar_id;
  },
  'SET_GROUP_ID': (state, id) => {
    state.groupId = id;
  }
};
