<template>
  <div class="modal-inside">
    <header class="modal__header">
      <img src="../../assets/img/management.png"
           alt=""
           class="modal__header-img"
      >
      <h4 class="modal__title">Редактировать группу</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="title">Group name</label>

            <input
              type="text"
              id="title"
              class="form-control"
              :value="groupData.title"
              @input="SET_GROUP_TITLE($event.target.value)"
            >
          </div>

          <div class="form-group">
            <label for="slug">Group slug</label>

            <input
              type="text"
              id="slug"
              class="form-control"
              :value="groupData.title"
              @input="SET_GROUP_SLUG($event.target.value)"
            >
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <p>Group status</p>

            <div class="form-check-inline">
              <label for="active" class="form-check-label">
                <input
                  type="radio"
                  id="active"
                  class="form-check-input"
                  value="active"
                  v-model="groupData.status"
                  @input="SET_GROUP_STATUS($event.target.value)"
                >
                <span>active</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="disable" class="form-check-label">
                <input
                  type="radio"
                  id="disable"
                  class="form-check-input"
                  value="disable"
                  v-model="groupData.status"
                  @input="SET_GROUP_STATUS($event.target.value)"
                >
                <span>disable</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <p>Add channels</p>

            <button
              type="button"
              class="btn btn-primary"
              @click="SET_MODAL({name: 'ModalGroupAddChannels'})"
            >Add channels
            </button>
          </div>
        </div>
      </div>

      <div class="drop" @dragover.prevent @drop="onDrop">
        <div class="helper"></div>
        <label v-if="!groupData.avatar" class="button">
          Перетащите или выберите изображение
          <input type="file" name="image" @change="onChange">
        </label>
        <div class="hidden" v-else :class="{ 'image': true }">
          <img :src="imgSrc"
               alt=""
               class="img"
               v-if="imgSrc"
          />
          <v-icon name="spinner"
                  scale="3"
                  spin
                  v-else
          />

          <button class="button button_remove" 
                  type="button" 
                  @click="removeImage"
          >
            Удалить
          </button>
        </div>
      </div>

      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPercentage"></progress>
      </div>

      <p v-if="notImage" style="text-align: center; color: red;">{{ notImage }}</p>

      <footer class="modal__footer">
        <button type="submit" class="btn btn-primary mb-1">Сохранить</button>
        <span class="edit-notice">Изменения вступят в силу после сохранения</span>
      </footer>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from "vuex";
  import vSelect from "vue-select";

  export default {
    name: "ModalGroupEdit",
    components: {
      vSelect
    },
    computed: {
      ...mapGetters('groups', ['groupData', 'imageUploadPercentage']),
      ...mapGetters({
        userData: "user/userData",
      })
    },
    created() {
      this.GET_GROUP_DATA(this.groupData.id).then(response => {
        this.SET_GROUP_DATA(response);

        if (response.avatar) {
          this.imgSrc = response.avatar.average;
        }
      });

    },
    beforeDestroy() {
      this.SET_GROUP_DATA({
        id: "",
        title: "",
        slug: "",
        status: "",
        user_ids: [],
        owner_id: "",
        avatar: undefined
      });
    },
    data() {
      return {
        img: "",
        imgSrc: "",
        notImage: "",
        upLoadStarted: false
      };
    },
    methods: {
      ...mapMutations('groups', [
        'SET_GROUP_DATA',
        'SET_GROUP_TITLE',
        'SET_GROUP_SLUG',
        'SET_GROUP_OWNER_ID',
        'SET_GROUP_STATUS',
      ]),
      ...mapMutations({
        SET_MODAL: "modal/SET_MODAL"
      }),
      ...mapActions('groups', ['GET_GROUP_DATA', 'EDIT_GROUP', 'CREATE_GROUP_AVATAR']),

        /**
         * Сабмит
          * @returns {Promise<void>}
         */ 
      async onSubmit() {
        this.SET_GROUP_OWNER_ID(this.userData.user_id);

        if (this.img) {
          this.upLoadStarted = true;
          await this.CREATE_GROUP_AVATAR(this.img)
            .then(() => (this.upLoadStarted = false));
        }

        this.EDIT_GROUP().then(() => this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          type: 'success',
          title: 'Данные группы изменены'
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
  textarea {
    resize: none;
  }
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
