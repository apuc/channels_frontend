<template>
  <div class="attachment-link">
    <img v-if="data.options.attachments && data.options.attachments[0] && data.options.attachments[0].type==='image'" :src="data.options.attachments[0].options.url" />
    
    <div class="message-info d-flex">
      
      <div class="d-flex justify-content-between align-items-baseline">
        <p>{{data.options.from}}</p>
        <button class="close-btn" @click="REMOVE_ATTACHMENT(data.options.url)" v-if="deleteButton">
          <v-icon scale="1" class="icon" name="times-circle"/>
        </button>
      </div>
      <blockquote>{{data.options.text}}</blockquote>
      <p>{{data.options.created}}</p>
    </div>
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

    methods: {
      ...mapMutations({
        REMOVE_ATTACHMENT: 'messages/REMOVE_ATTACHMENT',
        SET_MODAL: "modal/SET_MODAL"
      }),
    },
  }
</script>

<style scoped lang='scss'>
  
  .close-btn {
    position: absolute;
    right: -15px;
    top: 0;
    z-index: 1;
    font-size: 0;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  .attachment-link {
    display: flex;
    overflow-x: hidden;

    img {
      width: 20%;
    }
  }

  .attachment-link:hover .close-btn {
    display: block;
  }

  .attachment-link{
    position: relative;
  }

  .icon{
    width: 25px;
  }

  blockquote{
    font-family: Arial;
    font-style: italic;
  }
  
  .message-info{
    padding: 0px 5px;
    min-width: 140px;
    font-size: 13px;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;

    * {
      margin: .1rem .3rem;
    }
  }

  @media screen and (max-width: 480px) {
    .attachment-link img {
      min-width: 100px;
      width: 25%;
    }
  }

  @media screen and (max-width: 320px) {
    .attachment-link img {
      min-width: 60px;
      width: 35%;
      max-height: 50px;
    }

    .message-info p {
      font-size: 11px;
    }
  }
</style>