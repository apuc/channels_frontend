<template>
  <section class="list-group__item"
           :class="{active: true, 'list-group__item_active': data.id === currentChannelData.id}"
  >
    <div class="notification-block" v-if="notifications[data.id]">
      <span v-if="notifications[data.id]<=99">{{notifications[data.id]}}</span>
      <span v-else class="point_text">99+</span>
    </div>
    <router-link
      :to="`/${data.slug}`"
      class="list-group__link"
      :title="data.title"
      @click.native="onChannelChangeHandler($event.target, data.id, type)"
    >
      <img :src="data.avatar.small"
           alt=""
           class="avatar"
           width="50"
           height="50"
      >
      <span class="name">{{ data.title }}</span>
    </router-link>

    <div v-if="userData.user_id === data.owner_id || data.channel_type === 'dialog'" class="control">
      <button
        type="button"
        class="button tooltip-wrap"
        @click="setAddUsersModal(data.id)"
        v-if="data.channel_type != 'dialog'"
      >
        <span class="_tooltip">Добавить пользователя</span>
        <img src="../../assets/img/plus.png" alt="">
      </button>

      <button
        type="button"
        class="button tooltip-wrap"
        @click="editingModal(data.id)"
        v-if="data.channel_type != 'dialog'"
      >
        <span class="_tooltip">Редактировать</span>
        <img src="../../assets/img/pencil.png" alt="">
      </button>

      <button type="button"
              class="button tooltip-wrap"
              @click="deletingModal(data.id)"
      >
        <span class="_tooltip">Удалить</span>
        <img src="../../assets/img/bin.png" alt="">
      </button>
    </div>
  </section>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from "vuex";

export default {
  name: "NavSectionChannels",

  props: {
    // isSidebarVisible
    value: {
      type: Boolean
    },
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    notification: {
      type: Boolean,
      required: true,
    }
  },

  data() {
    return {
    };
  },

  created(){
    //@TODO надо что-то сделать с этим жутким костылем))
    if(this.data.unread_count > 0 && !this.$parent.hasOwnProperty('noChannels')){
      this.SET_CHANNEL_NOTIFICATION({channel_id:this.data.id,unread:this.data.unread_count})
    }
  },

  computed: {
    ...mapGetters('channels', ['currentChannelData', 'contactsToAddUsers']),
    ...mapGetters('user', ['userData', 'userContacts']),
    ...mapGetters('messages', ['notifications']),
    ...mapGetters('common', ['deviceIsMobile']),
  },

  methods: {
    ...mapMutations('channels', [
      'TOGGLE_CHANNEL_LOADING',
      'SET_CHANNEL_ID_TO_DELETE',
      'SET_CHANNEL_ID',
      'SET_CONTACTS_FREE_TO_ADD',
      'SET_CONTACTS_FREE_TO_ADD_SEARCH',
      'SET_CONTACTS_TO_ADD_CHANNEL_ID',
    ]),
    ...mapMutations({
      SET_USER_POSITION: "user/SET_USER_POSITION",
      SET_MODAL: "modal/SET_MODAL",
      READ_CHANNEL_MESSAGES: "messages/READ_CHANNEL_MESSAGES",
      SET_CHANNEL_NOTIFICATION: "messages/SET_CHANNEL_NOTIFICATION",
      CLOSE_SIDEBAR: "nav/CLOSE_SIDEBAR",
    }),
    ...mapActions({
      SET_CURRENT_CHANNEL_DATA: 'channels/SET_CURRENT_CHANNEL_DATA',
      GET_MESSAGES: "messages/GET_MESSAGES",
      MARK_READ: "messages/MARK_READ",
      MARK_READ_CHAT: "messages/MARK_READ_CHAT",
    }),


    /**
     * Записывает данные канала на который переходит пользователь
     *
     * @param target {Element}
     * @param id {String|Number} - id канала
     * @param type {String} - канал или группа
     */
    setData(target, id, type) {
      // закрывает сайдбар на маленьких экранах

      this.TOGGLE_CHANNEL_LOADING();

      this.SET_CURRENT_CHANNEL_DATA(Number(id)).then(res => {

        this.TOGGLE_CHANNEL_LOADING();

        if(this.data.channel_type == 'dialog' || this.data.type == 'dialog'){
          this.MARK_READ(id);
        }else{
          this.MARK_READ_CHAT(id);
        }
      });

      this.SET_USER_POSITION(type);
    },


    /**
     * Открывает модалку редактирования и устанавливает id канала в state.channelData
     *
     * @param id {Number|String} - id канала, который будет редактироваться
     */
    editingModal(id) {
      this.SET_CHANNEL_ID(id);
      this.SET_MODAL({name: "ModalChannelEdit"});
    },


    /**
     * Открывает модалку удаления и устанавливает id канала в state.channelToDelete
     *
     * @param id {Number|String} - id канала, который будет удаляться
     */
    deletingModal(id) {
      this.SET_CHANNEL_ID_TO_DELETE(id);
      this.SET_MODAL({name: "ModalChannelDelete"});
    },


    /**
     * Открывает модалку добавления пользователей в канал
     *
     * @param id {Number|String} - id канала, в который будут добавляться пользователи,
     *                             записывается в  state.contactsToAdd.channelId
     */
    setAddUsersModal(id) {
      this.SET_CONTACTS_TO_ADD_CHANNEL_ID(id);
      this.SET_CONTACTS_FREE_TO_ADD_SEARCH([]);
      this.SET_MODAL({name: "ModalChannelAddUsers"});
    },


    /**
     * При переходе на канал
     * @param target
     * @param id
     * @param type
     */
    onChannelChangeHandler(target, id, type) {
      if(id !== this.currentChannelData.id && !this.$store.state['channels'].isChannelLoading){
        this.setData(target, id, type);
        if(this.deviceIsMobile) {
          this.CLOSE_SIDEBAR();
        }
      }
    }
  }
};
</script>

<style scoped>
.point_text{
  font-size: 9px;
}
.list-group__item,
.control {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-group__item {
  background-color: #fff;
}

.list-group__item{
  position: relative;
}

.notification-block {
  position: absolute;
  left: 0;
  top: 2px;
  color: white;
  width: 18px;
  height: 18px;
  background-color: red;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-group__item:hover {
  background-color: #f8f9fa;
}

.list-group__item_active,.list-group__item_active:hover {
  background-color: rgba(112, 151, 255, 0.4);
  border-radius: 6px;
  padding: 3px;
}

.list-group__link {
  flex: 1 2 auto;
  display: flex;
  align-items: center;
  min-height: 100%;
  padding: 3px 0;

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

.button {
  padding: 2px 4px;

  font-size: 0;

  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;
}

.button:hover {
  opacity: 0.8;
}

.name {
  flex: 1 0 calc(100% - 65px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 576px) {
  .name {
    flex-basis: calc(100% - 45px);
  }
}
</style>