import {MLanguage} from "vue-multilanguage";

export default new MLanguage('ru').create({
    Chat: {
        btnSend: 'Отправить',
        textareaPlaceholder: 'Введите сообщение...'
    },
    Nav: {
        users: 'Пользователи',
        channels: 'Каналы',
        groups: 'Группы'
    }
})