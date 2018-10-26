<template>
  <div class="my-modal">
    <div class="backdrop" @click="onModalClose"></div>

    <div class="modal__container ">
      <button type="button" class="close" @click="onModalClose">Close</button>

      <ProfileModal v-if="userProfile" />
      <CreateGroup v-else-if="createGroup"/>
      <CreateChannel v-else-if="createChannel"/>
      <DeleteChannelOrGroup v-else-if="deleteChannelOrGroup"/>
    </div>
  </div>
</template>

<script>
  import ProfileModal from './ProfileModal';
  import CreateGroup from './CreateGroup';
  import CreateChannel from './CreateChannel';
  import {mapGetters} from 'vuex';
  import DeleteChannelOrGroup from './DeleteChannelOrGroup';

  export default {
    name: "Modal",
    components: {
      DeleteChannelOrGroup,
      ProfileModal,
      CreateGroup,
      CreateChannel
    },
    computed: {
      ...mapGetters({
        createGroup: 'modal/setCreateGroup',
        createChannel: 'modal/setCreateChannel',
        userProfile: 'modal/setUserProfile',
        editMode: 'modal/editMode',
        currentModal: 'modal/currentModal',
        deleteChannelOrGroup: 'modal/deleteChannelOrGroup',
      }),
    },
    data() {
      return {
      }
    },
    methods: {
      onModalClose() {
        this.$store.commit('modal/deleteCurrentUserInfo', {});
        this.$store.commit('modal/deleteModal', this.currentModal);

        this.editMode ?
          this.$store.commit('modal/toggleEditMode')
        :
          this.$router.go(-1)
      }
    }
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
    padding: 30px;

    background-color: #fff;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;

    cursor: pointer;
  }
</style>