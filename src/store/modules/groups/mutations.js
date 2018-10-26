export default {
  'USER_GROUPS': (state, groups) => {
    state.groups = groups;
  },
  'SET_NEW_GROUP_DATA': (state, data) => {
    state.newGroupData = data;
  },
  'SET_GROUP_AVATAR_ID': (state, avatar_id) => {
    state.newGroupData.avatar = avatar_id;
  },
  'ADD_GROUP': (state, newGroup) => {
    state.groups.push(newGroup);
  }
};
