<template>
  <div class="modal-inside">
    <header class="modal__header">
      <h4>Создать канал</h4>
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

      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "ModalChannelCreateEdit",
    props: {
      title: {
        type: String,
        default: ''
      },

    },
    computed: {
      ...mapGetters({
        currentModal: 'modal/currentModal',
        currentChannelData: 'channels/currentChannelData',
      }),
    },
  }
</script>

<style scoped>

</style>