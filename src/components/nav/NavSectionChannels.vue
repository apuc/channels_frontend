<template>
  <section class="list-group__item" @click="setData($event, data.id)">
    <router-link
      :to="`/${data.slug}`"
      class="list-group__link"
      :title="data.title"
      @click.native="SET_USER_POSITION(type)"
    >
      <img :src="data.avatar.small" alt class="avatar" width="30" height="30" v-if="data.avatar">

      <span class="name">{{ data.title }}</span>
    </router-link>

    <div v-if="userData.user_id === data.owner_id" class="control">
      <button type="button" class="button" @click="setAddUsersModal(data.id)">
        <v-icon scale="1" class="icon" name="plus-circle"/>
      </button>

      <button type="button" class="button" @click="editingModal(data.id)">
        <v-icon scale="1" class="icon" name="pen"/>
      </button>

      <button type="button" class="button" @click="deletingModal(data.id)">
        <v-icon scale="1" class="icon" name="trash-alt"/>
      </button>
    </div>
  </section>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from "vuex";

  export default {
    name: "NavSectionChannels",
    computed: {
      ...mapGetters('channels', ['currentChannelData', 'contactsToAdd', 'channelToEdit']),
      ...mapGetters('user', ['userData', 'userContacts']),
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
      return {};
    },
    methods: {
      ...mapMutations('channels', [
        'REMOVE_CURRENT_CHANNEL_USERS_FROM_STORE',
        'SET_CHANNEL_ID_TO_DELETE',
        'SET_CHANNEL_DATA',
        'SET_CHANNEL_USERS',
        'SET_CONTACTS_FREE_TO_ADD',
        'SET_CONTACTS_FREE_TO_ADD_SEARCH'
      ]),
      ...mapMutations({
        SET_USER_POSITION: "user/SET_USER_POSITION",
        SET_MODAL: "modal/SET_MODAL"
      }),
      ...mapActions('channels', ['SET_CURRENT_CHANNEL_DATA', 'GET_CHANNEL_USERS']),
      ...mapActions({
        GET_MESSAGES: "messages/GET_MESSAGES"
      }),
      async setData(e, id) {
        if (!e.target.hasAttribute("type")) {
          await this.SET_CURRENT_CHANNEL_DATA(Number(id));
        }
      },
      async editingModal(id) {
        this.GET_CHANNEL_USERS(id).then(data => this.SET_CHANNEL_USERS(data));
        this.SET_MODAL("ModalChannelEdit");
        this.SET_CHANNEL_DATA(this.channelToEdit(id));
      },
      deletingModal(id) {
        this.SET_CHANNEL_ID_TO_DELETE(id);
        this.SET_MODAL("ModalChannelDelete");
      },
      setAddUsersModal(id) {
        this.SET_CONTACTS_FREE_TO_ADD_SEARCH([]);
        this.SET_MODAL("ModalChannelAddUsers");
        this.GET_CHANNEL_USERS(id)
          .then(data => this.SET_CHANNEL_USERS(data))
          .then(async () => {
            await this.SET_CONTACTS_FREE_TO_ADD(this.userContacts);
            this.SET_CONTACTS_FREE_TO_ADD_SEARCH(this.contactsToAdd);
          });
      }
    }
  };
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

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>