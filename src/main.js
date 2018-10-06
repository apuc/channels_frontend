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
import VueResource from 'vue-resource';

Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.use(VueResource);
Vue.use(BootstrapVue);

Vue.component('v-icon', Icon);
Vue.component('main-layout', MainLayout);
Vue.component('auth-layout', AuthLayout);

const token = localStorage.getItem('access_token');
if (token) {
  // console.log('inside main js', token);
  Vue.http.headers.common['Authorization'] = `Bearer ${token}`;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/isAuthenticated"]) {
      next()
    } else {
      next({
        path: '/login',
      });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  http: {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  },
  render: h => h(App)
}).$mount('#app');
