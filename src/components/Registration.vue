<template>
  <main>
    <div class="container">
      <div class="row">
        <form class="col-lg-6 col-12 offset-3 pt-lg-3">

          <div class="form-group">
            <label for="login">Логин</label>
            <input type="text" class="form-control" id="login" v-model="login" />
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
            <input type="password" class="form-control" id="repeat-password" v-model="repeatPassword" />
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary flex-fill mr-3">Зарегистрироваться</button>
            <router-link class="btn btn-warning" to="login">Вход</router-link>
          </div>

        </form>
      </div>
    </div>
  </main>
</template>

<script>

  export default {
    name: "Registration",
    data() {
      return {
        login: '',
        email: '',
        password: '',
        repeatPassword: '',
      }
    },
    computed: {},
    methods: {

    },
  }
</script>

<style scoped>

</style>