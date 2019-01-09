<template>
  <div class="modal-inside">
    <div class="form-group">
      <label for="user">Поиск по каналам</label>
      <input id="user"
             class="form-control"
             type="text"
             ref="searchInput"
             :value="searchValue"
             @input="searchChannel($event.target.value)"
      >
    </div>

    <p v-if="noChannels">Вы не подписаны на канал с таким названием.</p>

    <ul class="channel-list">
      <li
        class="channel"
        v-for="(channel, index) in addingChannelsData.channelsToSearch"
        :key="channel.email"
      >
        <label class="channel-info" :for="channel.slug + index">
          <img
            class="img"
            :src="channel.avatar ? channel.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
            width="30"
            height="30"
            alt
          >

          <router-link :to="`/${channel.user_id}`">{{channel.slug}}</router-link>
        </label>

        <input
          type="checkbox"
          name="channel-to-add"
          :id="channel.slug + index"
          :value="channel.id"
          v-model="channelsToAdd"
        >
      </li>
    </ul>

    <button type="button" class="btn btn-primary mt-3" @click="submitChannels">Add channels</button>
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
        channelsToAdd: [],
      }
    },
    computed: {
      ...mapGetters({
        addingChannelsData: 'groups/addingChannelsData',
      }),
    },
    methods: {
      ...mapMutations('groups', ['SET_CHANNELS_TO_ADD', 'SET_CHANNELS_TO_SEARCH', 'CLEAR_ADDING_CHANNELS_DATA']),
      ...mapActions({
        ADD_CHANNELS_TO_GROUP: 'groups/ADD_CHANNELS_TO_GROUP',
      }),
      async submitChannels() {
        await this.SET_CHANNELS_TO_ADD(this.channelsToAdd);
        this.ADD_CHANNELS_TO_GROUP();
      },
      findChannel(value) {
        let currentUserName = '';
        let searchValue = value.toLowerCase();
        let searchResult = [];
        for (let i = 0; i < this.addingChannelsData.availableChannels.length; i++) {
          currentUserName = this.addingChannelsData.availableChannels[i].slug.toLowerCase();
          if (currentUserName.includes(searchValue)) {
            searchResult.push(this.addingChannelsData.availableChannels[i]);
          }
        }
        return searchResult;
      },
      searchChannel(value) {
        this.searchValue = value;
        const searchResult = this.findChannel(value);
        this.noChannels = searchResult.length === 0;

        if (value) {
          this.SET_CHANNELS_TO_SEARCH(searchResult);
        } else {
          this.SET_CHANNELS_TO_SEARCH(this.addingChannelsData.availableChannels);
        }
      }
    },
    beforeDestroy() {
      this.CLEAR_ADDING_CHANNELS_DATA();
    },
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

  .channel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 3px;
  }

  .channel-info {
    display: flex;
    align-items: center;
  }

  .channel:hover {
    background-color: rgba(122, 122, 122, 0.2);
  }

  .image-wrap {
    width: 30px;
    height: 30px;
    margin-right: 10px;

    background-color: #cccccc;
    border-radius: 50%;
  }

  .img {
    display: block;
  }
</style>