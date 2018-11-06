<template>
  <div class="my-modal">
    <div class="backdrop" @click="onModalClose"></div>

    <div class="modal__container ">
      <button type="button" class="close" @click="onModalClose">
        <v-icon scale="1.5" class="icon text-danger" name="times-circle"/>
      </button>

      <div class="modal_wrap">
        <ProfileModal v-if="userProfile" />
        <CreateGroup v-else-if="createGroup"/>
        <CreateChannel v-else-if="createChannel"/>
        <DeleteChannelOrGroup v-else-if="deleteChannelOrGroup"/>
        <EditProfile v-else-if="editProfile"/>
        <ChannelUsers v-else-if="channelUsers"/>
        <AddChannelsToGroup v-else-if="addChannelsToGroup"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import ProfileModal from './ProfileModal';
  import CreateGroup from './CreateGroup';
  import CreateChannel from './CreateChannel';
  import DeleteChannelOrGroup from './DeleteChannelOrGroup';
  import EditProfile from './EditProfile';
  import ChannelUsers from "./ChannelUsers";
  import AddChannelsToGroup from "./AddChannelsToGroup";

  export default {
    name: "Modal",
    components: {
      AddChannelsToGroup,
      ChannelUsers,
      DeleteChannelOrGroup,
      ProfileModal,
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
        channelUsers: 'modal/channelUsers',
        addChannelsToGroup: 'modal/addChannelsToGroup',
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
        } else {
          this.$router.go(-1)
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

    background-color: #fff;
  }

  .modal_wrap {
    width: 500px;
    max-height: 90vh;
    padding: 30px;

    overflow: auto;
  }

  .close {
    position: absolute;
    top: -14px;
    right: -13px;

    font-size: 0;

    background-color: #fff;
    border: 1px solid #dc3545;
    border-radius: 50%;
    opacity: 1;
    cursor: pointer;
  }
</style>