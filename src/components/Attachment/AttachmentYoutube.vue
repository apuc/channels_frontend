<template>
  <div v-if="big">
    <div v-if="data.options" :class="(big) ? 'attachment-youtube-big mr-2' : 'attachment-youtube mr-2'" >
      <youtube v-if="big" ref="youtube" :video-id="parsedUrl" alt="attachment youtube" @click="playVideo()"></youtube>
      <button class="close-btn" @click="REMOVE_ATTACHMENT(data.options.url)" v-if="deleteButton">
        <v-icon scale="1" class="icon" name="times-circle"/>
      </button>
    </div>
  </div>
  <div v-else>
    <AttachmentLink 
      :data="data"
      :deleteButton="deleteButton"
      :big="big"
    />
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  import AttachmentLink from './AttachmentLink';

  export default {
    name: 'AttachmentYoutube',
   
    components: {
      AttachmentLink,
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
      },
    },
    computed: {
        parsedUrl() {
            return this.$youtube.getIdFromUrl(this.data.options.url);
        },
    },
    methods: {
      ...mapMutations({
        REMOVE_ATTACHMENT: 'messages/REMOVE_ATTACHMENT',
        SET_MODAL: "modal/SET_MODAL"
      }),
      playVideo() {
        this.$refs.youtube.player.playVideo()
      }
    },
  }
</script>

<style>
  .attachment-youtube {
    position: relative;
    width: 70px;
    height: 70px;
  }
  
  .attachment-youtube img, .attachment-youtube-big iframe {
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

  .attachment-youtube:hover .close-btn {
    display: block;
  }
</style>