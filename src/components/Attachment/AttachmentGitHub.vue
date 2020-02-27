<template>
    <div>
      <b-card no-body class="mb-1" v-for="(commit,index) in data.options.commits" :key="index">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle="`accordion-${index}`" variant="info">
            <div class="d-flex justify-content-between">
              <span>{{commit.message}}</span>
              <span>{{getDate(commit.timestamp)}}</span>
            </div>
          </b-button>
        </b-card-header>
        
        <b-collapse :id="`accordion-${index}`" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <b-link target="_blank" :href="commit.url">Посмотреть на GitHub</b-link>
            </b-card-text>
            <b-card-text v-for="(file,index) in commit.modified" :key="index">{{file}}</b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    import { formatDate } from "../../services/common.service";

    export default {
        name: "AttachmentGitHub",

      data(){
        return {
        }
      },

      props: {
        data: {
          required: true,
          type: Object
        },
        deleteButton: {
          required: true,
          type: Boolean
        },
        big:{
          default:false
        }
      },
      
      methods: {
        ...mapMutations({
          REMOVE_ATTACHMENT: 'messages/REMOVE_ATTACHMENT',
          SET_MODAL: "modal/SET_MODAL"
        }),

        getDate(timestamp){
          return formatDate(new Date(timestamp))
        }

      },
    }
</script>

<style scoped>

</style>