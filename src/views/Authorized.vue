<template>
  <div class="home">
    <Nav/>

    <main class="main">
      <!--<slot/>-->
      <router-view></router-view>
    </main>

    <Advertisings/>
  </div>
</template>

<script>
  import Nav from '../components/nav/Nav';
  import Advertisings from '../components/ads/Advertisings';

  export default {
    name: "Authorized",
    components: {Advertisings, Nav},
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

  .main {
    flex-grow: 1;
    height: 100%;
  }
</style>