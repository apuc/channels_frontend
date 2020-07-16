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
  
  const ModalGroupCreate = () => import('./ModalGroupCreate');
  const ModalGroupEdit = () => import('./ModalGroupEdit');
  const ModalChannelCreate = () => import('./ModalChannelCreate');
  const ModalChannelEdit = () => import('./ModalChannelEdit');
  const ModalGroupDelete = () => import('./ModalGroupDelete');
  const ModalChannelDelete = () => import('./ModalChannelDelete');
  const ModalEditProfile = () => import('./ModalProfileEdit');
  const ModalChannelUsers = () => import('./ModalChannelUsers');
  const ModalGroupAddChannels = () => import('./ModalGroupAddChannels');
  const ModalSessionExpired = () => import('./ModalSessionExpired');
  const ModalChannelAddUsers = () => import('./ModalChannelAddUsers');
  const ModalAddBotToChannel = () => import('./ModalAddBotToChannel');
  const ModalAttachmentImage = () => import('./ModalAttachmentImage');
  const ModalCreateIntegration = () => import('./ModalCreateIntegration');
  const ModalAddIntegrationToChannel = () => import('./ModalAddIntegrationToChannel'); 
  const ModalChannelIntegrations = () => import('./ModalChannelIntegrations');
  const ModalBotDelete = () => import('./ModalBotDelete');
  const ModalResendMessages = () => import('./ModalResendMessages');
  const ModalMeetings = () => import('./ModalMeetings');
  
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
      ModalAddBotToChannel,
      ModalBotDelete,
      ModalResendMessages,
      ModalMeetings,
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
    max-width: 95vh;
    max-height: 95vh;
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
      width: 85vw;
      min-width: initial;
    }
    .modal__container {
      border-radius: 12px;
    }
    .close {
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
    }
  }
  @media screen and (max-width:400px) {
    .modal__container {
      margin-top: 10%;
    }
  }
</style>