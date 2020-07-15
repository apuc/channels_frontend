<template>
  <div v-if="data.options" :class="(big) ? 'attachment-image-big mr-2' : 'attachment-image mr-2'" >
    <img :src="data.options.url" alt="attachment image" @click="show(data.options.url)">
    <button class="close-btn" @click="REMOVE_ATTACHMENT(data.options.url)" v-if="deleteButton">
      <v-icon scale="1" class="icon" name="times-circle"/>
    </button>
    <viewer :images="images"           
            class="viewer" ref="viewer"
            @inited="inited"
    >
      <img v-for="img in images" :src="img.options.url" :key="img.options.url" class="image">
    </viewer>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';
  import 'vue-awesome/icons/times-circle';
  
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
    computed: {
      ...mapGetters({
        messages: 'messages/messages',
        attachments: 'messages/attachments',
        viewerStatus: 'viewer/viewerStatus',
      }),
      attachmentImages() {
        return this.attachments
          .filter(att => att.options.type === 'image')
      },
      chatImages() {
        return this.messages
          .map(message => message.attachments)
          .flat(2)
          .filter(attachment => attachment.type === 'image')
      },
      images() {
        return this.big?this.chatImages:this.attachmentImages
      }
    },methods: {
      ...mapMutations({
        REMOVE_ATTACHMENT: 'messages/REMOVE_ATTACHMENT',
        SET_MODAL: "modal/SET_MODAL",
      }),
      inited (viewer) {
        this.$viewer = viewer
      },
      show(url) {
        const index = this.images.findIndex(image => {
          return image.options.url === url
        });
        
        this.$viewer.view(index)
      }
    },
  }
</script>

<style>
  .image{
    display: none !important
  }

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