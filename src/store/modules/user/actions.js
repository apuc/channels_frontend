export default {
  setUserModal: ({ commit }) => commit('setUserModal'), // open user profile modal
  deleteUserModal: ({ commit }) => commit('setUserModal'), // close user profile modal
  setCurrentUserInfo: (context, payload) => context.commit('setCurrentUserInfo', payload),
};
