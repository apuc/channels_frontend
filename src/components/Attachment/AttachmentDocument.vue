<template>
  <div class="doc-attachment">
    <a :href="filesUrl + data.options.url" download @click.prevent="">
      <img :src="data.options.img_url" alt="document icon">
    </a>
    <div class="doc-attachment-data">
      <span class="doc-attachment__text doc-attachment__name">{{ data.options.name }}</span>
      <span class="doc-attachment__text doc-attachment__weight">{{ data.options.weight }}</span>
    </div>
    
    <button type="button" class="close" @click="REMOVE_ATTACHMENT(data.id)" v-if="deleteButton">
      <v-icon scale="1" class="icon" name="times-circle"/>
    </button>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: 'AttachmentDocument',
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        filesUrl: process.env.VUE_APP_FILES_URL
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
  .doc-attachment {
    margin: 7px 0;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .doc-attachment img {
    margin-right: 10px;
    display: block;
    width: 35px;
    height: 35px;
    flex-shrink: 0;
    object-fit: contain;
  }

  .doc-attachment-data {
    display: flex;
    flex-direction: column;
  }

  .close {
    display: block;
    margin-left: auto;
    
    font-size: 0;
    line-height: 0;
  }
  
  .doc-attachment__text {
    font-size: 14px;
    line-height: 1.2;
  }
  
  .doc-attachment__name {
    font-weight: 700;
  }
  
  @media (max-width: 1280px) {
    .doc-attachment {
      width: 97%;
    }
  }
</style>