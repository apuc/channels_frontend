<template>
  <div class="modal-inside">
    <h4 class="modal_title">Создать интеграцию</h4>
    
    <b-form-group label="Тип итеграции">
      <b-form-select :options="creatableIntegrations" text-field="title" value-field="id" v-model="type"/>
    </b-form-group>

    <b-form-group label="Название итеграции">
      <b-form-input v-model="name"/>
    </b-form-group>

    <b-form-group :label="field.label" v-for="(field,index) in fields" :key="index">
      <b-form-input v-model="data[field.name]"/>
    </b-form-group>
    
    <b-button variant="primary" @click="create">Создать</b-button>
  </div>
</template>

<script>
    import {mapActions,mapGetters,mapMutations} from 'vuex';
  
    export default {
        name: "ModalCreateIntegration",

        data(){
            return {
                type:null,
                name:null,
                fields:[],
                data:{},
            }
        },
        
        watch:{
            type:function (val) {
                this.fields = this.allIntegrations.filter(el => el.id == val)[0].fields;
                
                this.data = {};
                
                for(let field of this.fields){
                    this.$set(this.data,field.name,null)
                }
            }
        },
        
        computed:{
            ...mapGetters('integrations',['creatableIntegrations','allIntegrations'])
        },
        
        methods: {
            ...mapActions('integrations',['CREATE_INTEGRATION']),
            ...mapMutations({
                DELETE_MODAL: 'modal/DELETE_MODAL',
            }),
            
            create(){
                this.CREATE_INTEGRATION({
                    name:this.name,
                    type_id:this.type,
                    fields:this.data,
                }).then(res =>{
                    this.$swal({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 4000,
                        type: 'success',
                        title: 'Интеграция создана'
                    });
                    
                    this.DELETE_MODAL()
                },err=>{
                    console.log(err.data.errors)
                })
            }
        },
    }
</script>

<style scoped>

</style>