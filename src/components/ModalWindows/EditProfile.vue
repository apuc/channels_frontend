<template>
  <div class="modal-inside">
    <header class="modal__header">
      <h4>Редактирование профиля</h4>
    </header>

    <form class="modal__content" @submit.prevent>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="username">Username</label>

            <input type="text" id="username" class="form-control" v-model="userData.username">
          </div>

          <div class="form-group">
            <label for="email">Email</label>

            <input type="text" id="email" class="form-control" v-model="userData.email">
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="password">Password</label>

            <input type="password" id="password" class="form-control" v-model="userData.password">
          </div>

          <div class="form-group">
            <label for="password-repeat">Repeat Password</label>

            <input type="password" id="password-repeat" class="form-control" v-model="userData.passwordRepeat">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="file">Upload Image</label>

        <div class="input-group">
            <span class="input-group-btn">
                <span class="btn btn-default btn-file">
                    Browse… <input type="file" id="file" @change="onFileChange">
                </span>
            </span>

          <input type="text" class="form-control" readonly>
        </div>
        <span v-if="notImage"> {{ notImage }}</span>
        <img :src="imgSrc" id='img-upload' v-if="imgSrc"/>
        <button class="btn btn-group remove-btn"
                type="button"
                @click="removeImage"
                v-if="imgSrc">Remove img</button>
      </div>

      <button type="submit" class="btn btn-primary mr-1" @click="onSubmit">Save</button>
      <button type="submit" class="btn btn-danger" @click="deleteUser">Delete</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "EditProfile",
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
      }
    },
    methods: {
      ...mapMutations({
        setUserData: 'user/SET_USER_INFO',
      }),
      ...mapActions({
        editProfile: 'user/EDIT_PROFILE',
        deleteProfile: 'user/DELETE_USER',
        createUserAvatar: 'user/CREATE_USER_AVATAR',
      }),
      async onSubmit() {
        await this.setUserData(this.userData);

        if (this.img) {
          await this.createUserAvatar(this.img);
        }
        this.editProfile();
      },
      deleteUser() {
        this.deleteProfile();
      },
      onFileChange(e) {
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
      createFormData(file) {
        let formData = new FormData();
        formData.append('avatar', file);
        this.img = formData;
      },
      createImage(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imgSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImage: function (e) {
        this.imgSrc = '';
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
.modal-inside {
  max-height: 90%;
  padding: 30px;
  overflow: auto;
}
.btn-file {
  position: relative;
  overflow: hidden;
  border: 1px solid #ccc;
}

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

#img-upload{
  width: 100%;
}

.remove-btn {
  margin-top: 20px;
}
</style>