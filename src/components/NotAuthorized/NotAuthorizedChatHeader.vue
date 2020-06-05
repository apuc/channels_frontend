<template>
  <header class="chat-header">

    <div class="group-info" v-if="isChatInfoOpened">
      <header class="group-info__header">
        <img src="../../assets/img/menu_channel.png"
             alt=""
             class="group-info__header-img"
        >
        <span class="group-info__header-text">Информация о канале</span>
      </header>

      <div class="group-info__info">
        <h2 class="info__title">{{currentChannelData.title}}</h2>
        <ul class="info__list">
          <li class="info__li">Статус - {{status()}}</li>
          <li class="info__li">Тип канала - {{type()}}</li>
          <li class="info__li">{{isPrivate()}}</li>
          <li class="info__li">
            <button type="button"
                    class="info__users-btn"
                    @click="SET_MODAL({name: 'ModalChannelUsers'})"
            >
              Пользователей: {{currentChannelData.count}}
            </button>
          </li>
        </ul>
      </div>

      <button type="button"
              class="group-info__close"
              @click="CLOSE_CHANNEL_INFO()"
      >
        <v-icon name="chevron-up"></v-icon>
      </button>
    </div>
  </header>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import commonMethods from "../../mixins/commonMethods";

  export default {
    mixins: [commonMethods],
    computed: {
      ...mapGetters('channels', ['currentChannelData']),
      fadeUsers() {
        return this.currentChannelData.count ? 'fade-users_active' : 'fade-users'
      },
      fadePreloader() {
        return this.currentChannelData.count ? 'fade-preloader' : 'fade-preloader_active'
      }
    },
    data() {
      return {
        usersCount: null,
        isChatInfoOpened: false
      }
    },
    methods: {
      ...mapMutations({
        setModal: 'modal/SET_MODAL',
      }),
      openModal() {
        this.setModal('ModalChannelUsers');
      },
      status() {
        const statuses = {
          active: 'активный',
          disable: 'не активный',
        };

        return statuses[this.currentChannelData.status];
      },
      type() {
        const types = {
          wall: 'стена',
          dialog: 'диалог',
          chat: 'чат'
        };

        return types[this.currentChannelData.type];
      },
      isPrivate() {
        const types = {
          '0': 'Публичный',
          '1': 'Приватный'
        };

        return types[this.currentChannelData.private]
      }
    },
  }
</script>

<style scoped>
  .settings {
    position: relative;
    z-index: 1;
  }

  .settings__btn {
    padding: 5px;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .settings__list {
    position: absolute;
    left: 0;
    z-index: 2;

    width: 200px;

    background-color: #fff;
  }

  .list {
    padding: 10px;
    list-style: none;
  }

  .list__el {
    padding: 8px 0;
    line-height: 1.2;
  }

  .icon {
    color: #ffeeba;
    stroke: blue;
    stroke-width: 15px;
  }

  .exit {
    margin-left: auto;
  }

  .fade-preloader_active,
  .fade-users_active {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .fade-preloader,
  .fade-users {
    opacity: 0;
    transition: opacity 0.5s;
  }
</style>