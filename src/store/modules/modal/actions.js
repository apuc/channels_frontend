export default {
  'OPEN_MODAL_EDIT_MODE': ({getters, commit}, payload) => {
    commit('SET_MODAL', payload);
    commit('TOGGLE_EDIT_MODE');
  },
  'CLOSE_MODAL_EDIT_MODE': ({getters, commit}) => {
    commit('DELETE_MODAL');
    commit('TOGGLE_EDIT_MODE');
  },
};