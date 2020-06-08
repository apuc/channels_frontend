<template>
  <div class="modal-inside">
    <div class="form-group">
      <label for="user">Поиск по каналам</label>
      <input id="user"
             class="form-control"
             type="text"
             ref="searchInput"
             v-model="searchValue"
      >
    </div>
    
    <p v-if="search.length < 1">Вы не подписаны на канал с таким названием.</p>

    <ul class="channel-list">
      <li
        v-for="(channel, index) in search"
        :key="channel.slug"
      >
        <label class="channel-info" :for="channel.slug + index" @click="resend(channel)">
          <router-link :to="`/${channel.slug}`" class="channel">
            <img
              class="img"
              :src="channel.avatar.small"
              width="30"
              height="30"
              alt
            >
            {{channel.title}}
          </router-link>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalGroupAddChannels",
      
    data() {
      return {
        searchValue: '',
        noChannels: false,
      }
    },
    
    props:{
      payload:Object,
    },
      
    computed: {
      ...mapGetters('channels', [
        'currentChannelData',
        'allChannels',
      ]),

      search(){

        const otherChannels = this.allChannels.filter(channel => {
          return channel.id !== this.currentChannelData.id;
        })
        
        if(!this.searchValue){
          return otherChannels;
        }
        
        return otherChannels.filter(channel =>{
          return (channel.title.includes(this.searchValue) || 
            channel.slug.includes(this.searchValue))
        })
      }
    },
    
    methods:{
      ...mapMutations({
        ADD_ATTACHMENT: 'messages/ADD_ATTACHMENT',
        CLEAR_ATTACHMENTS: 'messages/CLEAR_ATTACHMENTS',
        SET_MODAL: 'modal/SET_MODAL',
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),

      ...mapActions({
        SET_CURRENT_CHANNEL_DATA: 'channels/SET_CURRENT_CHANNEL_DATA',
      }),
      
      resend(channel){
        this.SET_CURRENT_CHANNEL_DATA(channel.slug)
        
        const attachment = {
          type:'reply',
          options: {
            text:`"${this.payload.message.text}"`,
            from:this.payload.message.from.username,
            created:this.payload.message.created_at,
          }
        };

        const resendAttachments = this.payload.message.attachments;

        this.CLEAR_ATTACHMENTS();
        this.ADD_ATTACHMENT(attachment);
        this.addAttachments(resendAttachments);
        
        this.DELETE_MODAL();
      },
      addAttachments(attachments) {
          for (let i = 0; i < attachments.length; i++) {
            this.ADD_ATTACHMENT(attachments[i]);
          }
      }
    }
  }
</script>

<style scoped>
  .channel-list {
    max-height: 300px;
    margin: 0;
    margin-top: 10px;
    padding: 0;
    overflow: auto;
  }

  .channel-info {
    flex: 1 0 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-top-left-radius: 13px;
    border-bottom-left-radius: 13px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .channel-info:hover {
    background-color: rgba(122, 122, 122, 0.2);
  }

  .channel {
    display: flex;
  }

  .img {
    display: block;
    width: 30px;
    height: auto;
    margin-right: 10px;

    border-radius: 50%;
  }
</style>