<template>
  <div class="page-wrapper">
    <Header v-model="this.sidebarIsOpened"/>
    <div class="container home p-0"
         v-touch:swipe.right="swipeSidebar"
         v-touch:swipe.left="swipeSidebar"
    >
      <transition name="slide" mode="out-in">
        <Nav v-if="this.sidebarIsOpened"/>
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
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "Authorized",
    components: {Header, Advertisings, Nav},
    created() {
      window.addEventListener("resize", this.resizeHandler);
    },
    destroyed() {
      window.removeEventListener("resize", this.resizeHandler);
    },
    computed: {
      ...mapGetters('nav', ['sidebarIsOpened']),
      ...mapGetters('common', ['deviceIsMobile']),
    },
    methods: {
      ...mapMutations({
        OPEN_SIDEBAR: 'nav/OPEN_SIDEBAR',
        CLOSE_SIDEBAR: 'nav/CLOSE_SIDEBAR',
      }),
      resizeHandler() { 
        if(window.innerWidth >= 768 && !this.sidebarIsOpened) {
          this.OPEN_SIDEBAR();
        }
      },
      swipeSidebar() {
        if(!this.deviceIsMobile) {
          return;
        }
        if(this.sidebarIsOpened) {
            this.CLOSE_SIDEBAR();
        } else {
            this.OPEN_SIDEBAR();
        }
      },
    }
  }
</script>

<style scoped>

</style>