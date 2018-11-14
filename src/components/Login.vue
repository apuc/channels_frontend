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
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      ...mapGetters({
        authStatus: 'auth/gettingTokenAndData',
      })
    },
    methods: {
      ...mapMutations({
        gettingTokenData: 'auth/GETTING_TOKEN_AND_DATA',
      }),
      ...mapActions({
        getToken: 'auth/GET_TOKEN',
        getUser: 'user/GET_USER',
        getNav: 'user/GET_NAV',
      }),
      async login() {
        const {username, password} = this;
        if (!this.gettingTokenAndData) {
          this.gettingTokenData();
          console.log('getting token');
          await this.getToken({
            grant_type: 'password',
            client_id: process.env.VUE_APP_CLIENT_ID,
            client_secret: process.env.VUE_APP_CLIENT_SECRET,
            username,
            password
          })
            .then(
              async () => {
                await this.getUser()
                  .then(
                    async () => {
                      this.$router.push('/');
                      await this.getNav();
                    })
              });

          this.$router.push('/');

          this.gettingTokenData();
        }
      }
    }
  }
</script>

<style scoped>

</style>