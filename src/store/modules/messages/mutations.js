export default {
  'SET_MESSAGES': (state, messages) => state.messages = messages,
  'SET_MESSAGE': (state, message) => state.messages.push(message),
  'PUSH_TYPING_USER': (state, user) => state.usersTyping[user.id] = user.name,
  'SLICE_TYPING_USER': (state, user) => delete state.usersTyping[user.id]
};
