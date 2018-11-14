<template>
  <div>
    <h2>You session expired.</h2>
    <p><button type="button" @click="exit">Log in</button> again please.</p>
  </div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: "SessionExpired",
    methods: {
      ...mapMutations({
        closeModal: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        logout: 'auth/LOGOUT',
      }),
      exit() {
        this.logout();
        this.closeModal();
      }
    }
  }
</script>

<style scoped>
  button {
    padding: 0;

    color: #268bd2;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.7;
  }
</style>