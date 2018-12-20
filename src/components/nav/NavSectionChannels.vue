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
              @click="setChannelEditing(data.channel_id)">
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
      }
    },
    methods: {
      ...mapMutations({
        removeUsersFromStore: 'channels/REMOVE_USERS_FROM_STORE',
        setChannelIdToDelete: 'channels/SET_CHANNEL_ID_TO_DELETE',
        setUserPosition: 'user/SET_USER_POSITION',
        setModal: 'modal/SET_MODAL',
      }),
      ...mapActions({
        setCurrentChannelData: 'channels/SET_CURRENT_CHANNEL_DATA',
        setChannelEditing: 'channels/SET_CHANNEL_EDITING',
        getMessages: 'messages/GET_MESSAGES',
      }),
      async setData(e, id) {
        if (!e.target.hasAttribute('type')) {
          await this.setCurrentChannelData(Number(id));
          this.getMessages();
          this.removeUsersFromStore();
        }
      },
      deletingModal(id) {
        this.setChannelIdToDelete(id);
        this.setModal('ModalChannelDelete');
      }
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