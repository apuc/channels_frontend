<template>
  <div class="modal-inside">

    <header class="modal__header">
      <div class="d-flex align-items-center w-100 mb-3">
        <img src="../../assets/img/management.png" class="modal__header-img">
        <h4 class="modal__title">Редактирование профиля</h4>
      </div>
    </header>

    <div class="pills">
      <div v-for="pill in pills" class="pill"
           :class="{'pill--selected': pill.id===pillSelected}"
           :key="pill.title"
           @click="selectPill(pill.id)"
      >
        {{pill.title}}
      </div>
    </div>

    <div v-if="pillSelected===1">
      <form class="modal__content" @submit.prevent="onSubmitGeneral">
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
    </div>

    <!--ВКЛАДКА ЛИЧНОЕ-->
    <div v-if="pillSelected===2">
      <form class="modal__content" @submit.prevent="onSubmitPrivate">
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
          <span class="edit-notice ml-2">Изменения вступят в силу после сохранения</span>
        </div>

      </form>
    </div>

    <!--ВКЛАДКА УВЕДОМЛЕНИЯ-->
    <div v-if="pillSelected===3">
      <p class="mt-3">
        <b-button variant="primary" @click="subscribeToPush">Подписаться</b-button>
      </p>
      <p>
        <b-button variant="danger" @click="unsubscribeFromPush">Отписаться</b-button>
      </p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import { BButton } from 'bootstrap-vue';
import AvatarUploader from "../Controls/AvatarUploader";

export default {
  name: "ModalEditProfile",

  components:{
    BButton,
    AvatarUploader,
  },

  computed: {
    ...mapGetters('user', ['userData', 'imageUploadPercentage'])
  },


  data() {
    return {
      pills: {
        1: {
          id: 1,
          title: "Общее"
        },
        2: {
          id: 2,
          title: "Личное"
        },
        3: {
          id: 3,
          title: "Уведомления"
        },
      },
      pillSelected: 1,

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
      SET_USER_DATA_AVATAR:'user/SET_USER_DATA_AVATAR'
    }),

    ...mapActions('auth',[
      'LOGOUT',
    ]),

    ...mapActions('common',[
      'MAKE_REQUEST',
    ]),
    selectPill(id) {
      this.pillSelected = id;
    },
    /**
     * Сабмит общее
     * @returns {Promise<void>}
     */
    async onSubmitGeneral() {

      //если поменяли аватар
      if(this.user.avatar instanceof FormData) {

        this.upLoadStarted = true;

        return  this.MAKE_REQUEST({name:'user/CREATE_USER_AVATAR', params:this.user.avatar})
        .then(avatar_id => {
          this.MAKE_REQUEST({
            name:'user/EDIT_GENERAL_USER_DATA',
            params:{id: avatar_id, username: this.user.username}
          }).then(userData => this.SET_USER_INFO(userData));

          this.upLoadStarted = false;

          this.showAlert()
        });
      }

      //если удалили аватар
      if(this.user.avatar == null && this.userData.avatar){
        this.SET_USER_DATA_AVATAR(null);
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
    showAlert(message = null){
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        type: 'success',
        title: message ? message :'Новые данные сохранены'
      })
    },

    /**
     * Подписаться на пуш уведомления
     */
    subscribeToPush(){
      navigator.serviceWorker.ready.then((reg)=> {

        reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey:process.env.VUE_APP_PUSH_SERVER_KEY
        })
        .then((subscription)=> {
          this.MAKE_REQUEST({name:'user/PUSH_SUBSCRIPTION', params:{
              subscription:subscription,
              action:"subscribe"
            }})
          .then(res => {
            if(res.body.success){
              this.showAlert("Уведомления подключены!")
              return
            }

            alert(res.body.error)
          });
        })
        .catch(function(e) {
          if (Notification.permission === 'denied') {
            console.log('Permission for Notifications was denied');
          } else {
            console.log('Unable to subscribe to push.', e);
          }
        });
      });
    },

    /**
     * Отписаться от пуш уведомлений
     */
    unsubscribeFromPush(){
      navigator.serviceWorker.ready.then((reg)=> {
        reg.pushManager.getSubscription().then((subscription)=> {
          subscription.unsubscribe().then((successful)=> {
            this.MAKE_REQUEST({name:'user/PUSH_SUBSCRIPTION', params:{
                subscription:subscription,
                action:"unsubscribe"
              }})
            .then(res => {
              if(res.body.success){
                this.showAlert("Уведомления отключены!")
                return
              }

              alert(res.body.error)
            });
          }).catch(function(e) {
            console.log('Unsubscription failed',e);
          })
        })
      });
    }
  },


  created() {
    setTimeout(()=>{
      this.user.username = this.userData.username;
      this.user.email = this.userData.email;
      this.user.user_id = this.userData.user_id;
      this.user.avatar = this.userData.avatar;
    },)

  }
}
</script>

<style scoped lang='scss'>
.tabs .nav{
  position: static !important;
}

.pills {
  width: 100%;
  margin: .5rem;
  display: flex;

  .pill {
    padding: .4rem .8rem;
    background-color: #fff;
    color: #0069d9;
    border-radius: 5px;
    cursor: pointer;

    &--selected {
      background-color: #0069d9;
      color: #fff;
    }
  }
}

@media screen and (max-width: 400px) {
  .pill {
    font-size: .8rem;
  }
}

@media screen and (max-width: 320px) {
  .pills {
    flex-direction: column;

    .pill {
      width: 85%;
      text-align: center;
    }
  }
}
</style>