<template>
  <div class="d-flex flex-column align-items-center">
    <router-link to="/chat">Chat</router-link>
    <router-link to="/auth/login">Authorization</router-link>
    <router-link to="/auth/registration">Registration</router-link>
  </div>
</template>

<script>
  export default {
    name: "Links"
  }
</script>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 24px;
  }

  a {
    padding: 30px;
  }
</style>