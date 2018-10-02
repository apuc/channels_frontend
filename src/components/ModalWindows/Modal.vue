<template>
  <div class="my-modal">
    <div class="backdrop" @click="onModalClose"></div>

    <div class="modal__container">
      <button type="button" class="close">Close</button>

      <ProfileModal v-if="modalType === 'userProfile'" :user="user" />
    </div>
  </div>
</template>

<script>
  import ProfileModal from './ProfileModal';
  export default {
    name: "Modal",
    components: {ProfileModal},
    props: {
      modalType: String,
      user: {
        name: String,
        avatar: String,
        slug: String,
        id: String
      },
    },
    data() {
      return {
      }
    },
    methods: {
      onModalClose() {
        this.$router.go(-1);
        this.$emit('onModalClose', false);
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
  }

  .modal__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;

    width: 500px;
    height: 300px;
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