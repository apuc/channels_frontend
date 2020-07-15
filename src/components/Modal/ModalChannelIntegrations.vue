<template>
  <div class="modal-inside">
    <header class="modal__header">
      <h4 style="margin: 0" class="modal__title">Интеграции канала</h4>
    </header>

    <b-button v-if="currentChannelData.owner_id === userData.user_id"
      @click="SET_MODAL({name:'ModalAddIntegrationToChannel'})"
      class="mt-3" 
      variant="primary" 
      size="sm"
    >
      Добавить интеграцию
    </b-button>
    
    <table>
      <tr>
        <th>Название</th>
        <th>Тип</th>
        <th></th>
      </tr>
      
       <tr v-for="integration in channelIntegrations">
         <td>{{integration.name}}</td>
         <td>{{integration.type.title}}</td>
         <td>
           <img v-if="currentChannelData.owner_id === userData.user_id"
             src="../../assets/img/bin.png" 
             @click="detachIntegration(integration.id)"
             v-b-tooltip.hover.top="'Удалить интеграцию из канала'"
           >
         </td>
       </tr>
    </table>
    
  </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from "vuex";
    import { BButton } from 'bootstrap-vue';
    import AvatarUploader from "../Controls/AvatarUploader";
    import vSelect from "vue-select";

    export default {
        name: "ModalChannelIntegrations",

        components: {vSelect, BButton},

        computed: {
           ...mapGetters('channels',['channelIntegrations','currentChannelData']),
          ...mapGetters({
            userData: 'user/userData',
          }),
        },

        data() {
            return {
                
            };
        },

        

        methods: {
            ...mapActions('integrations',['CHANNEL_DELETE_INTEGRATION']),
            ...mapMutations({
                SET_MODAL: 'modal/SET_MODAL',
            }),
            
           detachIntegration(id){
               this.CHANNEL_DELETE_INTEGRATION({
                   channel_id:this.currentChannelData.id,
                   integration_id:id,
               }).then(res =>{
                   this.$swal({
                       toast: true,
                       position: 'top',
                       showConfirmButton: false,
                       timer: 4000,
                       type: 'success',
                       title: 'Интеграция удалена из канала'
                   });
               },err=>{
                   console.log(err.data.errors)
               })
           }
        },
    };
</script>

<style scoped>

   table{
     margin-top: 20px;
     width: 100%;
   }
   
   img{
     cursor: pointer;
   }
  
  .button {
    position: relative;
    padding: 15px 35px;

    font-weight: bold;
    color: #fff;

    background-color: #d3394c;
    border: 0;
    cursor: pointer;
  }

  .button:hover {
    background-color: #722040;
  }
</style>