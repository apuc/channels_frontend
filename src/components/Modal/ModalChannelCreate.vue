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
        <div class="col-6">
          <div class="form-group">
            <label for="title">Название канала</label>

            <input type="text"
                   id="title"
                   class="form-control"
                   v-model="channelData.title"
            >
          </div>

          <div class="form-group">
            <label for="slug">Слаг канала</label>

            <input type="text"
                   id="slug"
                   class="form-control"
                   v-model="channelData.slug"
            >
          </div>
          <div class="form-group">
            <p>Статус канала</p>

            <div class="form-check-inline">
              <label for="active" class="form-check-label">
                <input type="radio"
                       id="active"
                       class="form-check-input"
                       value="active"
                       name="channel-status"
                       v-model="channelData.status"
                >
                <span>Активный</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="disable" class="form-check-label">
                <input type="radio"
                       id="disable"
                       class="form-check-input"
                       value="disable"
                       name="channel-status"
                       v-model="channelData.status"
                >
                <span>Не активный</span>
              </label>
            </div>
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

            <div class="form-check-inline">
              <label for="dialog" class="form-check-label">
                <input type="radio"
                       id="dialog"
                       class="form-check-input"
                       value="dialog"
                       name="channel-type"
                       v-model="channelData.type"
                >
                <span>Диалог</span>
              </label>
            </div>
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
          </div>
        </div>
      </div>

      <div class="drop" @dragover.prevent @drop.stop.prevent="onDrop">
        <div class="helper"></div>
        <label v-if="!imgSrc" class="button">
          Перетащите или выберите изображение
          <input type="file" name="image" @change="onChange">
        </label>
        <div class="hidden image" v-else>
          <img :src="imgSrc" alt="" class="img"/>

          <button class="button button_remove" type="button" @click="removeImage">Удалить</button>
        </div>
      </div>

      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPercentage"></progress>
      </div>

      <p v-if="notImage" style="text-align: center; color: red;"> {{ notImage }}</p>

      <button type="submit" class="btn btn-primary">Создать</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalChannelCreate",
    computed: {
      ...mapGetters('channels', ['imageUploadPercentage']),
      ...mapGetters({
        userData: 'user/userData',
      })
    },
    data() {
      return {
        img: '',
        imgSrc: '',
        notImage: '',
        upLoadStarted: false,
        channelData: {
          title: '',
          slug: '',
          status: '',
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
      ...mapActions('channels', ['CREATE_CHANNEL', 'CREATE_CHANNEL_AVATAR']),
      async onSubmit() {
        this.channelData.user_ids = [this.userData.user_id];
        this.channelData.owner_id = this.userData.user_id;

        if (this.img) {
          this.upLoadStarted = true;
          await this.CREATE_CHANNEL_AVATAR(this.img)
            .then(id => {
              this.upLoadStarted = false;
              this.channelData.avatar = id;
            });
        }

        this.CREATE_CHANNEL(this.channelData).then(() => this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          type: 'success',
          title: 'Канал создан'
        }));
      },
      createFormData(file) {
        let formData = new FormData();
        formData.append('avatar', file);
        this.img = formData;
      },
      onDrop() {
        const files = e.dataTransfer.files;
        this.createImage(files[0]);
        this.createFormData(files[0]);
      },
      onChange(e) {
        this.imgSrc = '';
        const files = e.target.files || e.dataTransfer.files;
        const fileType = files[0].type.split('/');

        if (files.length && fileType[0] === 'image') {
          this.notImage = '';
          this.createImage(files[0]);
          this.createFormData(files[0]);
        } else {
          this.notImage = 'Выберите изображение, пожалуйста'
        }
      },
      createImage(file) {
        const reader = new FileReader();

        reader.onload = e => {
          this.imgSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImage() {
        this.imgSrc = '';
        this.img = '';
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