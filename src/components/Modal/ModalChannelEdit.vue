<template>
  <div class="modal-inside">
    <header class="modal__header">
      <img src="../../assets/img/management.png"
           alt=""
           class="modal__header-img"
      >
      <h4 class="modal__title">Редактировать канал (ID {{channelData.id}})</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="title">Название канала</label>

            <input
              type="text"
              id="title"
              class="form-control"
              :value="channelData.title"
              @input="SET_CHANNEL_TITLE($event.target.value)"
            >

            <p
              v-if="errors.hasOwnProperty('title')"
              v-for="error in errors['title']"
              style="color:red">{{error}}
            </p>
          </div>

          <div class="form-group">
            <label for="slug">Слаг канала</label>

            <input
              type="text"
              id="slug"
              class="form-control"
              :value="channelData.slug"
              @input="SET_CHANNEL_SLUG($event.target.value)"
            >

            <p
              v-if="errors.hasOwnProperty('slug')"
              v-for="error in errors['slug']"
              style="color:red">{{error}}
            </p>
          </div>

          <div class="add_button">
            <button type="button" class="btn btn-primary" @click="setAddUsersModal">
              Добавить пользователей
            </button>
          </div>
            
          <div class="add_button">
            <button type="button" class="btn btn-primary" @click="setAddBotsModal">
              Добавить бота
            </button>
          </div>

          <div class="form-group">
            <p>Статус канала</p>

            <div class="form-check-inline">
              <label for="active" class="form-check-label">
                <input
                  type="radio"
                  id="active"
                  class="form-check-input"
                  value="active"
                  name="channel-status"
                  v-model="channelData.status"
                  @input="SET_CHANNEL_STATUS($event.target.value)"
                >
                <span>Активный</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="disable" class="form-check-label">
                <input
                  type="radio"
                  id="disable"
                  class="form-check-input"
                  value="disable"
                  name="channel-status"
                  v-model="channelData.status"
                  @input="SET_CHANNEL_STATUS($event.target.value)"
                >
                <span>Не активный</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <p>Тип канала</p>

            <div class="form-check-inline">
              <label for="chat" class="form-check-label">
                <input
                  type="radio"
                  id="chat"
                  class="form-check-input"
                  value="chat"
                  name="channel-type"
                  v-model="channelData.type"
                  @input="SET_CHANNEL_TYPE($event.target.value)"
                >
                <span>Чат</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="wall" class="form-check-label">
                <input
                  type="radio"
                  id="wall"
                  class="form-check-input"
                  value="wall"
                  name="channel-type"
                  v-model="channelData.type"
                  @input="SET_CHANNEL_TYPE($event.target.value)"
                >
                <span>Стена</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <p>Приватность</p>

            <div class="form-check-inline">
              <label for="private" class="form-check-label">
                <input
                  type="radio"
                  id="private"
                  class="form-check-input"
                  value="1"
                  name="channel-privacy"
                  v-model="channelData.private"
                  @input="SET_CHANNEL_PRIVATE($event.target.value)"
                >
                <span>Приватный</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="not-private" class="form-check-label">
                <input
                  type="radio"
                  id="not-private"
                  class="form-check-input"
                  value="0"
                  name="channel-privacy"
                  v-model="channelData.private"
                  @input="SET_CHANNEL_PRIVATE($event.target.value)"
                >
                <span>Публичный</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <AvatarUploader :avatar="avatar" v-model="avatar"/>

      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPercentage"></progress>
      </div>

      <footer class="modal__footer">
        <button type="submit" class="btn btn-primary mb-1">Сохранить</button>
        <span class="edit-notice">Изменения вступят в силу после сохранения</span>
      </footer>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from "vuex";
  import AvatarUploader from "../Controls/AvatarUploader";
  import vSelect from "vue-select";

  export default {
    name: "ModalChannelEdit",
      
    components: {vSelect,AvatarUploader},
      
    computed: {
      ...mapGetters("channels", [
        "channelData",
        "imageUploadPercentage",
      ]),
      ...mapGetters({
        userData: "user/userData"
      })
    },
      
    data() {
      return {
        avatar:null, 
        upLoadStarted: false,
        errors:{},  
      };
    },
      
    created() {
      this.GET_CHANNEL_DATA(this.channelData.id).then(data => {
        this.SET_CHANNEL_DATA(data);
        this.GET_CHANNEL_USERS(this.channelData.id).then(users => {
          this.SET_CHANNEL_USER_IDS(users);
        });
          
        this.avatar = this.channelData.avatar;
      });
    },
      
    beforeDestroy() {
      this.SET_CHANNEL_USERS([]);
      this.SET_CHANNEL_DATA({
        id: "",
        title: "",
        slug: "",
        status: "",
        user_ids: [],
        owner_id: "",
        type: "",
        private: "",
        avatar: undefined
      });
    },
      
    methods: {
      ...mapMutations("channels", [
        "SET_CHANNEL_DATA",
        "SET_CHANNEL_TITLE",
        "SET_CHANNEL_SLUG",
        "SET_CHANNEL_STATUS",
        "SET_CHANNEL_USER_IDS",
        "SET_CHANNEL_OWNER_ID",
        "SET_CHANNEL_TYPE",
        "SET_CHANNEL_PRIVATE",
        "SET_CHANNEL_USERS",
        'SET_CONTACTS_TO_ADD_CHANNEL_ID',
        'SET_CONTACTS_FREE_TO_ADD_SEARCH',
        'SET_CHANNEL_AVATAR_ID',
      ]),
        
      ...mapMutations({
        SET_MODAL: "modal/SET_MODAL"
      }),
        
      ...mapActions("channels", [
        "GET_CHANNEL_DATA",
        "GET_CHANNEL_USERS",
      ]),

        ...mapActions('common',[
            'MAKE_REQUEST',
        ]),  

      setAddUsersModal() {
        this.SET_CONTACTS_TO_ADD_CHANNEL_ID(this.channelData.id);
        this.SET_CONTACTS_FREE_TO_ADD_SEARCH([]);
        this.SET_MODAL({name: "ModalChannelAddUsers"});
      },
      setAddBotsModal() {
        this.SET_MODAL({name: "ModalAddBotToChannel"});
      },
        
      async onSubmit() {
        const owner_id = this.userData.user_id;
        this.SET_CHANNEL_OWNER_ID(owner_id);
        this.errors = {};

        if (this.avatar instanceof  FormData) {
            await this.MAKE_REQUEST({name:'channels/CREATE_CHANNEL_AVATAR',params:this.avatar})
                .then(id => {
                    this.upLoadStarted = false;
                });
        }
        
        if(!this.avatar && this.channelData.avatar){
            this.SET_CHANNEL_AVATAR_ID(null);
        }

          this.MAKE_REQUEST({name:'channels/EDIT_CHANNEL',params:null}).then(() => this.$swal({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              type: 'success',
              title: 'Данные канала изменены'
          })).catch((err)=>{
              if(err.status == 422){
                  this.errors = err.body.errors;
              }
          });
      },
    },
  };
</script>

<style scoped lang="scss">


  .button {
    position: relative;
    padding: 15px 35px;

    font-weight: bold;
    color: #fff;

    background-color: #d3394c;
    border: 0;
    cursor: pointer;
  }

  .button:hover {
    background-color: #722040;
  }
  .add_button{
    margin-bottom: 5px;
  }
</style>