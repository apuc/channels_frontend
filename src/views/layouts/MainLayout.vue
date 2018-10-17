<template>
  <div class="home">
    <Nav />
    <main>
      <slot />
    </main>
    <Advertisings />
  </div>
</template>

<script>
  import Nav from '../../components/nav/Nav'
  import Advertisings from '../../components/ads/Advertisings';
  import socket from 'socket.io-client';

  export default {
    data() {
      return {
          io: null
      }
    },
    components: {
      Advertisings,
      Nav
    },
    beforeMount() {
      if (!this.$store.getters['user/info']) { // Если пользователь залогиненый (при перезагрузке страницы)
        this.$store.dispatch('user/GET_USER');
      }
      this.io = socket(process.env.VUE_APP_SOCKET_URL, {query: {token: this.$store.getters['auth/token']}});
      this.io.emit('connected', {});
    }
  }
</script>


<style scoped>
  .home {
    display: flex;
    width: 100%;
    overflow: hidden;
    min-height: 600px;
    height: 100vh;
  }

  main {
    height: 100%;
    flex-grow: 1;
  }
</style>