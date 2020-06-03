<template>
  <div class="integration_create">
      
    <header>
      <h5 class="integration_create_title">Создать интеграцию</h5>
      <router-link to="/integrations" class="btn btn-primary mr-2">Назад</router-link>
    </header>
    
    <b-form-group label="Тип итеграции">
      <b-form-select :options="creatableIntegrations" 
                     text-field="title" 
                     value-field="id" 
                     v-model="type"
                     options-field="groups"
                     />
    </b-form-group>

    <label for="add-integration_title" style="margin-right: 10px">Введите название интеграции</label>
      <div class="input-wrap">
        <input id="add-integration_title"
               class="form-control add-integration__input"
               type="text"
               placeholder="Введите название интеграции"
               v-model="name"
        >
      </div>

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
    
    <b-button v-if="showLink" variant="success" class='create-integration' @click="makeNewIntegration">Создать ещё</b-button>
    <b-button v-else variant="primary" class='create-integration' @click="createNewIntegration">Создать</b-button>

  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import Integrations from "./Integrations";

  export default {
    name: "IntegrationsCreate",
    
    data(){
      return{
        type:null,
        name:null,
        fields:[],
        data: {},
        link:null,
        showLink:false,
      }
    },

    components: {Integrations},
      
    computed: {
      ...mapGetters('integrations', ['creatableIntegrations']),
    },

    watch:{
        type(val) {
            let integrationType = this.creatableIntegrations.filter(el => el.id == val)[0];
            this.fields = integrationType.fields;

            this.link = integrationType.url;
            
            this.data = {};
            
            for(let field of this.fields){
                this.$set(this.data, field.name, null)
            }
        }
    },
      
    methods: {
      ...mapActions('integrations',['CREATE_INTEGRATION']),
      ...mapMutations({
        SET_CURRENT_INTEGRATION: "bots/SET_CURRENT_INTEGRATION",
        SET_MODAL: "modal/SET_MODAL",
      }),
      createNewIntegration(){
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
        makeNewIntegration(){
            this.name = "";
            this.type = "";
            this.data = {};
            this.fields = [];
            this.link = null;
            this.showLink = false;
        },
        copyLink(){
          navigator.clipboard.writeText(this.link)
        }
    }
  }
</script>

<style scoped lang="scss">
.integration_create{
  padding-top: 10px;

  button.create-integration {
      display: block;
      margin: 1rem auto;
  }

  fieldset.form-group {
      margin: .5rem 0;
  }

  header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h5{
      margin: auto 0;
    }
    .btn{
      margin: auto 0;
    }
  }
  .add-integration-field{
    text-align: left;
  }
}
</style>