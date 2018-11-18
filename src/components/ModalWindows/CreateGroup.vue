<template>
  <div class="modal-inside">
    <header class="modal__header">
      <h4>{{isEdit ? 'Редактировать' : 'Создать'}} группу</h4>
    </header>

    <form class="modal__content" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="title">Group name</label>

            <input type="text" id="title" class="form-control" v-model="settingGroupData.title">
          </div>

          <div class="form-group">
            <label for="slug">Group slug</label>

            <input type="text" id="slug" class="form-control" v-model="settingGroupData.slug">
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="user_ids">Users (через запятую)</label>

            <input type="text" id="user_ids" class="form-control" @input="getUsers">
          </div>

          <div class="form-group">
            <p>Group status</p>

            <div class="form-check-inline">
              <label for="active" class="form-check-label">
                <input type="radio" id="active" class="form-check-input" value="active" v-model="settingGroupData.status">
                <span>active</span>
              </label>
            </div>

            <div class="form-check-inline">
              <label for="disable" class="form-check-label">
                <input type="radio" id="disable" class="form-check-input" value="disable" v-model="settingGroupData.status">
                <span>disable</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="channels">Channels (разделённые запятой)</label>
        <input class="form-control" id="channels" type="text" @input="getChannels">
      </div>

      <div class="drop" @dragover.prevent @drop="onDrop">
        <div class="helper"></div>
        <label v-if="!imgSrc" class="button">
          SELECT OR DROP AN IMAGE
          <input type="file" name="image" @change="onChange">
        </label>
        <div class="hidden" v-else :class="{ 'image': true }">
          <img :src="imgSrc" alt="" class="img"/>

          <button class="button button_remove" @click="removeImage">REMOVE</button>
        </div>
      </div>

      <p v-if="notImage" style="text-align: center; color: red;"> {{ notImage }}</p>

      <button type="submit" class="btn btn-primary" v-if="isEdit">Save</button>
      <button type="submit" class="btn btn-primary" v-else>Create</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "CreateGroup",
    computed: {
      ...mapGetters({
        groupData: 'groups/groupData',
        isEdit: 'modal/editMode',
      })
    },
    data() {
      return {
        settingGroupData: {
          group_id: undefined,
          title: '',
          slug: '',
          status: '',
          user_ids: [],
          avatar: '',
        },
        groupChannels: [],
        img: '',
        imgSrc: '',
        notImage: '',
        formSubmited: false
      }
    },
    methods: {
      ...mapMutations({
        setGroupData: 'groups/SET_GROUP_DATA',
        setChannelsToAdd: 'groups/SET_CHANNELS_TO_ADD',
      }),
      ...mapActions({
        editGroup: 'groups/EDIT_GROUP',
        createGroup: 'groups/CREATE_GROUP',
        createGroupAvatar: 'groups/CREATE_GROUP_AVATAR',
      }),
      async onSubmit() {
        await this.setGroupData(this.settingGroupData);

        if (this.groupChannels.length > 0) {
          this.setChannelsToAdd(this.groupChannels);
        }

        if (this.img) {
          await this.createGroupAvatar(this.img);
        }

        if (this.isEdit) {
          this.editGroup();
        } else {
          this.createGroup()
        }
      },
      makeSplitedArray(string) {
        return string.split(',')
      },
      getUsers(e) {
        this.settingGroupData.user_ids = this.makeSplitedArray(e.target.value);
      },
      getChannels(e) {
        this.groupChannels = this.makeSplitedArray(e.target.value);
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
      if (this.isEdit) {
        this.settingGroupData.group_id = this.groupData.group_id;
        this.settingGroupData.title = this.groupData.title;
        this.settingGroupData.slug = this.groupData.slug;
        this.settingGroupData.status = this.groupData.status;
        if (this.groupData.avatar) {
          this.imgSrc = this.groupData.avatar.average;
          this.settingGroupData.avatar = this.groupData.avatar.avatar_id;
        }
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
    height: 300px;
    width: 100%;
  }

  .hidden.image {
    display: flex;
  }

  .img {
    width: auto;
    height: 100%;
  }

  .drop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
    height: 100%;
    max-height: 400px;
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