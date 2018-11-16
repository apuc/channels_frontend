<template>
  <nav class="list-group">
    <section class="list-group__item" v-for="(item, index) in itemsList"
             @click="setData($event, type === 'channel' ? item.channel_id : item.group_id)">
      <router-link
        :to="type === 'channel' ? `/${item.slug}` : `/group/${item.slug}`"
        :key="index + item.slug"
        class="list-group__link">
        <img :src="item.avatar.small"
             alt=""
             class="avatar"
             width="30"
             height="30"
             v-if="item.avatar">

        <span>{{ item.title }}</span>

        <v-icon scale="1" class="icon icon_mla" name="folder" v-if="type === 'group'"/>
      </router-link>

      <div class="control">
        <button type="button"
                class="button"
                v-if="type === 'group'"
                @click="openChannelsAdding(item.group_id)">
          <v-icon scale="1" class="icon" name="plus-circle"/>
        </button>

        <button type="button"
                class="button"
                @click="editThis($event, type === 'channel' ? item.channel_id : item.group_id)">
          <v-icon scale="1" class="icon" name="pen"/>
        </button>

        <button type="button"
                class="button"
                @click="deleteThis($event, type === 'channel' ? item.channel_id : item.group_id)">
          <v-icon scale="1" class="icon" name="trash-alt"/>
        </button>
      </div>
    </section>
  </nav>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        currentChannelData: 'channels/currentChannelData',
        currentGroupData: 'groups/currentGroupData',
      }),
    },
    props: {
      title: String,
      itemsList: Array,
      type: String,
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations({
        removeUsersFromStore: 'channels/REMOVE_USERS_FROM_STORE',
      }),
      ...mapActions({
        setCurrentChannelData: 'channels/SET_CURRENT_CHANNEL_DATA',
        setChannelEditing: 'channels/SET_CHANNEL_EDITING',
        setChannelDeleting: 'channels/SET_CHANNEL_DELETING',
        setCurrentGroupData: 'groups/SET_CURRENT_GROUP_DATA',
        setGroupEditing: 'groups/SET_GROUP_EDITING',
        setGroupDeleting: 'groups/SET_GROUP_DELETING',
        setAddingChannelsToGroup: 'groups/SET_ADDING_CHANNELS_TO_GROUP',
        getMessages: 'messages/GET_MESSAGES',
      }),
      async setData(e, id) {
        if (!e.target.hasAttribute('type')) {
          this.type === 'channel' ?
            await this.setCurrentChannelData(Number(id))
          :
            await this.setCurrentGroupData(Number(id));

          this.getMessages();
          this.removeUsersFromStore();
        }
      },
      editThis(e, id) {
        this.type === 'channel' ?
          this.setChannelEditing(Number(id))
          :
          this.setGroupEditing(Number(id))
      },
      deleteThis(e, id) {
        this.type === 'channel' ?
          this.setChannelDeleting(Number(id))
          :
          this.setGroupDeleting(Number(id))
      },
      openChannelsAdding(group_id) {
        this.setAddingChannelsToGroup(group_id);
      },
    },
  }
</script>

<style scoped>
  .list-group {
    max-height: calc(100% - 100px);
  }

  .list-group__item,
  .control {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list-group__item {
    padding: 3px 7px;

    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }

  .list-group__item:hover {
    background-color: #f8f9fa;
  }

  .list-group__link {
    display: flex;
    align-items: center;

    width: 100%;
    color: #495057;
  }

  .list-group__link:hover,
  .list-group__link:active,
  .list-group__link:focus {
    text-decoration: none;
  }

  h2 {
    font-size: 24px;
  }

  .avatar {
    margin-right: 15px;
    border-radius: 50%;
  }

  .button {
    margin-right: 5px;
    padding: 5px;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .icon {
    color: #495057;
  }

  .icon_mla {
    margin-left: auto;
  }
</style>