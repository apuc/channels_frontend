<template>
  <div class="page-wrapper">
    <Header/>

    <div class="container home p-0"
         v-touch:swipe.right="$_sidebarSlide_showSidebar"
         v-touch:swipe.left="$_sidebarSlide_hideSidebar"
    >
      <transition name="slide" mode="out-in">
        <Nav v-if="sidebarVisible"/>
      </transition>

      <main class="main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  import Nav from '../components/Nav/Nav';
  import Advertisings from '../components/ads/Advertisings';
  import Header from "../components/Header/Header";
  import sideBarSlide from "../mixins/sideBarSlide";

  export default {
    name: "Authorized",
    components: {Header, Advertisings, Nav},
    mixins: [sideBarSlide],
  }
</script>

<style scoped>

</style>