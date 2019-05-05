<template>
  <aside class="nav d-flex flex-column p-3">
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