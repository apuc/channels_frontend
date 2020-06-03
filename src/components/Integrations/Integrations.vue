<template>
  <div class="integrations">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "Integrations",
    methods: {
      ...mapMutations({
        SET_MODAL: "modal/SET_MODAL"
      }),
      setAddIntegrationToUserModal() {
        this.SET_MODAL({name: "ModalAddIntegrationToUser"});
      },
    },
  }
</script>

<style scoped lang="scss">
  .integrations {
    width: 100%;
    max-width: 100vw;
    padding: 30px;
    position: relative;
    border-left: solid 1px rgba(0,0,0,0.11);
    @media(max-width: 768px){
      border-left: none;
    }
   
  }
  
</style>