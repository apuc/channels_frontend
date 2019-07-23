<template>
  <section class="list-group__item">
    <router-link
      :to="`/${data.slug}`"
      class="list-group__link"
      :title="data.title"
      @click.native="setData($event.target, data.id, type)"
    >
      <img :src="data.avatar ? data.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
           alt=""
           class="avatar"
           width="50"
           height="50"
      >

      <span class="name">{{ data.title }}</span>
    </router-link>

    <div v-if="userData.user_id === data.owner_id" class="control">
      <button type="button"
              class="button tooltip-wrap"
              @click="setAddUsersModal(data.id)"
      >
        <span class="_tooltip">Добавить пользователя</span>
        <img src="../../assets/img/plus.png" alt="">
      </button>

      <button type="button"
              class="button tooltip-wrap"
              @click="editingModal(data.id)"
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
    computed: {
      ...mapGetters('channels', ['currentChannelData', 'contactsToAddUsers']),
      ...mapGetters('user', ['userData', 'userContacts']),
    },
    methods: {
      ...mapMutations('channels', [
        'SET_CHANNEL_ID_TO_DELETE',
        'SET_CHANNEL_ID',
        'SET_CONTACTS_FREE_TO_ADD',
        'SET_CONTACTS_FREE_TO_ADD_SEARCH',
        'SET_CONTACTS_TO_ADD_CHANNEL_ID',
      ]),
      ...mapMutations({
        SET_USER_POSITION: "user/SET_USER_POSITION",
        SET_MODAL: "modal/SET_MODAL"
      }),
      ...mapActions({
        SET_CURRENT_CHANNEL_DATA: 'channels/SET_CURRENT_CHANNEL_DATA',
        GET_MESSAGES: "messages/GET_MESSAGES"
      }),
      /**
       * Записывает данные канала на который переходит пользователь
       *
       * @param target {Element}
       * @param id {String|Number} - id канала
       * @param type {String} - канал или группа
       */
      setData(target, id, type) {
        this.SET_CURRENT_CHANNEL_DATA(Number(id));
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
  }

  .list-group__item:hover {
    background-color: #f8f9fa;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>