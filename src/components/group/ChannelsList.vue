<template>
  <section class="groups">
    <header class="form-group">
      <h2 class="channels-search__title">Поиск по каналам</h2>
      <input class="form-control" type="text" :value="searchValue" @input="searchChannel($event.target.value)">
    </header>
    
    <p v-if="noChannels">К сожалению в данной группе нет канала с таким названием.</p>

    <ul class="channels-list">
      <li v-for="channel in currentGroupData.channelsToSearch"
          :key="channel.id"
          class="col-3 channels-list__channel"
      >
        <router-link :to="`/${channel.slug}`" @click.native="setData($event, channel.channel_id)">
        <img class="channel-avatar" :src="channel.avatar ? channel.avatar.small : 'https://pp.userapi.com/c846524/v846524878/e3cbe/QHn1Jw-tZfA.jpg'" alt="">
          {{ channel.title }}
        </router-link>

        <button type="button"
                class="btn btn-danger btn-sm"
                @click="removeChannel(channel.channel_id)"
        >
          <v-icon scale="1"
                  class="icon"
                  name="trash-alt"
          />
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    name: "ChannelsList",
    computed: {
      ...mapGetters({
        currentGroupData: 'groups/currentGroupData',
        userData: 'user/info',
      })
    },
    data() {
      return {
        searchValue: '',
        noChannels: false,
      }
    },
    methods: {
      ...mapMutations({
        setChannelToDelete: 'groups/SET_CHANNEL_TO_DELETE',
        setCurrentGroupChannelsToSearch: 'groups/SET_CURRENT_GROUP_CHANNELS_TO_SEARCH',
      }),
      ...mapActions({
        setCurrentChannelData: 'channels/SET_CURRENT_CHANNEL_DATA',
        getMessages: 'messages/GET_MESSAGES',
        deleteChannel: 'groups/DELETE_CHANNEL_FROM_GROUP',
      }),
      async setData(e, id) {
        await this.setCurrentChannelData(Number(id));
        this.getMessages();
      },
      async removeChannel(channelId) {
        await this.setChannelToDelete(channelId);
        this.deleteChannel();
      },
      findChannel(value) {
        let currentUserName = '';
        let searchValue = value.toLowerCase();
        let searchResult = [];
        for (let i = 0; i < this.currentGroupData.channelsToSearch.length; i++) {
          currentUserName = this.currentGroupData.channelsToSearch[i].slug.toLowerCase();
          if (currentUserName.includes(searchValue)) {
            searchResult.push(this.currentGroupData.channelsToSearch[i]);
          }
        }
        console.log(searchResult);
        return searchResult;
      },
      searchChannel(value) {
        this.searchValue = value;
        const searchResult = this.findChannel(value);
        this.noChannels = searchResult.length === 0;

        if (value) {
          this.setCurrentGroupChannelsToSearch(searchResult);
        } else {
          this.setCurrentGroupChannelsToSearch(this.currentGroupData.channels);
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
    padding-right: 0;
    transition: background-color 0.2s;
  }

  .channels-list__channel:hover {
    background-color: #dddddd;
    transition: background-color 0.2s;
  }

  .channel-avatar {
    width: 30px;
    height: 30px;
  }
</style>