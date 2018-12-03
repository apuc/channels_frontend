export default {
  'SET_MESSAGES': (state, messages) => state.messages = messages,
  'SET_MESSAGE': (state, message) => state.messages.push(message),
  'PUSH_TYPING_USER': (state, user) => {
    for (let i = 0; i < state.usersTyping.length; i++) {
      if (state.usersTyping[i].id === user.id) return
    }
    state.usersTyping.push(user)
  },
  'SLICE_TYPING_USER': (state, userObj) => state.usersTyping = state.usersTyping.filter(user => user.id !== userObj.id)
};
