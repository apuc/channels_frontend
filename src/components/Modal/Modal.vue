<template>
  <div class="my-modal" @keyup.esc="DELETE_MODAL">
    <div class="backdrop" @click="DELETE_MODAL"></div>

    <div class="modal__container ">
      <button type="button"
              class="close"
              @click="DELETE_MODAL"
      >
        <img src="../../assets/img/error.svg" 
             alt=""
             width="25"
             height="25"
        >
      </button>

      <div class="modal__wrap">
        <component :is="currentModal.name" :payload="currentModal"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
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
  import ModalAttachmentImage from "./ModalAttachmentImage";
  import ModalCreateIntegration from "./ModalCreateIntegration";
  import ModalAddIntegrationToChannel from "./ModalAddIntegrationToChannel";
  import ModalChannelIntegrations from "./ModalChannelIntegrations";

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
      ModalAttachmentImage,
      ModalCreateIntegration,
      ModalAddIntegrationToChannel,
      ModalChannelIntegrations,  
    },
    computed: {
      ...mapGetters({
        currentModal: 'modal/currentModal',
      }),
    },
    methods: {
      ...mapMutations({
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),
    },
  }
</script>

<style scoped lang="scss">
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
    border-radius: 5px;
  }

  .modal__wrap {
    min-width: 500px;
    max-height: 90vh;
    overflow: auto;
  }

  .close {
    position: absolute;
    z-index: 1;
    top: -10px;
    right: -10px;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    font-size: 0;
    line-height: 0;

    background-color: rgba(255, 255, 255, 0.51);
    border-radius: 50%;
    opacity: 1;
    cursor: pointer;
  }
  
  @media (max-width: 576px) {
    .modal__wrap {
      width: 95vw;
    }
  }
</style>