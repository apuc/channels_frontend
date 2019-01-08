<template>
  <div class="modal-inside">
    <header class="modal__header">
      <h4>Редактировать канал</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="title">Channel name</label>
            
            <input
              type="text"
              id="title"
              class="form-control"
              :value="channelData.title"
              @input="setChannelTitle($event.target.value)"
            >
          </div>

          <div class="form-group">
            <label for="slug">Channel slug</label>
            
            <input
              type="text"
              id="slug"
              class="form-control"
              :value="channelData.slug"
              @input="setChannelSlug($event.target.value)"
            >
          </div>

          <div class="form-group">
            <button
              type="button"
              class="btn btn-primary"
              @click="setModal('ModalChannelAddUsers')"
            >Add users</button>
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <p>Channel status</p>

            <div class="form-check-inline">
              <label for="active" class="form-check-label">
                <input
                  type="radio"
                  id="active"
                  class="form-check-input"
                  value="active"
                  name="channel-status"
                  v-model="channelData.status"
                  @input="setChannelStatus($event.target.value)"
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
                  name="channel-status"
                  v-model="channelData.status"
                  @input="setChannelStatus($event.target.value)"
                >
                <span>disable</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <p>Channel type</p>

            <div class="form-check-inline">
              <label for="chat" class="form-check-label">
                <input
                  type="radio"
                  id="chat"
                  class="form-check-input"
                  value="chat"
                  name="channel-type"
                  v-model="channelData.type"
                  @input="setChannelType($event.target.value)"
                >
                <span>chat</span>
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
                  @input="setChannelType($event.target.value)"
                >
                <span>wall</span>
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
                  @input="setChannelType($event.target.value)"
                >
                <span>dialog</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <p>Privacy (0/1)</p>

            <div class="form-check-inline">
              <label for="private" class="form-check-label">
                <input
                  type="radio"
                  id="private"
                  class="form-check-input"
                  value="1"
                  name="channel-privacy"
                  v-model="channelData.private"
                  @input="setChannelPrivate($event.target.value)"
                >
                <span>1</span>
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
                  @input="setChannelPrivate($event.target.value)"
                >
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
          <img :src="imgSrc" alt class="img">
          
          <button class="button button_remove" type="button" @click="removeImage">REMOVE</button>
        </div>
      </div>

      <div>
        <progress v-if="upLoadStarted" max="100" :value="imageUploadPersentage"></progress>
      </div>

      <p v-if="notImage" style="text-align: center; color: red;">{{ notImage }}</p>

      <button type="submit" class="btn btn-primary">Сохранить</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import vSelect from "vue-select";

export default {
  name: "ModalChannelEdit",
  components: { vSelect },
  computed: {
    ...mapGetters({
      channelData: "channels/channelData",
      userData: "user/userData",
      userContacts: "user/userContacts",
      currentUserInfo: "user/currentUserInfo",
      setCreateChannel: "modal/setCreateChannel",
      imageUploadPersentage: "channels/imageUploadPersentage",
      contactsToAdd: "channels/contactsToAdd"
    })
  },
  data() {
    return {
      img: "",
      imgSrc: "",
      notImage: "",
      image: "",
      upLoadStarted: false
    };
  },
  methods: {
    ...mapMutations({
      setChannelData: "channels/SET_CHANNEL_DATA",
      setChannelTitle: "channels/SET_CHANNEL_TITLE",
      setChannelSlug: "channels/SET_CHANNEL_SLUG",
      setChannelStatus: "channels/SET_CHANNEL_STATUS",
      setChannelUserIds: "channels/SET_CHANNEL_USER_IDS",
      setChannelOwnerId: "channels/SET_CHANNEL_OWNER_ID",
      setChannelType: "channels/SET_CHANNEL_TYPE",
      setChannelPrivate: "channels/SET_CHANNEL_PRIVATE",
      setChannelIdToEdit: "channels/SET_CHANNEL_ID_TO_EDIT",
      setChannelUsers: "channels/SET_CHANNEL_USERS",
      setModal: "modal/SET_MODAL"
    }),
    ...mapActions({
      editChannel: "channels/EDIT_CHANNEL",
      createChannelAvatar: "channels/CREATE_CHANNEL_AVATAR"
    }),
    async onSubmit() {
      let usersToAdd = this.contactsToAdd;
      const owner_id = this.userData.user_id;
      this.setChannelUserIds(usersToAdd.push(owner_id));
      this.setChannelOwnerId(owner_id);

      if (this.img) {
        this.upLoadStarted = true;
        await this.createChannelAvatar(this.img).then(
          () => (this.upLoadStarted = false)
        );
      }

      this.editChannel();
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
        this.notImage = "Choose image please";
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
  created() {
    if (this.channelData.avatar) {
      this.imgSrc = this.channelData.avatar.average;
    }
  },
  beforeDestroy() {
    this.setChannelUsers([]);
    this.setChannelData({
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
  }
};
</script>

<style scoped>
.modal__header {
  display: flex;
  align-items: center;
}

.btn-file input[type="file"] {
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

progress::-webkit-progress-value {
  transition: width 0.5s ease;
}
</style>