<template>
  <div class="attachment-link">
    <blockquote>{{data.options.text}}</blockquote>
    
    <div class="message-info d-flex justify-content-between">
      <p>{{data.options.from}}</p>
      <p>{{data.options.created}}</p>
    </div>

    <button class="close-btn" @click="REMOVE_ATTACHMENT(data.options.url)" v-if="deleteButton">
      <v-icon scale="1" class="icon" name="times-circle"/>
    </button>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: 'AttachmentReplyMessage',

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
  }

  .icon{
    padding-right: 10px;
  }

  blockquote{
    font-family: Arial;
    font-style: italic;
    margin-bottom: 2px;
  }
  
  .message-info{
    padding: 0px 5px;
    min-width: 200px;
    font-size: 13px;
  }
</style>