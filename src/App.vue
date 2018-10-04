<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>

    <Modal v-if="modalActive"/>
  </div>
</template>

<script>

  import Modal from './components/ModalWindows/Modal';
  export default {
    components: {Modal},
    computed: {
      layout() {
        return (this.$route.meta.layout || 'main') + '-layout'
      },
      modalActive() {
        return this.$store.getters.modalActive
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
