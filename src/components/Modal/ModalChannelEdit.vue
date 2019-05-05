<template>
  <div class="modal-inside">
    <header class="modal__header">
      <img src="../../assets/img/management.png" alt="">
      <h4 class="modal__title">Редактировать канал</h4>
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
          </div>

          <div class="form-group">
            <button type="button" class="btn btn-primary" @click="setAddUsersModal">Добавить пользователей</button>
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

            <div class="form-check-inline">
              <label for="dialog" class="form-check-label">
                <input
                  type="radio"
                  id="dialog"
                  class="form-check-input"
                  value="dialog"
                  name="channel-type"
                  v-model="channelData.type"
                  @input="SET_CHANNEL_TYPE($event.target.value)"
                >
                <span>Диалог</span>
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

      <div class="drop" @dragover.prevent @drop="onDrop">
        <div class="helper"></div>
        <label v-if="!imgSrc" class="button">
          Перетащите или выберите изображение
          <input type="file" name="image" @change="onChange">
        </label>
        <div class="hidden" v-else :class="{ 'image': true }">
          <img :src="imgSrc" alt class="img">

          <button class="button button_remove" type="button" @click="removeImage">Удалить</button>
        </div>
      </div>

      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPercentage"></progress>
      </div>

      <p v-if="notImage" style="text-align: center; color: red;">{{ notImage }}</p>

      <footer class="modal__footer">
        <button type="submit" class="btn btn-primary">Сохранить</button>
        <span class="edit-notice">Изменения вступят в силу после сохранения</span>
      </footer>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from "vuex";
  import vSelect from "vue-select";

  export default {
    name: "ModalChannelEdit",
    components: {vSelect},
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
        img: "", // form data to send
        imgSrc: "", // img url
        notImage: "", // if file in not picture
        upLoadStarted: false,
        isSamePicture: true
      };
    },
    created() {
      this.GET_CHANNEL_DATA(this.channelData.id).then(data => {
        this.SET_CHANNEL_DATA(data);
        this.GET_CHANNEL_USERS(this.channelData.id).then(users => {
          this.SET_CHANNEL_USER_IDS(users);
        });

        if (this.isSamePicture && this.channelData.avatar) {
          this.imgSrc = this.channelData.avatar.average;
        }
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
        'SET_CONTACTS_FREE_TO_ADD_SEARCH'
      ]),
      ...mapMutations({
        SET_MODAL: "modal/SET_MODAL"
      }),
      ...mapActions("channels", [
        "GET_CHANNEL_DATA",
        "GET_CHANNEL_USERS",
        "EDIT_CHANNEL",
        "CREATE_CHANNEL_AVATAR"
      ]),

      setAddUsersModal() {
        this.SET_CONTACTS_TO_ADD_CHANNEL_ID(this.channelData.id);
        this.SET_CONTACTS_FREE_TO_ADD_SEARCH([]);
        this.SET_MODAL("ModalChannelAddUsers");
      },
      async onSubmit() {
        const owner_id = this.userData.user_id;
        this.SET_CHANNEL_OWNER_ID(owner_id);

        if (this.img) {
          this.upLoadStarted = true;
          await this.CREATE_CHANNEL_AVATAR(this.img).then(
            () => (this.upLoadStarted = false)
          );
        }

        this.EDIT_CHANNEL().then(response => this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          type: 'success',
          title: 'Данные канала изменены'
        }));
      },
      createFormData(file) {
        let formData = new FormData();
        formData.append("avatar", file);
        this.img = formData;
      },
      onDrop: function (e) {
        e.stopPropagation();
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.createImage(files[0]);
        this.createFormData(files[0]);
      },
      onChange(e) {
        this.imgSrc = "";
        const files = e.target.files || e.dataTransfer.files;
        const fileType = files[0].type.split("/");

        if (files.length && fileType[0] === "image") {
          this.notImage = "";
          this.createImage(files[0]);
          this.createFormData(files[0]);
        } else {
          this.notImage = "Выберите изображение, пожалуйста";
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
        this.imgSrc = "";
      }
    },
  };
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