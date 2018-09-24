import {MLanguage} from "vue-multilanguage";

export default new MLanguage('en').create({
    Chat: {
        btnSend: 'Send',
        textareaPlaceholder: 'Enter message...'
    },
    Nav: {
        users: 'Users',
        channels: 'Channels',
        groups: 'Groups'
    }
})