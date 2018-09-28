export default {
  // activate modal
  setModal(state) {
    state.isModalOpened = true
  },
  // disable modal
  deleteModal(state) {
    state.isModalOpened = false
  },
};
