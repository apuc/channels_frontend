<template>
  <div class="modal-inside">
    <h4 class="modal_title">Создать интеграцию</h4>
    
    <b-form-group label="Тип итеграции">
      <b-form-select :options="creatableIntegrations" 
                     text-field="title" 
                     value-field="id" 
                     v-model="type"
                     options-field="groups"
                     />
    </b-form-group>

    <b-form-group label="Название итеграции">
      <b-form-input v-model="name"/>
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

    <b-form-group label="URL для хуков" v-if="showLink">
      <b-input-group>
        <b-form-input v-model="link" disabled  placeholder="Нажмите стобы скопировать"></b-form-input>
        <b-input-group-append>
          <b-button variant="success" @click="copyLink">Копировать</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    
    
    <b-button variant="primary" @click="create">Создать</b-button>
    
  </div>
</template>

<script>
    import {mapActions,mapGetters,mapMutations} from 'vuex';
    import { BFormGroup, BFormSelect, BFormInput, BFormCheckbox, 
      BInputGroup, BInputGroupAppend, BButton } from 'bootstrap-vue';
  
    export default {
        name: "ModalCreateIntegration",
        components: {
          BFormGroup, 
          BFormSelect,
          BFormInput, 
          BFormCheckbox, 
          BInputGroup, 
          BInputGroupAppend, 
          BButton
        },
        data(){
            return {
                type:null,
                name:null,
                fields:[],
                data:{},
                link:null,
                showLink:false,
            }
        },
        
        watch:{
            type:function (val) {
                let integrationType = this.allIntegrations.filter(el => el.id == val)[0];
                this.fields = integrationType.fields;
                this.link = integrationType.url;
                
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
                    
                    this.link += res.id;
                    this.showLink = true;
                },err=>{
                    console.log(err.data.errors)
                })
            },
            
            copyLink(){
                navigator.clipboard.writeText(this.link)
            }
        },
    }
</script>

<style scoped>

</style>