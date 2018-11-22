<template>
  <main>
    <div class="container">
      <div class="row">
        <form @submit.prevent="registration" class="col-lg-6 col-12 offset-3 pt-lg-3">

          <div class="form-group" v-for="(field, index) in data">
            <label :for="field.name">{{field.label}}</label>
            <input :type="field.type"
                   class="form-control"
                   :id="field.name"
                   :value="field.value"
                   @input="test($event, index)"
            />
          </div>

          <!--<div class="form-group">-->
            <!--<label for="login">Логин</label>-->
            <!--<input type="text"-->
                   <!--class="form-control"-->
                   <!--:class="isNameValid"-->
                   <!--id="login"-->
                   <!--:value="username"-->
                   <!--@input="nameTest"-->
            <!--/>-->
          <!--</div>-->

          <!--<div class="form-group">-->
            <!--<label for="email">Email</label>-->
            <!--<input type="email"-->
                   <!--class="form-control"-->
                   <!--:class="isEmailValid"-->
                   <!--id="email"-->
                   <!--:value="email"-->
                   <!--@input="emailTest"-->
            <!--/>-->
          <!--</div>-->

          <!--<div class="form-group">-->
            <!--<label for="password">Пароль</label>-->
            <!--<input type="password"-->
                   <!--class="form-control"-->
                   <!--:class="isPassValid"-->
                   <!--id="password"-->
                   <!--:value="password"-->
                   <!--@input="passwordTest"-->
            <!--/>-->
          <!--</div>-->

          <div class="form-group">
            <label for="repeat-password">Повторите пароль</label>
            <input type="password"
                   class="form-control"
                   :class="isPassRepeatValid"
                   id="repeat-password"
                   :value="password_confirmation"
                   @input="repeatPasswordTest"
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
        data: [
          {
            label: 'Логин',
            name: 'username',
            type: 'text',
            value: '',
            pattern: new RegExp('^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$'),
            isActive: false,
            isValid: false,
          },
          {
            label: 'Email',
            name: 'email',
            type: 'email',
            value: '',
            pattern: new RegExp('^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$'),
            isActive: false,
            isValid: false,
          },
          {
            label: 'Пароль',
            name: 'password',
            type: 'password',
            value: '',
            pattern: new RegExp('^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$'),
            isActive: false,
            isValid: false,
          },
        ],
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        passPattern: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'),
        namePatter: new RegExp('^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$'),
        emailPattern: new RegExp('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$ '),
        passValid: false,
        passActive: false,
        repeatPassValid: false,
        repeatPassActive: false,
        emailValid: false,
        emailActive: false,
        nameValid: false,
        nameActive: false,
      }
    },
    computed: {
      isPassValid() {
        if (this.passActive && this.passValid) {
          return 'valid'
        } else if (this.passActive && !this.passValid) {
          return 'invalid'
        }
        return ''
      },
      isPassRepeatValid() {
        if (this.repeatPassActive && this.repeatPassValid) {
          return 'valid'
        } else if (this.repeatPassActive && !this.repeatPassValid) {
          return 'invalid'
        }
        return ''
      },
      isNameValid() {
        if (this.nameActive && this.nameValid) {
          return 'valid'
        } else if (this.nameActive && !this.nameValid) {
          return 'invalid'
        }
        return ''
      },
      isEmailValid() {
        if (this.emailActive && this.emailValid) {
          return 'valid'
        } else if (this.emailActive && !this.emailValid) {
          return 'invalid'
        }
        return ''
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
        this.data[index].isValid = this.data[index].pattern.test(value);
      },
      registration() {
        const {username, password, password_confirmation, email} = this;
        this.userRegistration({
          username,
          password,
          email,
          password_confirmation
        });
      },
      passwordTest(e) {
        const value = e.target.value;
        this.password = value;
        this.passActive = true;
        this.passValid = this.passPattern.test(value);
      },
      repeatPasswordTest(e) {
        const value = e.target.value;
        this.password_confirmation = value;
        this.repeatPassActive = true;
        this.repeatPassValid = this.password_confirmation === this.password && this.passPattern.test(value);
      },
      nameTest(e) {
        const value = e.target.value;
        this.name = value;
        this.nameActive = true;
        this.nameValid = this.namePatter.test(value);
      },
      emailTest(e) {
        const value = e.target.value;
        this.email = value;
        this.emailActive = true;
        this.emailValid = this.emailPattern.test(value);
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