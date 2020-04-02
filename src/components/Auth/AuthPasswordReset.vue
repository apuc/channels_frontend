<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <form @submit.prevent="reset" class="col-md-7 col-12 pt-lg-3">

          <div class="form-group"
               v-for="(field, index) in data"
               :key="index"
          >
            <label :for="field.name" v-html="field.label"></label>
            <input :type="field.type"
                   class="form-control"
                   :class="field.class"
                   :id="field.name"
                   :ref="field.name"
                   :value="field.value"
                   @input="validate($event, index)"
            />

            <span :class="!field.isActive || field.isValid ? 'hidden' : 'invalid'">
              {{field.errorMessage}}
            </span>
          </div>

          <b-alert variant="danger" :show="errors !== null">
            <template v-for="field in errors">
                <span v-for="err in field">
                   {{err}}
                </span>
            </template>
          </b-alert>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary flex-fill">Восстановить</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "AuthPasswordReset",
        data() {
          return {
            errors: null,
  
            data: {
              password: {
                label: 'Новый пароль <br> <span class="small">пароль должен содержать не менее 5 символов, одна заглавная, одна строчная буквы, цифра</span>',
                name: 'password',
                type: 'password',
                value: '',
                pattern: new RegExp('(?=.*[a-zA-Z])(?=.*[0-9])(?=.{5,})'),
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
                pattern: new RegExp('(?=.*[a-z])(?=.*[0-9])(?=.{5,})'),
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
            RESET_PASSWORD: 'auth/RESET_PASSWORD',
          }),
          
          /**
           * Валидация
           */
          validate(e, index) {
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

          /**
           * Сброс пароля
           */
          reset() {
            if (!this.data.password.isValid || !this.data.repeatPassword.isValid) 
            {
              for (let key in this.data) {
                if (!this.data[key].isValid) {
                  this.data[key].isActive = true;
                  this.data[key].class = 'invalid';
                }
              }
              
              return
            } 
            
            this.RESET_PASSWORD({
              reset_token:this.$route.params.token,
              password:this.data.password.value
            }).then(res =>{
              if(res.body.success){
                this.$swal({
                  toast: true,
                  position: 'top',
                  showConfirmButton: false,
                  timer: 4000,
                  type: 'success',
                  title: 'Пароль востановлен!'
                });
                this.$router.push('/login');
              }else{
                console.log(res.body.error)
              }
            }).catch((err)=>{
              if(err.status === 422){
                  this.errors = err.body.errors
              }
            });
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