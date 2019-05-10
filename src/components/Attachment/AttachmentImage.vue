<template>
  <div class="attachment-image mr-2">
    <img :src="data.url" alt="attachment image">
    <div class="close-btn" @click="REMOVE_ATTACHMENT(data.id)">
      <v-icon scale="1" class="icon" name="times-circle"/>
    </div>
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
      }
    },
    methods: {
      ...mapMutations({
        REMOVE_ATTACHMENT: 'messages/REMOVE_ATTACHMENT',
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

  .attachment-image img {
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
  }

  .attachment-image:hover .close-btn {
    display: block;
  }
</style>