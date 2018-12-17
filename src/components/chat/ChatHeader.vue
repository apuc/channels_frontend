<template>
  <header class="bg-light">
    <div class="settings" @mouseover="settingsVisible = true" @mouseout="settingsVisible = false">
      <button type="button" class="settings__btn">
        <v-icon scale="1.6" name="cog"/>
      </button>

      <div class="settings__list" v-if="settingsVisible">
        <ul class="list">
          <li class="list__el" v-for="(setting, index) in settingsList">
            <a :href="setting.link">{{ setting.name }}</a>
          </li>
        </ul>
      </div>
    </div>

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

    <button type="button" class="btn btn-light" @click="openModal">
      <span :class="fadeUsers" v-show="channelData.user_count">
        {{channelData.user_count}} {{getNoun(channelData.user_count, 'пользователь', 'пользователя',
      'пользователей')}}
      </span>

      <span :class="fadePreloader" v-show="!channelData.user_count">
        <v-icon scale="1.6" name="ellipsis-h"/>
      </span>
    </button>

    <button class="btn btn-primary exit" type="button" @click="logout">Exit</button>
  </header>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        channelData: 'channels/currentChannelData',
        channels: 'channels/channels',
      }),
      fadeUsers() {
        return this.channelData.user_count ? 'fade-users_active' : 'fade-users'
      },
      fadePreloader() {
        return this.channelData.user_count ? 'fade-preloader' : 'fade-preloader_active'
      }
    },
    data() {
      return {
        settingsList: [
          {
            name: 'Настройки канала',
            link: 'https://github.com'
          },
          {
            name: 'Настройки чего-нибудь ещё',
            link: 'https://github.com'
          },
          {
            name: 'Настройки профиля',
            link: 'https://github.com'
          },
        ],
        settingsVisible: false,
        usersCount: null,
        hidden: true,
      }
    },
    methods: {
      ...mapMutations({
        setModal: 'modal/SET_MODAL',
      }),
      ...mapActions({
        logout: 'auth/LOGOUT',
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
      openModal() {
        this.setModal('ChannelUsers');
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