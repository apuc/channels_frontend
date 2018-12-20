<template>
  <section class="list-group__item"
           @click="setData($event, data.channel_id)"
  >
    <router-link :to="data.slug"
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
    </router-link>

    <div v-if="userData.user_id === data.owner_id"
         class="control"
    >
      <button type="button"
              class="button"
              @click="editingModal(data.channel_id)">
        <v-icon scale="1" class="icon" name="pen"/>
      </button>

      <button type="button"
              class="button"
              @click="deletingModal(data.channel_id)">
        <v-icon scale="1" class="icon" name="trash-alt"/>
      </button>
    </div>
  </section>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "NavSectionChannels",
    computed: {
      ...mapGetters({
        currentChannelData: 'channels/currentChannelData',
        currentGroupData: 'groups/currentGroupData',
        userData: 'user/info',
        channelToEdit: 'channels/channelToEdit',
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
      }
    },
    methods: {
      ...mapMutations({
        removeUsersFromStore: 'channels/REMOVE_USERS_FROM_STORE',
        setChannelIdToDelete: 'channels/SET_CHANNEL_ID_TO_DELETE',
        setChannelData: 'channels/SET_CHANNEL_DATA',
        setChannelUserIds: 'channels/SET_CHANNEL_USER_IDS',
        setUserPosition: 'user/SET_USER_POSITION',
        setModal: 'modal/SET_MODAL',
      }),
      ...mapActions({
        setCurrentChannelData: 'channels/SET_CURRENT_CHANNEL_DATA',
        getMessages: 'messages/GET_MESSAGES',
        getChannelUsers: 'channels/GET_USERS',
      }),
      async setData(e, id) {
        if (!e.target.hasAttribute('type')) {
          await this.setCurrentChannelData(Number(id));
          this.getMessages();
          this.removeUsersFromStore();
        }
      },
      async editingModal(id) {
        this.setModal('ModalChannelEdit');
        await this.getChannelUsers(id).then(data => {
          let user_ids = [];
          for (let i = 0; i < data.length; i++) {
            user_ids.push(data[i].user_id);
          }
          this.setChannelUserIds(user_ids);
        });
        this.setChannelData(this.channelToEdit(id));
      },
      deletingModal(id) {
        this.setChannelIdToDelete(id);
        this.setModal('ModalChannelDelete');
      }
    },
  }
</script>

<style scoped>
  .list-group__item,
  .control {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list-group__item {
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
    min-height: 100%;
    padding: 3px 7px;

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
    padding: 5px 7px;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .button:hover {
    background-color: rgba(133, 133, 133, 0.23);
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