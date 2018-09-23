<template>
  <div id="app">
    <router-view></router-view>
    <profile-modal v-if="userProfile"></profile-modal>
  </div>
</template>

<script>
  import Home from "./views/Home";
  import Groups from "./views/Groups";
  import ProfileModal from './components/ProfileModal';

  export default {
    components: {
      ProfileModal,
      Home,
      Groups
    },
    computed: {
      userProfile() {
        return this.$store.getters.userProfile;
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
