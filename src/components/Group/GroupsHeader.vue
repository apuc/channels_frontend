<template>
  <header class="chat-header">

    <div class="group-info" v-if="groupInfoIsOpened">
      <header class="group-info__header">
        <img src="../../assets/img/menu_channel.png"
             alt=""
             class="group-info__header-img"
        >
        <span class="group-info__header-text">Информация о группе</span>
      </header>
      
      <img v-if="currentGroupData.avatar" :src="currentGroupData.avatar.small"
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
              @click="CLOSE_GROUP_INFO()"
      >
        <v-icon name="chevron-up"></v-icon>
      </button>
    </div>
  </header>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import 'vue-awesome/icons/chevron-up';

  export default {
    computed: {
      ...mapGetters({
        currentGroupData: 'groups/currentGroupData',
        groupInfoIsOpened: 'groups/groupInfoIsOpened',
      })
    },
    data() {
      return {
      }
    },
    methods: {
      ...mapMutations('groups', [
        'OPEN_GROUP_INFO',
        'CLOSE_GROUP_INFO',
      ]),
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