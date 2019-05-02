<template>
  <div class="page-wrapper">
    <Header/>

    <div class="container home">
      <Nav/>

      <main class="main">
        <router-view></router-view>
      </main>
      <!--<Advertisings/>-->
    </div>
  </div>
</template>

<script>
  import Nav from '../components/Nav/Nav';
  import Advertisings from '../components/ads/Advertisings';
  import Header from "../components/Header/Header";

  export default {
    name: "Authorized",
    components: {Header, Advertisings, Nav},
  }
</script>

<style scoped>

</style>