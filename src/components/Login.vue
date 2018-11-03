<template>
  <main>
    <div class="container">
      <div class="row">
        <form @submit.prevent="login" class="col-lg-6 col-12 offset-3 pt-lg-3">

          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" id="email" v-model="username"/>
          </div>

          <div class="form-group">
            <label for="password">Пароль</label>
            <input type="password" class="form-control" id="password" v-model="password"/>
          </div>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary flex-fill mr-3">Войти</button>
            <router-link class="btn btn-warning" to="registration">Регистрация</router-link>
          </div>

        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      ...mapActions({
        getToken: 'auth/GET_TOKEN',
      }),
      login() {
        const {username, password} = this;
        this.getToken({
          grant_type: 'password',
          client_id: process.env.VUE_APP_CLIENT_ID,
          client_secret: process.env.VUE_APP_CLIENT_SECRET,
          username,
          password
        });
      }
    }
  }
</script>

<style scoped>

</style>