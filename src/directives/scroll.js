import Vue from 'vue'

export const scroll = {
    inserted(el) {
        Vue.nextTick(() => {
            el.scrollTo(0, el.scrollHeight);
        })
    },
    update(el) {
        Vue.nextTick(() => {
            el.scrollTo(0, el.scrollHeight);
        })
    }
};
