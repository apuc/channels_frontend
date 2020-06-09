<template>
  <div class="attachment-link">
    <a :href="data.options.url" target="_blank">
      <div class="icon">
        <img v-if="data.options.icon" :src="data.options.icon" alt="">
      </div>
      <div>
        <p class="title">{{title}}</p>
        <p>{{data.options.base}}</p>
      </div>
    </a>
    
    <button class="close-btn" @click="REMOVE_ATTACHMENT(data.options.url)" v-if="deleteButton">
      <v-icon scale="1" class="icon" name="times-circle"/>
    </button>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: 'AttachmentImage',

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
      title(){
        if(this.data.options.title){
          return this.data.options.title;
        }
        
        return this.data.options.url
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
  a{
    width: 90%;
    display: flex;
  }
  
  img{
    max-width: 100px;
  }
  
  .title,.title:hover{
    text-decoration: none;
    color: black;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .close-btn {
    position: absolute;
    right: 5px;
    top: 0;
    z-index: 1;

    display: none;

    font-size: 0;
    cursor: pointer;

    background-color: transparent;
    border: none;
  }

  .attachment-link:hover .close-btn {
    display: block;
  }
  
  .attachment-link{
    position: relative;
    word-break: break-word;
  }
  
  .icon{
    padding-right: 10px;
  }
</style>