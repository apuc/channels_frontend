<template>
  <div class="bots">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "Bots",
    methods: {
      ...mapMutations({
        SET_MODAL: "modal/SET_MODAL"
      }),
      setAddBotToUserModal() {
        this.SET_MODAL({name: "ModalAddBotToUser"});
      },
    },
  }
</script>

<style scoped lang="scss">
  .bots {
    width: 100%;
    max-width: 100vw;
    padding: 30px;
    position: relative;
    text-align: center;
    border-left: solid 1px rgba(0,0,0,0.11);
    @media(max-width: 768px){
      border-left: none;
    }
   
  }
  
</style>