<template>
  <div class="modal-inside">
    <h4 class="modal_title">Добавить интеграцию в канал</h4>

    <b-form-group label="Тип итеграции">
      <b-form-select 
        :options="allIntegrations" 
        text-field="title" 
        value-field="id" 
        v-model="type_id"  
        options-field="groups"
      />
    </b-form-group>

    <b-form-group label="Выберите интеграцию" v-if="integration_type && integration_type.user_can_create">
      <b-form-select :options="integrations" text-field="name" value-field="id" v-model="integration_id"/>
    </b-form-group>

    <b-form-group :label="field.type == 'checkbox' ? '' : field.label" v-for="(field,index) in fields" :key="index">
      <b-form-select 
        v-if="field.type == 'select'" 
        v-model="data[field.name]"
        :options="field.select_options"
      />
      
      <b-form-input  
        v-if="field.type == 'input'"
        v-model="data[field.name]"
        :type="field.input_type"
      />
      
      <b-form-checkbox
        v-if="field.type == 'checkbox'"
        v-model="data[field.name]"
      >
        {{field.label}}
      </b-form-checkbox>
    </b-form-group>
    
    <p v-if="errors.integration_id" v-for="err in errors.integration_id" style="color:red">{{err}}</p>
    
    <b-button variant="primary" @click="addIntegration">Добавить</b-button>
  </div>
</template>

<script>
    import {mapActions,mapGetters,mapMutations} from 'vuex';

    export default {
        name: "ModalAddIntegrationToChannel",

        data(){
            return {
                type_id:null,
                integration_id:null,
                
                integration_type:null,
                integrations:[],
                
                fields:[],
                data:{},
              
                errors:[]
            }
        },

        watch:{
            type_id:function (val) {
                let integrationType = this.allIntegrations.filter(el => el.id == val)[0];
                this.integration_type = integrationType;
                
                this.fields = [];
                this.data = {};

                if(integrationType.options){
                    this.fields = integrationType.options; 
                }
                
                if(!integrationType.user_can_create){
                    this.integration_id = integrationType.integrations[0].id
                }
                
                this.integrations = integrationType.integrations;
                
                for(let field of this.fields){
                    this.$set(this.data,field.name,field.type == 'checkbox' ? false : null)
                }
            }
        },

        computed:{
            ...mapGetters('integrations',['allIntegrations']),
            ...mapGetters('channels',['currentChannelData']),
        },

        methods: {
            ...mapActions('integrations',['CHANNEL_ADD_INTEGRATION']),
            ...mapMutations({
                DELETE_MODAL: 'modal/DELETE_MODAL',
            }),

            addIntegration(){
                this.errors = [];
              
                this.CHANNEL_ADD_INTEGRATION({
                    channel_id:this.currentChannelData.id,
                    integration_id:this.integration_id,
                    data:this.data,
                }).then(res =>{
                    this.$swal({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 4000,
                        type: 'success',
                        title: 'Интеграция добавлена в канал'
                    });

                    this.DELETE_MODAL()
                },err=>{
                    this.errors = err.data.errors;
                })
            }
        },
    }
</script>

<style scoped>

</style>