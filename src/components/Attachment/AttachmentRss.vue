<template>
    <div>
      <b-row>
        <b-col v-if="showImage">
          <img :src="data.options.enclosure" class="img-thumbnail">
        </b-col>
        
        <b-col>
          <a :href="data.options.link" target="_blank">{{data.options.title}}</a>
        </b-col>
      </b-row>

      <p class="mt-3">{{postText}}</p>
      
      <b-button
        v-if="data.options.full_text" 
        @click="showFull = !showFull"
        size="sm"
        variant="primary"
      >Полный текст
      </b-button>
      
      <div class="d-flex justify-content-between rss-footer mt-3">
        <p>Категория: {{data.options.category}}</p>
        <p>{{data.options.date}}</p>
      </div>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    import { BButton, BRow, BCol } from 'bootstrap-vue';

    export default {
        name: "AttachmentRss.vue",
        components: {
          BButton, BRow, BCol
        },
        data(){
          return {
            showFull:false
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
      
        computed:{
          postText(){
            return this.showFull ? this.data.options.full_text : this.data.options.description;
          },
          
          showImage(){
            if(!this.data.options.enclosure){
              return false;
            }
            
            if(this.data.options.enclosure.includes('video')){
              return false;
            }
            
            return true;
          }
        },

      
        methods: {
          ...mapMutations({
            REMOVE_ATTACHMENT: 'messages/REMOVE_ATTACHMENT',
            SET_MODAL: "modal/SET_MODAL"
          }),
        },
    }
</script>

<style scoped>
.rss-footer{
  font-style: italic;
  font-size: 14px;
}
</style>