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
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .page-wrapper {
    background-color: #ebebeb;
  }

  .home {
    display: grid;
    grid-template-columns: 350px 1fr;
    width: 100%;
    min-height: 100vh;
  }

  .main {
    display: grid;
    height: 100vh;
    overflow-y: auto;

    background-color: #fff;
  }

  .modal-inside {
    max-height: 90%;
    padding: 30px;
    overflow: auto;
  }

  .modal__content {
    margin-top: 30px;
  }

  .mr10 {
    margin-right: 10px;
  }

  .info-message {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;

    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.7px;
    color: #07284c;
  }
  
  .info-message::before {
    content: '';
    display: block;
    width: 15px;
    height: 1px;
    margin-right: 15px;

    background-color: #07284c;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
