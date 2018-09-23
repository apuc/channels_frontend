<template>
  <main class="home container-fluid">
    <div class="row">
      <aside class="col-md-3 p-0 bg-light">
        <Nav/>
      </aside>

      <div class="col-md-6 p-0">
        <Group/>
      </div>

      <aside class="col-md-3 p-0 bg-light">
        <Advertisings/>
      </aside>
    </div>
  </main>
</template>

<script>
  import Nav from '../components/nav/Nav'
  import Chat from '../components/chat/Chat'
  import Group from '../components/group/Group';
  import Advertisings from '../components/ads/Advertisings';

  export default {
    data() {
      return {

      }
    },
    components: {
      Advertisings,
      Group,
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