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

const token = store.getters["auth/token"];
if (token) {
  Vue.http.headers.common['Authorization'] = `Bearer ${token}`;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { // если в роутинге в поле meta указано requiresAuth в true
    if (store.getters["auth/isAuthenticated"]) { // Проверяем авторизован ли пользователь
      console.log('authenticated');
      next();
    } else { // Если не авторизован - редиректим на логин
      next({path: '/login'});
    }
  } else { // если в роутинге в поле meta указано requiresAuth в false или не указан
    if (store.getters["auth/isAuthenticated"]) { // Если пользователь залогинен
      if (to.matched.some(record => record.path === '/login' || record.path === '/registration')) { // Но хочет войти на страницу регистрации или логина
        next({path: '/'});
        return
      }
    }
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
