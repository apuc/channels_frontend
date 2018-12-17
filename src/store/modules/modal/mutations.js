export default {
  'SET_MODAL': (state, payload) => {
    state.modal.status = true;

    state.modal.current = payload;
  },
  'DELETE_MODAL': (state) => {
    state.modal.status = false;
    state.modal.current = '';
  },
  'TOGGLE_EDIT_MODE': (state) => {
    state.editMode = !state.editMode;
  },
  'SET_DEFAULT_MODAL_STATE': state => {
    state.modal = {
      status: false,
      current: '',
    };
  }
};
