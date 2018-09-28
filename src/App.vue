<template>
  <div id="app">
    <router-view></router-view>
    <profile-modal v-if="isModalOpened"></profile-modal>
    <group-modal v-if="isModalOpened"></group-modal>
  </div>
</template>

<script>
  import Home from "./views/Home";
  import Groups from "./views/Groups";
  import ProfileModal from './components/ProfileModal';
  import GroupModal from './components/GroupModal';

  export default {
    components: {
      GroupModal,
      ProfileModal,
      Home,
      Groups
    },
    computed: {
      isModalOpened() {
        return this.$store.getters['modal/isModalOpened'];
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
