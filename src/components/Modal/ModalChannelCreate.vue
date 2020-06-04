<template>
  <div class="modal-inside">
    <header class="modal__header">
      <img src="../../assets/img/management.png"
           alt=""
           class="modal__header-img"
      >
      <h4 class="modal__title">Создать канал</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-9">
          
          <div class="form-group">
            <label for="title">Название канала</label>

            <input type="text"
                   id="title"
                   class="form-control"
                   v-model="channelData.title"
            >

            <p
              v-if="errors.hasOwnProperty('title')"
              v-for="error in errors['title']"
              style="color:red">{{error}}
            </p>
          </div>

          <div class="form-group">
            <label for="slug">Слаг канала</label>

            <input type="text"
                   id="slug"
                   class="form-control"
                   v-model="channelData.slug"
            >

            <p
              v-if="errors.hasOwnProperty('slug')"
              v-for="error in errors['slug']"
              style="color:red">{{error}}
            </p>
          </div>

          <div class="form-group">
            <p>Тип канала</p>

            <div class="form-check-inline">
              <label for="chat" class="form-check-label">
                <input type="radio"
                       id="chat"
                       class="form-check-input"
                       value="chat"
                       name="channel-type"
                       v-model="channelData.type"
                >
                <span>Чат</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="wall" class="form-check-label">
                <input type="radio"
                       id="wall"
                       class="form-check-input"
                       value="wall"
                       name="channel-type"
                       v-model="channelData.type"
                >
                <span>Стена</span>
              </label>
            </div>

            <p
              v-if="errors.hasOwnProperty('type')"
              v-for="error in errors['type']"
              style="color:red">{{error}}
            </p>
            
          </div>

          <div class="form-group">
            <p>Приватность</p>

            <div class="form-check-inline">
              <label for="private" class="form-check-label">
                <input type="radio"
                       id="private"
                       class="form-check-input"
                       value="1"
                       name="channel-privacy"
                       v-model="channelData.private"
                >
                <span>Приватный</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="not-private" class="form-check-label">
                <input type="radio"
                       id="not-private"
                       class="form-check-input"
                       value="0"
                       name="channel-privacy"
                       v-model="channelData.private"
                >
                <span>Публичный</span>
              </label>
            </div>

            <p
              v-if="errors.hasOwnProperty('private')"
              v-for="error in errors['private']"
              style="color:red">{{error}}
            </p>
          </div>
          
        </div>
      </div>

      <AvatarUploader :avatar="channelData.avatar" v-model="channelData.avatar"/>

      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPercentage"></progress>
      </div>

      <button type="submit" class="btn btn-primary">Создать</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import AvatarUploader from "../Controls/AvatarUploader";

  export default {
    name: "ModalChannelCreate",
      
    components:{
        AvatarUploader
    },  
      
    computed: {
      ...mapGetters('channels', ['imageUploadPercentage']),
      ...mapGetters({
        userData: 'user/userData',
      })
    },
      
      
    data() {
      return {
        upLoadStarted: false,
          
        errors:{},  
          
        channelData: {
          title: '',
          slug: '',
          status: 'active',
          owner_id: null,
          user_ids: [],
          type: '',
          private: null,
          avatar: null
        }
      }
    },
      
      
    methods: {
      ...mapMutations({
        SET_MODAL: 'modal/SET_MODAL',
      }),
        
      ...mapActions('common',[
            'MAKE_REQUEST',
      ]),

        /**
         * Сабмит
          * @returns {Promise<void>}
         */  
      async onSubmit() {
          
        this.channelData.user_ids = [this.userData.user_id];
        this.channelData.owner_id = this.userData.user_id;
        this.errors = {};

        if (this.channelData.avatar) {
          this.upLoadStarted = true;
          
          await this.MAKE_REQUEST({name:'channels/CREATE_CHANNEL_AVATAR',params:this.channelData.avatar})
            .then(id => {
              this.upLoadStarted = false;
              this.channelData.avatar = id;
            });
        }


        this.MAKE_REQUEST({name:'channels/CREATE_CHANNEL',params:{
                channelData:this.channelData,
                type:'channel'
            }})
            .then(() => this.$swal({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                type: 'success',
                title: 'Канал создан'
        })).catch((err)=>{
            if(err.status == 422){
                this.errors = err.body.errors;
            }
        });
      },
        
    },
  }
</script>

<style scoped>
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
</style>