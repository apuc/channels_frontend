<template>
  <div class="home">
    <Nav/>

    <main class="main">
      <router-view></router-view>
    </main>

    <Advertisings/>
  </div>
</template>

<script>
  import Nav from '../components/Nav/Nav';
  import Advertisings from '../components/ads/Advertisings';

  export default {
    name: "Authorized",
    components: {Advertisings, Nav},
  }
</script>

<style scoped>
  .home {
    display: grid;
    grid-template-columns: 16.7% auto 16.7%;
    width: 100%;
    min-height: 100vh;
  }

  .main {
    display: grid;
    height: 100vh;
    overflow-y: auto;
  }
</style>