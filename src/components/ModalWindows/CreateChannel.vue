<template>
  <div>
    <header class="modal__header">
      <h4>Создать канал</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="title">Channel name</label>

            <input type="text" id="title" class="form-control" v-model="channelCreateData.title">
          </div>

          <div class="form-group">
            <label for="slug">Channel slug</label>

            <input type="text" id="slug" class="form-control" v-model="channelCreateData.slug">
          </div>

          <div class="form-group">
            <label for="user_ids">Users (через запятую)</label>

            <input type="text" id="user_ids" class="form-control" @input="getUsers">
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <p>Channel status</p>

            <div class="form-check-inline">
              <label for="active" class="form-check-label">
                <input type="radio" id="active" class="form-check-input" value="active" v-model="channelCreateData.status">
                <span>active</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="disable" class="form-check-label">
                <input type="radio" id="disable" class="form-check-input" value="disable" v-model="channelCreateData.status">
                <span>disable</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <p>Channel type</p>

            <div class="form-check-inline">
              <label for="chat" class="form-check-label">
                <input type="radio" id="chat" class="form-check-input" value="chat" v-model="channelCreateData.type">
                <span>chat</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="wall" class="form-check-label">
                <input type="radio" id="wall" class="form-check-input" value="wall" v-model="channelCreateData.type">
                <span>wall</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="dialog" class="form-check-label">
                <input type="radio" id="dialog" class="form-check-input" value="dialog" v-model="channelCreateData.type">
                <span>dialog</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <p>Privacy (0/1)</p>

            <div class="form-check-inline">
              <label for="private" class="form-check-label">
                <input type="radio" id="private" class="form-check-input" value="1" v-model="channelCreateData.private">
                <span>1</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="not-private" class="form-check-label">
                <input type="radio" id="not-private" class="form-check-input" value="0" v-model="channelCreateData.private">
                <span>0</span>
              </label>
            </div>
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


      <button type="submit" class="btn btn-primary" v-if="isEdit">Edit</button>
      <button type="submit" class="btn btn-primary" v-else>Create</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "CreateChannel",
    computed: {
      ...mapGetters({
        channelInfo: 'channels/channelInfo',
        isEdit: 'modal/editMode',
      })
    },
    data() {
      return {
        channelCreateData: {
          title: '',
          slug: '',
          status: '',
          user_ids: [],
          type: '',
          private: '',
          avatar: '',
        },
        img: {},
        imgSrc: '',
        notImage: '',
        controls: [],
      }
    },
    methods: {
      async onSubmit() {
        this.$store.commit('channels/SET_CHANNEL_DATA', this.channelCreateData);
        if (this.img) {
          await this.$store.dispatch('channels/CREATE_CHANNEL_AVATAR', this.img);
        }
        if (this.isEdit) {
          this.$store.dispatch('channels/EDIT_CHANNEL', this.channelCreateData);
        } else {
          this.$store.dispatch('channels/CREATE_CHANNEL');
        }
      },
      getUsers(e) {
        this.channelCreateData.user_ids = e.target.value.split(',');
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
      this.channelCreateData.title = this.channelInfo.title;
      this.channelCreateData.slug = this.channelInfo.slug;
      this.channelCreateData.status = this.channelInfo.status;
      this.channelCreateData.type = this.channelInfo.type;
      this.channelCreateData.private = this.channelInfo.private;
      this.imgSrc = this.channelInfo.avatar.average;
    }
  }
</script>

<style scoped>
  .modal__header {
    display: flex;
    align-items: center;
  }

  textarea {
    resize: none;
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