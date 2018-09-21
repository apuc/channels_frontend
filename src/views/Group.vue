<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-md-3 p-0 bg-light">
        <Nav />
      </div>

      <div class="col-md-6 p-0">
        <Chat />
      </div>

      <div class="col-md-3 p-0 bg-light"></div>
    </div>
  </div>
</template>

<script>
  import Nav from '../components/Nav'
  import Chat from '../components/Chat'
  export default {
    props: {

    },
    data() {
      return {

      }
    },
    components: {
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