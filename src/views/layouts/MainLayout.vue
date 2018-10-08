<template>
  <div class="home">
    <Nav />
    <main>
      <slot />
    </main>
    <Advertisings />
  </div>
</template>

<script>
  import Nav from '../../components/nav/Nav'
  import Advertisings from '../../components/ads/Advertisings';

  export default {
    data() {
      return {}
    },
    components: {
      Advertisings,
      Nav
    },
    beforeMount() {
      const token = this.$store.getters.token;
      this.$store.dispatch('auth/GET_USER', token);
    }
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

  main {
    height: 100%;
    flex-grow: 1;
  }
</style>