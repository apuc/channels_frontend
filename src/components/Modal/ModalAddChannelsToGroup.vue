<template>
  <div class="modal-inside">
    <form @submit.prevent="addChannels" class="form-group">
      <label for="ids"></label>
      <input class="form-control" id="ids" type="text" v-model="channel_ids">
      <button type="submit" class="btn btn-primary">Add</button>
    </form>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';
  export default {
    name: "ModalAddChannelsToGroup",
    data() {
      return {
        channel_ids: []
      }
    },
    methods: {
      ...mapActions({
        addChannelsToGroup: 'groups/ADD_CHANNELS',
      }),
      addChannels() {
        const channel_ids = this.channel_ids.split(',');
        this.addChannelsToGroup(channel_ids);
      }
    },
  }
</script>

<style scoped>
  form {
    display: flex;
    align-items: center;
  }

  .form-control {
    margin-right: 15px;
  }

  .modal-inside {
    max-height: 90%;
    padding: 30px;
    overflow: auto;
  }
</style>