<template>
  <div class="bots">
    <header>
      <p>Ваши боты</p>
    </header>

    <router-view></router-view>
    <button class="btn btn-primary mr-2" @click="setAddBotToUserModal">
      Добавить бота
    </button>
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
    padding: 30px;
    position: relative;
    width: 100%;
    //max-width не удалять, т.к. без неё начинает глючить разметка при слишком длинном имени бота
    max-width: 100%;
    overflow-x: hidden;
    text-align: center;
    border-left: solid 1px rgba(0,0,0,0.11);
    @media(max-width: 768px){
      border-left: none;
    }
    header{
      p{
        font-size: 24px;
        text-align: center;
      }
    }
    button{
      margin-top: 10px;
    }

  }
  
</style>