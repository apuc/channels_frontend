<template>
  <div class="doc-attachment">
    <a :href="data.options.url" download>
      <img :src="documentIcon" alt="document icon">
    </a>
    <div class="doc-attachment-data">
      <span class="doc-attachment__text doc-attachment__name">
        <a :href="filesUrl + data.options.url" download>{{ data.options.name }}</a>
      </span>
      <span class="doc-attachment__text doc-attachment__weight">{{ data.options.size }}</span>
    </div>
    
    <button type="button" class="close" @click="REMOVE_ATTACHMENT(data.options.url)" v-if="deleteButton">
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
      },
      deleteButton: {
        required: false,
        type: Boolean,
        default: false
      },
      icon: {
        required: true,
        type: String,
      },
    },
      
      computed:{
        documentIcon(){
            let mime =  this.data.options.mimeType.split('/')[1];
            
            for(let type in this.icon){
                if(type == mime){
                    return this.icon[type]
                }
            }
            
            return this.icon.default;
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
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
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
    white-space: nowrap;
    width: 100%;
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  @media (max-width: 1280px) {
    .doc-attachment {
      width: 97%;
    }
  }
</style>
