<template>
  <div class="integrations_list">
    <header>
      <p>Ваши интеграции</p>
      <router-link to="/integrations/create" class="btn btn-primary mr-2">Добавить интеграцию</router-link>
    </header>

    <div v-if="integrationsList.length === 0">
      <p>Ваш список интеграций пуст.</p>
    </div>

    <div v-else class="integrations_table">
    <div class="integrations_table__category" v-for="type in integrationsTypes" :key="type">
      <div class="integrations_table__type">{{type}}</div>
      <div class="integrations_table__item" v-for="integration in integrationsList" :key="integration.name">
        <span v-if="integration.type.title === type">{{integration.name}}</span>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import Integrations from "./Integrations";

  export default {
    name: "IntegrationsList",
    
    data(){
      return{}
    },

    components: {Integrations},
      
    computed: {
      integrationsTypes(){
        const integrationsTypes = this.integrationsList.map(el => el.type.title);
        const uniqueTypes = [...new Set(integrationsTypes)];
        return uniqueTypes;
      },
      ...mapGetters('integrations', ['integrationsList', 'creatableIntegrations']),
    },
      
    methods: {
      ...mapActions('integrations',[
                'GET_USER_INTEGRATIONS',
            ]),
      ...mapActions('user',[
                'GET_USER_ME',
            ]),
      ...mapMutations({
        SET_CURRENT_INTEGRATION: "bots/SET_CURRENT_INTEGRATION",
        SET_MODAL: "modal/SET_MODAL"
      }),
        

      delIntegration(data){
        this.SET_CURRENT_INTEGRATION({
          id:data.id
        });
        this.SET_MODAL({name: "ModalIntegrationDelete"});
      }
    },

    created() {
      this.GET_USER_ME()
        .then( () => this.GET_USER_INTEGRATIONS())
        .catch( (e) => console.log(e))
    }
  }
</script>

<style scoped lang="scss">
.integrations_list{
   header{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 10px;
      p{
        margin: auto 0;
        font-size: 24px;
        text-align: center;
      }
    }
}
  .integrations_table{
    text-align: left;

    table{
      max-width: 100% !important;
    }

    &__category {
      max-width: 100%;
      margin: .5rem 0;
    }

    &__type {
      width: 100%;
      font-size: 1.3rem;
      border-bottom: 2px solid #bebebe;
    }

    &__item {
      max-width: 100%;
    }
  }
</style>