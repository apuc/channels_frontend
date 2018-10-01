<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Home from "./views/Home";
  import Groups from "./views/Groups";

  export default {
    components: {
      Home,
      Groups
    },
    computed: {
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
