<template>
  <div>
    <header class="modal__header">
      <h4>Редактирование профиля</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
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

      <!--<div class="form-group">-->
        <!--<label for="file">Upload Image</label>-->

        <!--<div class="input-group">-->
            <!--<span class="input-group-btn">-->
                <!--<span class="btn btn-default btn-file">-->
                    <!--Browse… <input type="file" id="file" @change="onFileChange">-->
                <!--</span>-->
            <!--</span>-->

          <!--<input type="text" class="form-control" readonly>-->
        <!--</div>-->
        <!--<span v-if="notImage"> {{ notImage }}</span>-->
        <!--<img :src="imgSrc" id='img-upload' v-if="imgSrc"/>-->
        <!--<button class="btn btn-group remove-btn"-->
                <!--type="button"-->
                <!--@click="removeImage"-->
                <!--v-if="imgSrc">Remove img</button>-->
      <!--</div>-->

      <button type="submit" class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

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
          username: '',
          email: '',
          password: '',
          passwordRepeat: '',
        }
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('user/EDIT_PROFILE', this.userData)
      }
    },
    created() {
      this.userData.username = this.userInfo.username;
      this.userData.email = this.userInfo.email;
    }
  }
</script>

<style scoped>

</style>