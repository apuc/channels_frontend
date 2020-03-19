<template>
  <div v-if="data.options" :class="(big) ? 'attachment-image-big mr-2' : 'attachment-image mr-2'" >
    <img :src="data.options.url" alt="attachment image" @click="SET_MODAL({name: 'ModalAttachmentImage', src: data.options.url})">
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
    methods: {
      ...mapMutations({
        REMOVE_ATTACHMENT: 'messages/REMOVE_ATTACHMENT',
        SET_MODAL: "modal/SET_MODAL"
      }),
    },
  }
</script>

<style>
  .attachment-image {
    position: relative;
    width: 70px;
    height: 70px;
  }
  
  .attachment-image img,.attachment-image-big img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    border-radius: 3px;
  }

  .close-btn {
    position: absolute;
    right: -5px;
    top: 0;
    z-index: 1;

    display: none;

    font-size: 0;
    cursor: pointer;

    background-color: transparent;
    border: none;
  }

  .attachment-image:hover .close-btn {
    display: block;
  }
</style>