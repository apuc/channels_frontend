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
                   :ref="field.name"
                   :value="field.value"
                   @input="test($event, index)"
            />

            <span :class="!field.isActive || field.isValid ? 'hidden' : 'invalid'">
              {{field.errorMessage}}
            </span>
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
            pattern: new RegExp('^[a-zA-Z][a-zA-Z0-9-_\\. ]{1,20}$'),
            class: '',
            errorMessage: 'Введите логин.',
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
            errorMessage: 'Введите корректный email.',
            isActive: false,
            isValid: false,
          },
          password: {
            label: 'Пароль (пароль должен содержать не менее 8 символов, одна заглавная, одна строчная буквы, цифра и спец. символ)',
            name: 'password',
            type: 'password',
            value: '',
            pattern: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'),
            class: '',
            errorMessage: 'Введите корректный пароль.',
            isActive: false,
            isValid: false,
          },
          repeatPassword: {
            label: 'Повторите пароль',
            name: 'repeatPassword',
            type: 'password',
            value: '',
            pattern: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'),
            class: '',
            errorMessage: 'Пароли должны совпадать.',
            isActive: false,
            isValid: false,
          },
        },

      }
    },
    methods: {
      ...mapActions({
        userRegistration: 'auth/REGISTRATION',
      }),
      test(e, index) {
        const value = e.target.value;
        this.data[index].value = value;
        this.data[index].isActive = true;

        if (this.data[index].name === 'repeatPassword') {
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
        if (this.data.username.isValid && this.data.password.isValid && this.data.email.isValid && this.data.repeatPassword.isValid) {
          this.userRegistration({
            username: this.data.username.value,
            password: this.data.password.value,
            email: this.data.email.value,
            password_confirmation: this.data.repeatPassword.value
          });
        } else {
          for (let key in this.data) {
            if (!this.data[key].isValid) {
              this.data[key].isActive = true;
              this.data[key].class = 'invalid';
            }
          }
        }
      },
    },
  }
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
</style>