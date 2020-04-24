<template>
  <form @submit.prevent="login">
    <div class="form-group"
         v-for="(field, index) in data"
         :key="index"
    >
      <label :for="field.name" v-html="field.label"></label>
      <input
        :type="field.type"
        class="form-control"
        :class="field.class"
        :id="field.name"
        :value="field.value"
        @input="validate($event, index)"
      >
      
      <span :class="!field.isActive || field.isValid ? 'hidden' : 'invalid'">{{field.errorMessage}}</span>
    </div>

    <p v-if="isWrongData" class="wrong-data">Неверная пара логин пароль</p>

    <div class="form-check" v-if="false">
      <input id="alien-computer" class="form-check-input" type="checkbox" v-model="isSession">
      <label for="alien-computer">Чужой компьютер?</label>
    </div>

    <div class="d-flex justify-content-between">
      <button type="submit" class="btn btn-primary flex-fill mr-3">Войти</button>

      <router-link to="registration" class="btn btn-warning">Регистрация</router-link>
    </div>
  </form>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from "vuex";
import authGettingData from "../../mixins/authGettingData";
import {connectSocket} from "../../services/socket/socket.service";

export default {
  name: "Login",
  mixins: [authGettingData],
  data() {
    return {
      data: {
        email: {
          label: 'Email',
          name: 'email',
          type: 'email',
          value: '',
          pattern: new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
          class: '',
          errorMessage: 'Введите корректный email.',
          isActive: false,
          isValid: false,
        },
        password: {
          label: 'Пароль',
          name: 'password',
          type: 'password',
          value: '',
          pattern: new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])(?=.{5,})'),
          pattern: new RegExp('.'),
          class: '',
          errorMessage: 'Введите корректный пароль.',
          isActive: false,
          isValid: false,
        },
      },
      isSession: false
    };
  },
  computed: {
    ...mapGetters({
      isWrongData: "auth/isWrongData"
    })
  },
  methods: {
    ...mapActions('auth', ['GET_TOKEN']),
    ...mapActions('user', ['GET_USER_ME', 'GET_NAV', 'GET_USER_CONTACTS', 'GET_USER_FRIENDSHIP_REQUESTS']),
    ...mapMutations({
      GETTING_TOKEN_AND_DATA: 'auth/GETTING_TOKEN_AND_DATA',
    }),

    /**
     * Валидация
     */
    validate(e, index) {
      const value = e.target.value;
      this.data[index].value = value;
      this.data[index].isActive = true;

      this.data[index].isValid = this.data[index].pattern.test(value);

      if (!this.data[index].isValid) {
        this.data[index].class = 'invalid';
      }else{
        this.data[index].class = '';
      }
    },

    /**
     * Авторизация
     * @returns {Promise<void>}
     */
    async login() {
      if (this.data.password.isValid && this.data.email.isValid) {
        localStorage.setItem('isSession', this.isSession.toString());

        if (!this.gettingTokenAndData) {
          this.GETTING_TOKEN_AND_DATA();

          await this.GET_TOKEN({
            grant_type: 'password',
            client_id: process.env.VUE_APP_CLIENT_ID,
            client_secret: process.env.VUE_APP_CLIENT_SECRET,
            username: this.data.email.value,
            password: this.data.password.value
          })
            .then(async data => {

              if (data.body.message) {
                this.$swal({
                  toast: true,
                  position: 'top',
                  showConfirmButton: false,
                  timer: 4000,
                  type: 'error',
                  title: 'Произошла ошибка авторизации',
                  text: data.body.message,
                });
              }

              if (!this.isWrongData) {
                await this.GET_USER_ME()
                  .then(async (res) => {
                    await this.GET_NAV();

                    this.GET_USER_CONTACTS();
                    this.GET_USER_FRIENDSHIP_REQUESTS();
                    
                    await connectSocket(this.token, res.user_id)
                      .then(() => {
                        console.log('Socket connected from login!');
                      });

                    this.$router.push('/');

                    this.$swal({
                      toast: true,
                      position: 'top',
                      showConfirmButton: false,
                      timer: 4000,
                      type: 'success',
                      title: 'Вы успешно авторизовались'
                    });
                  })
              }

            });
        }
      } else {
        for (let key in this.data) {
          if (!this.data[key].isValid) {
            this.data[key].isActive = true;
            this.data[key].class = 'invalid';
          }
        }
      }
    },
    
    switchBetweenLoginAndReg() {
      this.$emit("switch", "Registration");
    }
  }
};
</script>

<style scoped>
.form-group {
  position: relative;
  z-index: 1;

  padding-bottom: 10px;
}

.valid {
  border-color: rgba(0, 178, 86, 0.3) !important;
  box-shadow: 0 0 0.2rem rgba(0, 178, 86, 0.6) !important;
}

.invalid {
  border-color: rgba(255, 0, 0, 0.3) !important;
  box-shadow: 0 0 0.2rem rgba(255, 0, 0, 0.6) !important;
}

span.invalid {
  position: absolute;
  bottom: -5px;
  right: 5px;
  z-index: 1;

  padding: 2px 5px;
  padding-bottom: 3px;

  font-size: 10px;
  line-height: 1;
  color: white;

  background-color: rgba(255, 0, 0, 0.6);
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}

.hidden {
  display: none;
}

.wrong-data {
  color: red;
}
</style>