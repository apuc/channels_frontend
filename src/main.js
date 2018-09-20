import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueI18n from 'vue-i18n'
import {messages} from './translations'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(BootstrapVue);

export const i18n = new VueI18n({
    locale: 'en', // set locale
    messages,
    sync: true
});


new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
