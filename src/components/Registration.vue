<template>
  <main>
    <div class="container">
      <div class="row">
        <form @submit.prevent="registration" class="col-lg-6 col-12 offset-3 pt-lg-3">

          <div class="form-group" v-for="(field, index) in data">
            <label :for="field.name">{{field.label}}</label>
            <input :type="field.type"
                   class="form-control"
                   :class="field.class"
                   :id="field.name"
                   :value="field.value"
                   @input="test($event, index)"
            />
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
        data: {
          username: {
            label: 'Логин',
            name: 'username',
            type: 'text',
            value: '',
            pattern: new RegExp('^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$'),
            class: '',
            isActive: false,
            isValid: false,
          },
          email: {
            label: 'Email',
            name: 'email',
            type: 'email',
            value: '',
            pattern: new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
            class: '',
            isActive: false,
            isValid: false,
          },
          password: {
            label: 'Пароль',
            name: 'password',
            type: 'password',
            value: '',
            pattern: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'),
            class: '',
            isActive: false,
            isValid: false,
          },
          repeatPassword: {
            label: 'Повторите пароль',
            name: 'repeat-password',
            type: 'password',
            value: '',
            pattern: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'),
            class: '',
            isActive: false,
            isValid: false,
          },
      },
      }
    },
    computed: {
      // isPassValid() {
      //   if (this.passActive && this.passValid) {
      //     return 'valid'
      //   } else if (this.passActive && !this.passValid) {
      //     return 'invalid'
      //   }
      //   return ''
      // },
      // isPassRepeatValid() {
      //   if (this.repeatPassActive && this.repeatPassValid) {
      //     return 'valid'
      //   } else if (this.repeatPassActive && !this.repeatPassValid) {
      //     return 'invalid'
      //   }
      //   return ''
      // },
      // isNameValid() {
      //   if (this.nameActive && this.nameValid) {
      //     return 'valid'
      //   } else if (this.nameActive && !this.nameValid) {
      //     return 'invalid'
      //   }
      //   return ''
      // },
      // isEmailValid() {
      //   if (this.emailActive && this.emailValid) {
      //     return 'valid'
      //   } else if (this.emailActive && !this.emailValid) {
      //     return 'invalid'
      //   }
      //   return ''
      // }
    },
    methods: {
      ...mapActions({
        userRegistration: 'auth/REGISTRATION',
      }),
      test(e, index) {
        const value = e.target.value;
        this.data[index].value = value;
        this.data[index].isActive = true;
        this.data[index].class = 'invalid';

        if (this.data[index].name === 'repeat-password') {
          this.data[index].isValid = this.data[index].pattern.test(value) && value === this.data.repeatPassword.value;
        } else {
          this.data[index].isValid = this.data[index].pattern.test(value);
        }

        if (this.data[index].isValid) {
          this.data[index].class = 'valid';
        } else {
          this.data[index].class = 'invalid';
        }
      },
      registration() {
        this.userRegistration({
          username: this.data.username.value,
          password: this.data.password.value,
          email: this.data.email.value,
          password_confirmation: this.data.repeatPassword.value
        });
      },
    },
  }
</script>

<style scoped>
  .valid {
    border-color: rgba(0, 178, 86, 0.3) !important;
    box-shadow: 0 0 0.2rem rgba(0, 178, 86, 0.6) !important;
  }

  .invalid {
    border-color: rgba(255, 0, 0, 0.3) !important;
    box-shadow: 0 0 0.2rem rgba(255, 0, 0, 0.6) !important;
  }
</style>