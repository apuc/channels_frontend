<template>
  <section class="groups">
    <ul class="channels-list">
      <li v-for="(channel, index) in currentGroupData.channels"
          :key="channel.id"
          class="col-3 channels-list__channel"
      >
        <router-link :to="`/${channel.slug}`" @click.native="setData($event, channel.channel_id)">
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
      return {}
    },
    methods: {
      ...mapMutations({
        setChannelToDelete: 'groups/SET_CHANNEL_TO_DELETE',
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
</style>