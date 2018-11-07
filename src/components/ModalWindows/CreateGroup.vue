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
        img: '',
        imgSrc: '',
        notImage: '',
        controls: [],
        formSubmited: false
      }
    },
    methods: {
      ...mapMutations({
        setGroupData: 'groups/SET_GROUP_DATA',
      }),
      ...mapActions({
        editGroup: 'groups/EDIT_GROUP',
        createGroup: 'groups/CREATE_GROUP',
        createGroupAvatar: 'groups/CREATE_GROUP_AVATAR',
      }),
      async onSubmit() {
        await this.setGroupData(this.settingGroupData);

        if (this.img) {
          await this.createGroupAvatar(this.img);
        }

        if (this.isEdit) {
          this.editGroup();
        } else {
          this.createGroup();
        }
      },
      getUsers(e) {
        this.settingGroupData.user_ids = e.target.value.split(',');
      },
      onFileChange(e) {
        this.imgSrc = '';
        const files = e.target.files || e.dataTransfer.files;
        this.img = files[0];
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

  .modal-inside {
    max-height: 90%;
    padding: 30px;
    overflow: auto;
  }
</style>