<template>
  <div class="modal-inside">
    
    <header class="modal__header">
      
      <div class="d-flex align-items-center w-100 mb-3">
        <img src="../../assets/img/management.png" class="modal__header-img">
        <h4 class="modal__title">Редактирование профиля</h4>
      </div>

      <nav>
        <button type="button"
                class="btn mr10"
                :class="{'btn-outline-primary': isGeneralSettings}"
                @click="switchSettings"
        >
          Общее
        </button>

        <button type="button"
                class="btn"
                :class="{'btn-outline-primary': isPrivateSettings}"
                @click="switchSettings"
        >
          Личное
        </button>
      </nav>
    </header>

    <form v-if="isGeneralSettings"
          class="modal__content"
          @submit.prevent="onSubmitGeneral"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="username">Псевдоним</label>

            <input type="text"
                   id="username"
                   class="form-control"
                   v-model="user.username"
            >
          </div>
        </div>
      </div>
      
      <AvatarUploader :avatar="user.avatar" v-model="user.avatar"/>
      
      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPercentage"></progress>
      </div>
      
      <div class="modal__footer">
        <button type="submit" class="btn btn-primary mr-1 mb-1">Сохранить</button>
        <span class="edit-notice">Изменения вступят в силу после сохранения</span>
      </div>
      
    </form>

    <form v-else
          class="modal__content"
          @submit.prevent="onSubmitPrivate"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="password">Новый пароль</label>

            <input type="password"
                   id="password"
                   class="form-control"
                   v-model="user.password"
            >
            
            <p 
              v-if="errors.hasOwnProperty('password')" 
              v-for="error in errors['password']"
              style="color:red">{{error}}
            </p>
            
          </div>

          <div class="form-group">
            <label for="password-repeat">Повторите пароль</label>

            <input type="password"
                   id="password-repeat"
                   class="form-control"
                   v-model="user.passwordRepeat"
            >

            <p
              v-if="errors.hasOwnProperty('password_confirmation')"
              v-for="error in errors['password_confirmation']"
              style="color:red">{{error}}
            </p>
          </div>

          <div class="form-group">
            <label for="email">Email</label>

            <input type="text"
                   id="email"
                   class="form-control"
                   v-model="user.email"
            >

            <p
              v-if="errors.hasOwnProperty('email')"
              v-for="error in errors['email']"
              style="color:red">{{error}}
            </p>
          </div>
        </div>
      </div>

      <div class="modal__footer">
        <button type="submit" class="btn btn-primary mr-1 mb-1">Сохранить</button>
        <button type="submit" 
                class="btn btn-danger mb-1" 
                @click.prevent="onDeleteProfile"
        >
          Удалить профиль
        </button>
        <span class="edit-notice">Изменения вступят в силу после сохранения</span>
      </div>

    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import AvatarUploader from "../Controls/AvatarUploader";

  export default {
    name: "ModalEditProfile",
      
    components:{
        AvatarUploader, 
    },  
      
    computed: {
      ...mapGetters('user', ['userData', 'imageUploadPercentage'])
    },
      
      
    data() {
      return {
          
        user: {
          avatar:null,  
          user_id: '',
          email: '',
          username: '',
          password: '',
          passwordRepeat: '',
        },
          
        upLoadStarted: false,
          
        errors:{},  
          
        isGeneralSettings: true,
        isPrivateSettings: false,
      }
    },
      
      
    methods: {
      ...mapMutations({
        SET_USER_INFO: 'user/SET_USER_INFO',
      }),
        
      ...mapActions('auth',[
          'LOGOUT',
      ]),

        ...mapActions('common',[
            'MAKE_REQUEST',
        ]),  

        /**
         * Сабмит общее
          * @returns {Promise<void>}
         */ 
      async onSubmitGeneral() {
       
          //если поменяли аватар
        if(this.user.avatar instanceof FormData) {

          this.upLoadStarted = true;
            
            return await this.MAKE_REQUEST({name:'user/CREATE_USER_AVATAR', params:this.user.avatar})
                .then(avatar_id => {
                    this.MAKE_REQUEST({
                        name:'user/EDIT_GENERAL_USER_DATA',
                        params:{id: avatar_id, username: this.user.username}
                    }).then(userData => this.SET_USER_INFO(userData));

                    this.upLoadStarted = false;

                    this.showAlert()
                });
        }

            //если поменяли просто данные без аватара
        if(this.user.avatar instanceof FormData === false){
            this.MAKE_REQUEST({
                     name:'user/EDIT_GENERAL_USER_DATA',
                     params:{
                         id: this.userData.avatar ? this.userData.avatar.id : null,
                         username: this.user.username
                     }
                })
                    .then(userData => {
                        this.SET_USER_INFO(userData);
                        this.showAlert();
                });
        }

        //если удалили аватар
        if(this.user.avatar == null && this.userData.avatar){
            console.log('delete avatar');
        }
      },

        /**
         * Сабмит личное
         * @returns {Promise<void>}
         */
      async onSubmitPrivate() {
           this.errors = {};
           this.MAKE_REQUEST({name:'user/EDIT_PRIVATE_USER_DATA',params:this.user})
                .then(() => this.showAlert())
              .catch((err)=>{
                  if(err.status == 422){
                      this.errors = err.body.errors;
                  }
              });
      },
        
        /**
         * Удаление профиля
         */
      async onDeleteProfile(){
          const shouldDelete = await this.$swal({
              title:'Профиль будет удален навсегда!',
              text:'',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Подтвердить',
              cancelButtonText: 'Отмена'
          });
          
          
          if(shouldDelete.value){
              this.MAKE_REQUEST({name:'user/DELETE_USER',params:null}).then(()=>this.LOGOUT());
          }
      },  

        /**
         * Показывает алерт об успешном сохранении
          */
        showAlert(){
          this.$swal({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              type: 'success',
              title: 'Новые данные сохранены'
          })
      },  
        
      switchSettings() {
        this.isGeneralSettings = !this.isGeneralSettings;
        this.isPrivateSettings = !this.isPrivateSettings;
      },
    },
      
      
    created() {
        this.user.username = this.userData.username;
        this.user.email = this.userData.email;
        this.user.user_id = this.userData.user_id;
        this.user.avatar = this.userData.avatar;
    }
  }
</script>

<style scoped>
  
</style>