<template>
  <div class="my-modal">
    <div class="backdrop" @click="onModalClose"></div>

    <div class="modal__container ">
      <button type="button" class="close" @click="onModalClose">Close</button>

      <CreateGroup v-if="createGroup"/>
      <CreateChannel v-else-if="createChannel.status"/>
      <DeleteChannelOrGroup v-else-if="deleteChannelOrGroup"/>
      <EditProfile v-else-if="editProfile"/>
      <ChannelUsers v-else-if="channelUsers"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import CreateGroup from './CreateGroup';
  import CreateChannel from './CreateChannel';
  import DeleteChannelOrGroup from './DeleteChannelOrGroup';
  import EditProfile from './EditProfile';
  import ChannelUsers from "./ChannelUsers";

  export default {
    name: "Modal",
    components: {
      ChannelUsers,
      DeleteChannelOrGroup,
      CreateGroup,
      CreateChannel,
      EditProfile,
    },
    computed: {
      ...mapGetters({
        createGroup: 'modal/setCreateGroup',
        createChannel: 'modal/setCreateChannel',
        userProfile: 'modal/setUserProfile',
        editMode: 'modal/editMode',
        currentModal: 'modal/currentModal',
        deleteChannelOrGroup: 'modal/deleteChannelOrGroup',
        editProfile: 'modal/setEditProfile',
        channelUsers: 'modal/channelUsers'
      }),
    },
    data() {
      return {
      }
    },
    methods: {
      ...mapMutations({
        toggleEditMode: 'modal/TOGGLE_EDIT_MODE',
        deleteModal: 'modal/DELETE_MODAL',
      }),
      onModalClose() {
        if (this.editMode) {
          this.toggleEditMode();
        }

        this.deleteModal(this.currentModal);
      }
    },
  }
</script>

<style scoped>
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.4);
  }

  .my-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    width: 100%;
    height: 100%;

    direction: ltr;
    text-align: left;
  }

  .modal__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;

    overflow: auto;
    width: 500px;
    min-height: 300px;
    max-height: 90vh;

    background-color: #fff;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;

    cursor: pointer;
  }
</style>