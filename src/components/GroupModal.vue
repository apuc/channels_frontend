<template>
  <div class="profile">
    <div class="backdrop" @click="closeModal"></div>

    <div class="profile__container container">
      <button
        type="button"
        class="close"
        @click="closeModal"
      >Close</button>

      <div class="container__content">

      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import CustomInput from './form/CustomInput';

  export default {
    name: "GroupModal",
    comments: {
      CustomInput
    },
    computed: {
      // ...mapGetters({
      //   user: 'user/userProfileInfo'
      // }),
    },
    data() {
      return {

      }
    },
    methods: {
      closeModal() {
        this.$store.commit('modal/deleteModal');
        this.$router.go(-1);
      }
    },
  }
</script>

<style scoped>
  .profile {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    width: 100%;
    height: 100%;
  }

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    background-color: rgba(0,0,0, 0.4);
  }

  .container {
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

  .container__header {
    display: flex;
    align-items: center;
  }

  .portrait {
    width: 50px;
    height: 50px;
    margin-right: 20px;

    object-fit: cover;
    border-radius: 50%;
  }
</style>