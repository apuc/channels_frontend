<template>
  <main class="home container-fluid">
    <div class="row">
        <Nav/>
        <Chat/>
        <Advertisings/>
    </div>
  </main>
</template>

<script>
  import Nav from '../components/nav/Nav'
  import Chat from '../components/chat/Chat'
  import Advertisings from '../components/ads/Advertisings';

  export default {
    data() {
      return {

      }
    },
    components: {
      Advertisings,
      Nav,
      Chat
    },

  }
</script>

<style scoped>
  .home {
    overflow: hidden;
    min-height: 600px;
    height: 100vh;
  }
  .row {
    height: 100%;
  }
</style>