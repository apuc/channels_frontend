<template>
  <section class="list-group__item" @click="setData($event, data.channel_id)">
    <router-link
      :to="`/${data.slug}`"
      class="list-group__link"
      :title="data.title"
      @click.native="setUserPosition(type)"
    >
      <img :src="data.avatar.small" alt class="avatar" width="30" height="30" v-if="data.avatar">
      
      <span class="name">{{ data.title }}</span>
    </router-link>

    <div v-if="userData.user_id === data.owner_id" class="control">
      <button type="button" class="button" @click="setAddUsersModal(data.channel_id)">
        <v-icon scale="1" class="icon" name="plus-circle"/>
      </button>
      
      <button type="button" class="button" @click="editingModal(data.channel_id)">
        <v-icon scale="1" class="icon" name="pen"/>
      </button>
      
      <button type="button" class="button" @click="deletingModal(data.channel_id)">
        <v-icon scale="1" class="icon" name="trash-alt"/>
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "NavSectionChannels",
  computed: {
    ...mapGetters({
      currentChannelData: "channels/currentChannelData",
      contactsToAdd: "channels/contactsToAdd",
      channelToEdit: "channels/channelToEdit",
      userData: "user/info",
      userContacts: "user/userContacts"
    })
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
    ...mapMutations({
      removeCurrentChannelUsersFromStore:
        "channels/REMOVE_CURRENT_CHANNEL_USERS_FROM_STORE",
      setChannelIdToDelete: "channels/SET_CHANNEL_ID_TO_DELETE",
      setChannelData: "channels/SET_CHANNEL_DATA",
      setChannelUsers: "channels/SET_CHANNEL_USERS",
      setContactsFreeToAdd: "channels/SET_CONTACTS_FREE_TO_ADD",
      setContactsFreeToAddSearch: "channels/SET_CONTACTS_FREE_TO_ADD_SEARCH",
      setUserPosition: "user/SET_USER_POSITION",
      setModal: "modal/SET_MODAL"
    }),
    ...mapActions({
      setCurrentChannelData: "channels/SET_CURRENT_CHANNEL_DATA",
      getChannelUsers: "channels/GET_CHANNEL_USERS",
      getMessages: "messages/GET_MESSAGES"
    }),
    async setData(e, id) {
      if (!e.target.hasAttribute("type")) {
        await this.setCurrentChannelData(Number(id));
        this.getMessages();
        // this.removeCurrentChannelUsersFromStore();
      }
    },
    async editingModal(id) {
      this.getChannelUsers(id).then(data => this.setChannelUsers(data));
      this.setModal("ModalChannelEdit");
      this.setChannelData(this.channelToEdit(id));
    },
    deletingModal(id) {
      this.setChannelIdToDelete(id);
      this.setModal("ModalChannelDelete");
    },
    setAddUsersModal(id) {
      this.setContactsFreeToAddSearch([]);
      this.setModal("ModalChannelAddUsers");
      this.getChannelUsers(id)
        .then(data => this.setChannelUsers(data))
        .then(async () => {
          await this.setContactsFreeToAdd(this.userContacts);
          this.setContactsFreeToAddSearch(this.contactsToAdd);
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