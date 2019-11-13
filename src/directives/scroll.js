import Vue from 'vue'
import store from '../store/modules/messages/messages'

export const scroll = {
  
    inserted(el) {
        Vue.nextTick(() => {
            el.scrollTo(0, el.scrollHeight);
        })
    },
  
    update(el,binding) {
        Vue.nextTick(() => {
          if( (binding.value && binding.value.bottom) || store.state.messages.length == 20){
            el.scrollTo(0, el.scrollHeight);
          }
        })
    }
};
