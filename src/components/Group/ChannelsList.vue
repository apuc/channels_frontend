<template>
  <section class="groups">
    <header class="form-group">
      <h2 class="channels-search__title">Поиск по каналам группы</h2>
      <input class="form-control"
             placeholder="Название канала"
             type="text"
             :value="searchValue"
             @input="searchChannel($event.target.value)"
      >
    </header>

    <p v-if="noChannels">К сожалению в данной группе нет канала с таким названием.</p>

    <div class="d-flex" v-for="channel in currentGroupData.channelsToSearch" :key="channel.id">
      <NavSectionChannels
        style="width: 100%"
                          :type="'channel'"
                          :data="channel"
                          :notification="false"
      />

     
      <button 
              type="button"
              class="btn btn-remove-from-channel btn-sm"
              @click="removeChannel(channel.id)"
      >
        <img src="../../assets/img/error.svg"
             alt=""
             width="18"
             height="18"
             v-b-tooltip="'Удалить канал из группы!'"
        >
      </button>
      
    </div>
    
  </section>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import NavSectionChannels from "../Nav/NavSectionChannels";

  export default {
    name: "ChannelsList",
      
    components:{
        NavSectionChannels
    },  
      
    computed: {
      ...mapGetters('groups', ['currentGroupData', 'channelToDelete']),
      ...mapGetters({
        userData: 'user/userData',
      })
    },
      
    data() {
      return {
        searchValue: '',
        noChannels: false,
      }
    },
      
    methods: {
      ...mapMutations('groups', ['SET_CHANNEL_TO_DELETE', 'SET_CURRENT_GROUP_CHANNELS_TO_SEARCH']),
      ...mapMutations({
        ADD_CREATED_CHANNEL: 'channels/ADD_CREATED_CHANNEL',
      }),
        
      ...mapActions({
        SET_CURRENT_CHANNEL_DATA: 'channels/SET_CURRENT_CHANNEL_DATA',
        GET_MESSAGES: 'messages/GET_MESSAGES',
        DELETE_CHANNEL_FROM_GROUP: 'groups/DELETE_CHANNEL_FROM_GROUP',
      }),
        
      async setData(e, id) {
        await this.SET_CURRENT_CHANNEL_DATA(Number(id));
        this.GET_MESSAGES();
      },

        /**
         * Удалить канал из группы
          * @param channelId
         * @returns {Promise<void>}
         */ 
      async removeChannel(channelId) {
        await this.SET_CHANNEL_TO_DELETE(channelId);
        await this.DELETE_CHANNEL_FROM_GROUP();
        this.ADD_CREATED_CHANNEL(this.channelToDelete);
        this.$forceUpdate();
      },

        /**
         * Поиск канала в группе
          * @param value
         * @returns {[]}
         */ 
      findChannel(value) {
        let currentUserName = '';
        let searchValue = value.toLowerCase();
        let searchResult = [];
        for (let i = 0; i < this.currentGroupData.channelsToSearch.length; i++) {
          currentUserName = this.currentGroupData.channelsToSearch[i].title.toLowerCase();
          if (currentUserName.includes(searchValue)) {
            searchResult.push(this.currentGroupData.channelsToSearch[i]);
          }
        }
            
        return searchResult;
      },
        
      searchChannel(value) {
        this.searchValue = value;
        const searchResult = this.findChannel(value);
        this.noChannels = searchResult.length === 0;

        if (value) {
          this.SET_CURRENT_GROUP_CHANNELS_TO_SEARCH(searchResult);
        } else {
          this.SET_CURRENT_GROUP_CHANNELS_TO_SEARCH(this.currentGroupData.channels);
        }
      }
    }
  }
</script>

<style scoped>
  .groups {
    padding: 30px;
    display: flex;
    flex-direction: column;
  }

  .channels-list {
    display: flex;
    flex-direction: column;
    padding: 0;

    list-style: none;
  }

  .channels-list__channel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 31px;
    margin-bottom: 15px;
    padding: 0;
    transition: background-color 0.2s;
  }

  .channels-list__channel:hover {
    background-color: #dddddd;
    transition: background-color 0.2s;
  }

  .channel-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  
  .btn-remove-from-channel{
    background-color: transparent;
    border: none;
  }
</style>