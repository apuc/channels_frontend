<template>
  <aside class="nav d-flex flex-column col-md-2 p-3 bg-light">
    <transition name="fade" mode="out-in">
      <component :is="`NotAuthorized${currentComponent}`" v-on:switch="switchBetweenLoginAndReg"></component>
    </transition>
  </aside>
</template>

<script>
  import NotAuthorizedRegistration from './NotAuthorizedRegistration';
  import NotAuthorizedLogin from './NotAuthorizedLogin';

  export default {
    name: "NotAuthorizedSidebar",
    components: {NotAuthorizedRegistration, NotAuthorizedLogin},
    data() {
      return {
        currentComponent: 'Login'
      }
    },
    methods: {
      switchBetweenLoginAndReg(value) {
        this.currentComponent = value;
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>