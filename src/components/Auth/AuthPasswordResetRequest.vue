<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <form @submit.prevent="requestReset" class="col-md-7 col-12 pt-lg-3" autocomplete="off">

          <div class="form-group"
               v-for="(field, index) in data"
               :key="index"
          >
            <label :for="field.name" v-html="field.label"></label>
            <input :type="field.type"
                   class="form-control"
                   autocomplete="off"
                   :class="field.class"
                   :id="field.name"
                   :value="field.value"
                   @input="validate($event, index)"
            />

            <span :class="!field.isActive || field.isValid ? 'hidden' : 'invalid'">
              {{field.errorMessage}}
            </span>
          </div>

          <b-alert variant="success" :show="isSuccess">На указаный вами адрес выслано письмо со ссылкой для восстановления доступа.</b-alert>

          <div class="d-flex justify-content-between mb-3">
            <button type="submit" class="btn btn-primary flex-fill mr-3">Восстановить пароль</button>
          </div>
          

        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from "vuex";

  export default {
        name: "AuthPasswordReset",
      data() {
        return {
          data: {
            
            email: {
              label: 'Укажите email, который Вы использовали для входа на сайт',
              name: 'email',
              type: 'email',
              value: '',
              pattern: new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
              class: '',
              errorMessage: 'Введите корректный email.',
              isActive: false,
              isValid: false,
            },
          },
          
          isSuccess: false,
          isSession: false,
        }
      },
    
      methods: {
        ...mapActions({
          REQUEST_RESET: 'auth/REQUEST_RESET',
        }),

        /**
         * Валидация
         * @param e
         * @param index
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
         * Запросить восстановление
         */
        requestReset(){
          
         if (!this.data.email.isValid) {
           this.data.email.isActive = true;
           this.data.email.class = 'invalid';

           return
         }
         
         this.REQUEST_RESET(this.data.email.value).then(res =>{
            if(res.body.success){
              this.isSuccess = true
            }else{
              console.log(res.body.error)
            }
         }).catch((err)=>{
           if(err.status === 422){
             this.data.email.isActive = true;
             this.data.email.isValid = false;
             this.data.email.class = 'invalid';
             this.data.email.errorMessage = err.body.errors.email[0];
             
           }
         });
       }
      }
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