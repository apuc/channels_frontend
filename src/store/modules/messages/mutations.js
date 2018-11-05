export default {
    SET_MESSAGES: (state, messages) => {
        state.messages = messages
    },
    SET_MESSAGE: (state, message) => {
        state.messages = [...state.messages, message]
    }
};
