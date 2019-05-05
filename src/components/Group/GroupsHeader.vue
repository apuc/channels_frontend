<template>
  <header class="chat-header">
    <button type="button"
            class="info-btn"
            @click="isChatInfoOpened = true"
    >
      <img src="../../assets/img/info.png"
           alt=""
           class="mr-3"
      >
      <span>Информация о группе</span>
    </button>

    <div class="group-info" v-if="isChatInfoOpened">
      <header class="group-info__header">
        <img src="../../assets/img/menu_channel.png"
             alt=""
             class="group-info__header-img"
        >
        <span class="group-info__header-text">Информация о группе</span>
      </header>

      <img
        :src="currentGroupData.avatar ? currentGroupData.avatar.small : 'https://pp.userapi.com/c846524/v846524878/e3cbe/QHn1Jw-tZfA.jpg'"
        alt=""
        class="group-info__img"
      >

      <div class="group-info__info">
        <h2 class="info__title">{{currentGroupData.title}}</h2>
        <ul class="info__list">
          <li class="info__li">Статус группы - {{status()}}</li>
          <li class="info__li">Кол-во каналов - {{currentGroupData.channels.length}}</li>
        </ul>
      </div>

      <button type="button"
              class="group-info__close"
              @click="isChatInfoOpened = false"
      >
        <span class="group-info__close-text">Скрыть информацию</span>
        <v-icon name="chevron-up"></v-icon>
      </button>
    </div>
  </header>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        currentGroupData: 'groups/currentGroupData'
      })
    },
    data() {
      return {
        isChatInfoOpened: false,
      }
    },
    methods: {
      ...mapActions({
        LOGOUT: 'auth/LOGOUT',
      }),
      status() {
        const statuses = {
          active: 'активна',
          disable: 'не активна'
        };

        return statuses[this.currentGroupData.status];
      }
    }
  }
</script>

<style scoped>

</style>