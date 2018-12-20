<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </component>

    <transition name="fade" mode="out-in">
      <Modal v-if="modalStatus"/>
    </transition>
  </div>
</template>

<script>
  import Modal from './components/Modal/Modal';
  import {mapGetters} from 'vuex';

  export default {
    components: {Modal},
    computed: {
      ...mapGetters({
        modalStatus: 'modal/modalStatus'
      }),
      layout() {
        return (this.$route.meta.layout || 'main') + '-layout'
      },
    },
    data() {
      return {}
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

  .modal__content {
    margin-top: 30px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
