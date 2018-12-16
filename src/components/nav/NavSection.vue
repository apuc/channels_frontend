<template>
  <section class="list-group__item"
           @click="setData($event, type === 'channel' ? data.channel_id : data.group_id)"
  >
    <router-link :to="type === 'channel' ? `/${data.slug}` : `/group/${data.slug}`"
                 class="list-group__link"
                 :title="data.title"
                 @click.native="setUserPosition(type)"
    >
      <img :src="data.avatar.small"
           alt=""
           class="avatar"
           width="30"
           height="30"
           v-if="data.avatar">

      <span class="name">
        {{ data.title }}
      </span>

      <v-icon scale="1" class="icon icon_mla" name="folder" v-if="type === 'group'"/>
    </router-link>

    <div v-if="userData.user_id === data.owner_id"
         class="control"
    >
      <button type="button"
              class="button"
              v-if="type === 'group'"
              @click="openChannelsAdding(data.group_id)">
        <v-icon scale="1" class="icon" name="plus-circle"/>
      </button>

      <button type="button"
              class="button"
              @click="editThis($event, type === 'channel' ? data.channel_id : data.group_id)">
        <v-icon scale="1" class="icon" name="pen"/>
      </button>

      <button type="button"
              class="button"
              @click="deleteThis($event, type === 'channel' ? data.channel_id : data.group_id)">
        <v-icon scale="1" class="icon" name="trash-alt"/>
      </button>
    </div>
  </section>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        currentChannelData: 'channels/currentChannelData',
        currentGroupData: 'groups/currentGroupData',
        userData: 'user/info'
      }),
    },
    props: {
      type: {
        type: String,
        required: true
      },
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        sectionWidth: 0,
        controlBtnsWidth: 0
      }
    },
    methods: {
      ...mapMutations({
        removeUsersFromStore: 'channels/REMOVE_USERS_FROM_STORE',
        setUserPosition: 'user/SET_USER_POSITION',
      }),
      ...mapActions({
        setCurrentChannelData: 'channels/SET_CURRENT_CHANNEL_DATA',
        setChannelEditing: 'channels/SET_CHANNEL_EDITING',
        setChannelDeleting: 'channels/SET_CHANNEL_DELETING',
        getGroupData: 'groups/GET_GROUP_DATA',
        setGroupEditing: 'groups/SET_GROUP_EDITING',
        setGroupDeleting: 'groups/SET_GROUP_DELETING',
        setAddingChannelsToGroup: 'groups/SET_ADDING_CHANNELS_TO_GROUP',
        getMessages: 'messages/GET_MESSAGES',
      }),
      async setData(e, id) {
        if (!e.target.hasAttribute('type')) {
          if (this.type === 'channel') {
            await this.setCurrentChannelData(Number(id));
            this.getMessages();
          } else {
            await this.getGroupData(Number(id));
          }
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
    flex: 1 2 auto;
    display: flex;
    align-items: center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    flex-shrink: 0;
  }

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>