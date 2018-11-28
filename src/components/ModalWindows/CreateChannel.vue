<template>
  <div class="modal-inside">
    <header class="modal__header">
      <h4>{{isEdit ? 'Редактировать' : 'Создать'}} канал</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="title">Channel name</label>

            <input type="text" id="title" class="form-control" v-model="settingChannelData.title">
          </div>

          <div class="form-group">
            <label for="slug">Channel slug</label>

            <input type="text" id="slug" class="form-control" v-model="settingChannelData.slug">
          </div>

          <div class="form-group">
            <label for="user_ids">Users (через запятую)</label>

            <input type="text" id="user_ids" class="form-control" :value="settingChannelData.user_ids"
                   @input="getUsers">
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <p>Channel status</p>

            <div class="form-check-inline">
              <label for="active" class="form-check-label">
                <input type="radio" id="active" class="form-check-input" value="active"
                       v-model="settingChannelData.status">
                <span>active</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="disable" class="form-check-label">
                <input type="radio" id="disable" class="form-check-input" value="disable"
                       v-model="settingChannelData.status">
                <span>disable</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <p>Channel type</p>

            <div class="form-check-inline">
              <label for="chat" class="form-check-label">
                <input type="radio" id="chat" class="form-check-input" value="chat" v-model="settingChannelData.type">
                <span>chat</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="wall" class="form-check-label">
                <input type="radio" id="wall" class="form-check-input" value="wall" v-model="settingChannelData.type">
                <span>wall</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="dialog" class="form-check-label">
                <input type="radio" id="dialog" class="form-check-input" value="dialog"
                       v-model="settingChannelData.type">
                <span>dialog</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <p>Privacy (0/1)</p>

            <div class="form-check-inline">
              <label for="private" class="form-check-label">
                <input type="radio" id="private" class="form-check-input" value="1"
                       v-model="settingChannelData.private">
                <span>1</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="not-private" class="form-check-label">
                <input type="radio" id="not-private" class="form-check-input" value="0"
                       v-model="settingChannelData.private">
                <span>0</span>
              </label>
            </div>
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

      <p v-if="notImage" style="text-align: center; color: red;"> {{ notImage }}</p>

      <button type="submit" class="btn btn-primary">{{isEdit ? 'Save' : 'Create'}}</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "CreateChannel",
    computed: {
      ...mapGetters({
        channelData: 'channels/channelData',
        userData: 'user/info',
        currentUserInfo: 'user/currentUserInfo',
        isEdit: 'modal/editMode',
        setCreateChannel: 'modal/setCreateChannel',
        imageUploadPersentage: 'channels/imageUploadPersentage',
      })
    },
    data() {
      return {
        settingChannelData: {
          channel_id: undefined,
          title: '',
          slug: '',
          status: '',
          user_ids: [],
          owner_id: '',
          type: '',
          private: '',
          avatar: '',
        },
        img: '',
        imgSrc: '',
        notImage: '',
        image: '',
        upLoadStarted: false,
      }
    },
    methods: {
      ...mapMutations({
        setChannelData: 'channels/SET_CHANNEL_DATA',
      }),
      ...mapActions({
        editChannel: 'channels/EDIT_CHANNEL',
        createChannel: 'channels/CREATE_CHANNEL',
        createChannelAvatar: 'channels/CREATE_CHANNEL_AVATAR',
      }),
      async onSubmit() {
        if (!Array.isArray(this.settingChannelData.user_ids)) {
          this.settingChannelData.user_ids = this.makeSplitedArray(this.settingChannelData.user_ids);
        }
        this.settingChannelData.user_ids.push(this.settingChannelData.owner_id);
        await this.setChannelData(this.settingChannelData);

        if (this.img) {
          this.upLoadStarted = true;
          await this.createChannelAvatar(this.img).then(() => this.upLoadStarted = false);
        }

        if (this.isEdit) {
          this.editChannel();
        } else {
          this.createChannel();
        }
      },
      getUsers(e) {
        this.settingChannelData.user_ids = this.makeSplitedArray(e.target.value);
      },
      makeSplitedArray(string) {
        return string.split(',')
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
    },
    created() {
      this.settingChannelData.owner_id = this.userData.user_id;
      if (this.isEdit) {
        this.settingChannelData.channel_id = this.channelData.channel_id;
        this.settingChannelData.title = this.channelData.title;
        this.settingChannelData.slug = this.channelData.slug;
        this.settingChannelData.status = this.channelData.status;
        this.settingChannelData.type = this.channelData.type;
        this.settingChannelData.private = this.channelData.private;
        this.settingChannelData.user_count = this.channelData.user_count;
        this.settingChannelData.owner_id = this.channelData.user_id;
        if (this.channelData.avatar) {
          this.imgSrc = this.channelData.avatar.average;
          this.settingChannelData.avatar = this.channelData.avatar.avatar_id;
        }
      }

      if (this.setCreateChannel.dialog) {
        if (this.userData.user_id === this.currentUserInfo.user_id) {
          this.settingChannelData.title = 'My own chat';
          this.settingChannelData.user_ids = this.userData.user_id;
        } else {
          this.settingChannelData.title = `${this.userData.username} and ${this.currentUserInfo.username} dialog`;
          this.settingChannelData.user_ids = `${this.userData.user_id},${this.currentUserInfo.user_id}`
        }
        this.settingChannelData.type = 'dialog';
        this.settingChannelData.private = 1;
        this.settingChannelData.status = 'active';

      }
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

  .modal-inside {
    max-height: 90%;
    padding: 30px;
    overflow: auto;
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

  progress::-webkit-progress-value {
    transition: width 0.5s ease;
  }
</style>