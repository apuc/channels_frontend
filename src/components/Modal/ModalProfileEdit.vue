<template>
  <div class="modal-inside">
    <header class="modal__header">
      <h4>Редактирование профиля</h4>

      <nav>
        <button type="button" class="btn mr10" @click="switchSettings">Общее</button>
        <button type="button" class="btn" @click="switchSettings">Личное</button>
      </nav>
    </header>

    <form v-if="isGeneralSettings"
          class="modal__content"
          @submit.prevent="onSubmitGeneral"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="username">Username</label>

            <input type="text" id="username" class="form-control" v-model="userData.username">
          </div>
        </div>
      </div>

      <div class="drop" @dragover.prevent @drop="onDrop">
        <div class="helper"></div>
        <label v-if="!imgSrc" class="button">
          SELECT OR DROP AN IMAGE
          <input type="file" name="image" @change="onChange">
        </label>
        <div class="hidden" v-else :class="{ 'image': true }">
          <img :src="imgSrc" alt="" class="img"/>

          <button class="button button_remove" type="button" @click="removeImage">REMOVE</button>
        </div>
      </div>

      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPersentage"></progress>
      </div>

      <span v-if="notImage" style="text-align: center; color: red;"> {{ notImage }}</span>

      <button type="submit" class="btn btn-primary mr-1">Save</button>
    </form>

    <form v-else
          class="modal__content"
          @submit.prevet="onSubmitPrivate"
    >
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label for="password">Password</label>

            <input type="password" id="password" class="form-control" v-model="userData.password">
          </div>

          <div class="form-group">
            <label for="password-repeat">Repeat Password</label>

            <input type="password" id="password-repeat" class="form-control" v-model="userData.passwordRepeat">
          </div>

          <div class="form-group">
            <label for="email">Email</label>

            <input type="text" id="email" class="form-control" v-model="userData.email">
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary mr-1">Save</button>
      <button type="submit" class="btn btn-danger" @click="deleteUser">Delete</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalEditProfile",
    computed: {
      ...mapGetters({
        userInfo: 'user/info'
      })
    },
    data() {
      return {
        userData: {
          user_id: '',
          username: '',
          email: '',
          password: '',
          passwordRepeat: '',
        },
        img: '',
        imgSrc: '',
        notImage: '',
        upLoadStarted: false,
        isGeneralSettings: true,
        isPrivateSettings: false,
      }
    },
    methods: {
      ...mapMutations({
        setUserData: 'user/SET_USER_INFO',
      }),
      ...mapActions({
        editGeneralUserData: 'user/EDIT_GENERAL_USER_DATA',
        editPrivateUserData: 'user/EDIT_PRIVATE_USER_DATA',
        deleteProfile: 'user/DELETE_USER',
        createUserAvatar: 'user/CREATE_USER_AVATAR',
      }),
      async onSubmitGeneral() {
        await this.setUserData(this.userData);

        if (this.img) {
          this.upLoadStarted = true;
          await this.createUserAvatar(this.img).then(() => this.upLoadStarted = false);
        }
        this.editGeneralUserData();
      },

      async onSubmitPrivate() {
        await this.setUserData(this.userData);
        this.editPrivateUserData();
      },
      deleteUser() {
        this.deleteProfile();
      },
      createFormData(file) {
        let formData = new FormData();
        formData.append('avatar', file);
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
        this.imgSrc = '';
        const files = e.target.files || e.dataTransfer.files;
        const fileType = files[0].type.split('/');

        if (files.length && fileType[0] === 'image') {
          this.notImage = '';
          this.createImage(files[0]);
          this.createFormData(files[0]);
        } else {
          this.notImage = 'Choose image please'
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
      },
      switchSettings() {
        this.isGeneralSettings = !this.isGeneralSettings;
        this.isPrivateSettings = !this.isPrivateSettings;
      },
    },
    created() {
      this.userData.username = this.userInfo.username;
      this.userData.email = this.userInfo.email;
      this.userData.user_id = this.userInfo.user_id;
    }
  }
</script>

<style scoped>
.btn-file input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
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

.button_remove {
  margin-top: 15px;
  padding: 10px 20px;
}

input[type="file"] {
  position: absolute;
  left: 0;
  z-index: -1;

  opacity: 0;
}

.hidden {
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.hidden.image {
  display: flex;
}

.img {
  width: 100%;
  height: auto;
}

.drop {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 100%;
  min-height: 100px;
  margin-bottom: 15px;

  border: 4px dashed #ccc;
  background-color: #f6f6f6;
  border-radius: 2px;
}

.drop label {
  margin-bottom: 0;
}
</style>