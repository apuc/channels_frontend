export default {
  'OPEN_MODAL_EDIT_MODE': ({getters, commit}, payload) => {
    console.log(payload);
    commit('SET_MODAL', payload);
    commit('TOGGLE_EDIT_MODE');
  },
  'CLOSE_MODAL_EDIT_MODE': ({getters, commit}, payload) => {
    commit('DELETE_MODAL', payload);
    commit('TOGGLE_EDIT_MODE');
  }
};