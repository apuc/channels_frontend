<template>
  <header class="bg-light">
    <b-dropdown class="language-dropdown" variant="link">
      <button class="settings__btn" type="button" slot="button-content">
        <v-icon scale="1.6" class="icon" name="flag"/>
      </button>

      <b-dropdown-item
        v-for="lang in $ml.list"
        :key="lang"
        @click="$ml.change(lang)"
        v-text="lang"
      ></b-dropdown-item>
    </b-dropdown>

    <button type="button" class="btn btn-light" @click="SET_MODAL('ModalChannelUsers')">
      <span :class="fadeUsers" v-show="currentChannelData.count">
        {{currentChannelData.count}} {{getNoun(currentChannelData.count, 'пользователь', 'пользователя',
      'пользователей')}}
      </span>

      <span :class="fadePreloader" v-show="!currentChannelData.count">
        <v-icon scale="1.6" name="ellipsis-h"/>
      </span>
    </button>

    <button class="btn btn-primary exit" type="button" @click="LOGOUT">Exit</button>
  </header>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        currentChannelData: 'channels/currentChannelData',
      }),
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
        hidden: true,
      }
    },
    methods: {
      ...mapMutations({
        SET_MODAL: 'modal/SET_MODAL',
      }),
      ...mapActions({
        LOGOUT: 'auth/LOGOUT',
      }),
      getNoun(number, one, two, five) {
        number = Math.abs(number);
        number %= 100;
        if (number >= 5 && number <= 20) {
          return five;
        }
        number %= 10;
        if (number === 1) {
          return one;
        }
        if (number >= 2 && number <= 4) {
          return two;
        }
        return five;
      },
    },
  }
</script>

<style scoped>
  header {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    flex-shrink: 0;
  }

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