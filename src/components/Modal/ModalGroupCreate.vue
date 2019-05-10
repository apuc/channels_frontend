<template>
  <div class="modal-inside">
    <header class="modal__header">
      <img src="../../assets/img/management.png" 
           alt=""
           class="modal__header-img"
      >
      <h4 class="modal__title">Создать группу</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="title">Название группы</label>
            
            <input
              type="text"
              id="title"
              class="form-control"
              :value="groupData.title"
              @input="SET_GROUP_TITLE($event.target.value)"
            >
          </div>

          <div class="form-group">
            <label for="slug">Слаг группы</label>
            
            <input
              type="text"
              id="slug"
              class="form-control"
              :value="groupData.slug"
              @input="SET_GROUP_SLUG($event.target.value)"
            >
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <p>Статус группы</p>

            <div class="form-check-inline">
              <label for="active" class="form-check-label">
                <input
                  type="radio"
                  id="active"
                  class="form-check-input"
                  value="active"
                  name="group-status"
                  @input="SET_GROUP_STATUS($event.target.value)"
                >
                <span>Активна</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="disable" class="form-check-label">
                <input
                  type="radio"
                  id="disable"
                  class="form-check-input"
                  value="disable"
                  name="group-status"
                  @input="SET_GROUP_STATUS($event.target.value)"
                >
                <span>Не активна</span>
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

      <button type="submit" class="btn btn-primary">Создать</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import vSelect from "vue-select";

export default {
  name: "ModalGroupCreate",
  components: { vSelect },
  computed: {
    ...mapGetters('groups', ['groupData', 'imageUploadPercentage']),
    ...mapGetters({
      userData: "user/userData",
    })
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
      'SET_CHANNELS_TO_ADD',
      'SET_GROUP_TITLE',
      'SET_GROUP_SLUG',
      'SET_GROUP_STATUS',
      'SET_GROUP_OWNER_ID',
      'SET_GROUP_USER_IDS',
    ]),
    ...mapActions('groups', ['CREATE_GROUP', 'CREATE_GROUP_AVATAR']),
    async onSubmit() {
      this.SET_GROUP_OWNER_ID(this.userData.user_id);

      if (this.img) {
        this.upLoadStarted = true;
        await this.CREATE_GROUP_AVATAR(this.img).then(
          () => (this.upLoadStarted = false)
        );
      }

      this.CREATE_GROUP().then(() => this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        type: 'success',
        title: 'Группа создана'
      }));
    },
    createFormData(file) {
      let formData = new FormData();
      formData.append("avatar", file);
      this.img = formData;
    },
    onDrop: function(e) {
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
  }
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