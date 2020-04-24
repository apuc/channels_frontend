<template>
    <component :is="chooseChat"/>
</template>

<script>
    import {mapGetters} from "vuex";
    import NotAuthorizedChat from "../components/NotAuthorized/NotAuthorizedChat";
    import Chat from "../components/Chat/Chat";

    export default {
        name: "ChatLayout",
      
        components:{
          Chat,
          NotAuthorizedChat
        },
      
        computed:{
          ...mapGetters('auth', ['isAuthenticated']),
          
          chooseChat(){
             return this.isAuthenticated ? 'Chat' : 'NotAuthorizedChat'
          }
        }
      
    }
</script>

<style scoped>

</style>