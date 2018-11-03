<template>
  <main>
    <div class="container">
      <div class="row">
        <form @submit.prevent="registration" class="col-lg-6 col-12 offset-3 pt-lg-3">

          <div class="form-group">
            <label for="login">Логин</label>
            <input type="text" class="form-control" id="login" v-model="username" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input type="password" class="form-control" id="password" v-model="password" />
          </div>
          <div class="form-group">
            <label for="repeat-password">Повторите пароль</label>
            <input type="password" class="form-control" id="repeat-password" v-model="password_confirmation" />
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary flex-fill mr-3">Зарегистрироваться</button>
            <router-link class="btn btn-warning" to="login">Вход</router-link>
          </div>

        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "Registration",
    data() {
      return {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    },
    computed: {},
    methods: {
      ...mapActions({
        userRegistration: 'auth/REGISTRATION',
      }),
      registration() {
          const {username, password , password_confirmation, email} = this;
          this.userRegistration({
              username,
              password,
              email,
              password_confirmation
          });
      }
    },
  }
</script>

<style scoped>

</style>