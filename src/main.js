import Vue from 'vue';
import App from './App.vue';
import router from './routers/router';
import store from './store/store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './translations';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import MainLayout from './views/layouts/MainLayout';
import AuthLayout from './views/layouts/AuthLayout';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

Vue.component('v-icon', Icon);
Vue.component('main-layout', MainLayout);
Vue.component('auth-layout', AuthLayout);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
