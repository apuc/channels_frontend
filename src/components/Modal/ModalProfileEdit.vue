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

            <input type="text" id="username" class="form-control" v-model="user.username">
          </div>
        </div>
      </div>

      <div class="drop" @dragover.prevent @drop="onDrop">
        <div class="helper"></div>
        <label v-if="!imgSrc" class="button">
          SELECT OR DROP AN IMAGE
          <input type="file" name="image" @change="onChange">
        </label>

        <div class="hidden image"
             v-else
        >
          <img :src="imgSrc" alt="" class="img"/>

          <button class="button button_remove" type="button" @click="removeImage">REMOVE</button>
        </div>
      </div>

      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPercentage"></progress>
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

            <input type="password" id="password" class="form-control" v-model="user.password">
          </div>

          <div class="form-group">
            <label for="password-repeat">Repeat Password</label>

            <input type="password" id="password-repeat" class="form-control" v-model="user.passwordRepeat">
          </div>

          <div class="form-group">
            <label for="email">Email</label>

            <input type="text" id="email" class="form-control" v-model="user.email">
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary mr-1">Save</button>
      <button type="submit" class="btn btn-danger" @click="DELETE_USER">Delete</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalEditProfile",
    computed: {
      ...mapGetters('user', ['userData', 'imageUploadPercentage'])
    },
    data() {
      return {
        user: {
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
        SET_USER_INFO: 'user/SET_USER_INFO',
      }),
      ...mapActions('user', [
        'GET_USER_ME',
        'EDIT_GENERAL_USER_DATA',
        'EDIT_PRIVATE_USER_DATA',
        'DELETE_USER',
        'CREATE_USER_AVATAR',
      ]),
      async onSubmitGeneral() {
        await this.SET_USER_INFO(this.user);

        if (this.img) {
          this.upLoadStarted = true;
          await this.CREATE_USER_AVATAR(this.img).then(avatar_id => {
            this.EDIT_GENERAL_USER_DATA({id: avatar_id, username: this.user.username})
              .then(userData => this.SET_USER_INFO(userData));
            this.upLoadStarted = false;
          });
        }

      },

      async onSubmitPrivate() {
        await this.SET_USER_INFO(this.user);
        this.EDIT_PRIVATE_USER_DATA();
      },
      createFormData(file) {
        let formData = new FormData();
        formData.append('avatar', file);
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
      this.GET_USER_ME().then(data => {
        this.user.username = data.username;
        this.user.email = data.email;
        this.user.user_id = data.user_id;

        if (data.avatar) {
          this.imgSrc = data.avatar.average;
        }
      });
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