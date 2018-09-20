import ru from './russian'
import en from './english'

export const messages = {
    en,
    ru
};

export const getLanguages = function() {
    return Object.keys(messages);
};