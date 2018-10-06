<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>

    <Modal v-if="setModal"/>
  </div>
</template>

<script>
  import Modal from './components/ModalWindows/Modal';
  import {mapGetters} from 'vuex';

  export default {
    components: {Modal},
    computed: {
      ...mapGetters({
        setModal: 'modal/setModal'
      }),
      layout() {
        return (this.$route.meta.layout || 'main') + '-layout'
      },
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
