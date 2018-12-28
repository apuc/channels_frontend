<template>
  <div class="my-modal" @keyup.esc="onModalClose">
    <div class="backdrop" @click="onModalClose"></div>

    <div class="modal__container ">
      <button type="button" class="close" @click="onModalClose">
        <v-icon scale="1.5" class="icon text-danger" name="times-circle"/>
      </button>

      <div class="modal_wrap">
        <component :is="currentModal"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import ModalGroupCreate from './ModalGroupCreate';
  import ModalGroupEdit from './ModalGroupEdit';
  import ModalChannelCreate from './ModalChannelCreate';
  import ModalChannelEdit from './ModalChannelEdit';
  import ModalGroupDelete from './ModalGroupDelete';
  import ModalChannelDelete from './ModalChannelDelete';
  import ModalEditProfile from './ModalProfileEdit';
  import ModalChannelUsers from "./ModalChannelUsers";
  import ModalGroupAddChannels from "./ModalGroupAddChannels";
  import ModalSessionExpired from "./ModalSessionExpired";
  import ModalChannelAddUsers from "./ModalChannelAddUsers";

  export default {
    name: "Modal",
    components: {
      ModalSessionExpired,
      ModalChannelUsers,
      ModalChannelCreate,
      ModalChannelEdit,
      ModalChannelDelete,
      ModalEditProfile,
      ModalGroupAddChannels,
      ModalGroupCreate,
      ModalGroupEdit,
      ModalGroupDelete,
      ModalChannelAddUsers,
    },
    computed: {
      ...mapGetters({
        currentModal: 'modal/currentModal',
      }),
    },
    data() {
      return {
      }
    },
    methods: {
      ...mapMutations({
        deleteModal: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        logout: 'auth/LOGOUT'
      }),
      onModalClose() {
        this.deleteModal();
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
    min-height: 300px;

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