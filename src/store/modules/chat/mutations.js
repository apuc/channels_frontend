export default {
  'SET_MESSAGES': (state, messages) => {
    state.messages = messages;
  },
  'SET_CHAT_DEFAULT_STATE': state => {
    state.messages = [];
    state.user = {};
  }
};
