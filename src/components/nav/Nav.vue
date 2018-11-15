<template>
  <aside class="nav d-flex flex-column col-md-2 p-0 bg-light">
    <header class="nav-header">
      <div @mouseover="addMenuVisible = true" @mouseout="addMenuVisible = false">
        <button class="addButton" type="button">
          <v-icon scale="1" class="icon" name="plus-circle"/>
        </button>

        <ul class="dropdown" v-if="addMenuVisible">
          <li v-for="(elem, index) in info" class="dropdown__el">
            <button type="button" class="btn btn-link" @click="openModal($event, elem.modalTrigger)">{{elem.name}}</button>
          </li>
        </ul>
      </div>

      <div class="user">
        <div class="user__avatar">
          <img :src="userData.avatar ? userData.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'" alt="">
        </div>

        <div class="user__name">
          <button type="button" class="btn btn-link" @click="openModal($event, 'editProfile')">{{userData.username}}</button>
        </div>
      </div>

      <div class="filters">
        <button type="button" class="btn btn-primary filters__filter" data-filter="all" @click="filter">All</button>

        <button type="button" class="btn btn-primary filters__filter" data-filter="channel" @click="filter">
          <v-icon scale="1" class="icon" name="bullhorn"/>
        </button>

        <button type="button" class="btn btn-primary filters__filter" data-filter="group" @click="filter">
          <v-icon scale="1" class="icon" name="folder"/>
        </button>
      </div>
    </header>

    <NavSection title="Каналы"
                :itemsList="channels"
                :type="'channel'"
                v-if="filters.channelsVisible"/>
    <NavSection title="Группы"
                :itemsList="groups"
                :type="'group'"
                v-if="filters.groupsVisible"/>
  </aside>
</template>

<script>
  import NavSection from './NavSection';
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import {joinChannels} from '../../services/socket/channels.service'

  export default {
    computed: {
      ...mapGetters({
        groups: 'groups/groups',
        channels: 'channels/channels',
        userData: 'user/info',
        authStatus: 'auth/authStatus',
      }),
    },
    data() {
      return {
        info: [
          {
            name: 'Создать канал',
            modalTrigger: 'channel'
          },
          {
            name: 'Создать группу',
            modalTrigger: 'group'
          },
          {
            name: 'Редактировать профиль',
            modalTrigger: 'editProfile'
          }
        ],
        addMenuVisible: false,
        filters: {
          channelsVisible: true,
          groupsVisible: true,
        },
        // interval: setInterval(() => {
        //   this.setIntervalForNav();
        // }, 200)
      }
    },
    components: {
      NavSection
    },
    methods: {
      ...mapMutations({
        setModal: 'modal/SET_MODAL',
      }),
      ...mapActions({
        getNav: 'user/GET_NAV',
      }),
      openModal(e, modalType) {
        e.preventDefault();
        this.setModal(modalType);
      },
      filter(e) {
        const target = e.target;
        const filterType = target.getAttribute('data-filter');

        switch (filterType) {
          case 'all':
            this.filters.channelsVisible = true;
            this.filters.groupsVisible = true;
            break;
          case 'channel':
            this.filters.channelsVisible = true;
            this.filters.groupsVisible = false;
            break;
          case 'group':
            this.filters.channelsVisible = false;
            this.filters.groupsVisible = true;
            break;
          default:
            break;
        }
      },
      // setIntervalForNav() {
      //   if (this.authStatus !== 'loading') {
      //     console.log(this.authStatus);
      //     clearInterval(this.interval);
      //     this.getNav();
      //   }
      // }
    },
    async created() {
      joinChannels(this.channels);
    },

  }
</script>

<style scoped>
  .nav-header {
    position: relative;
    z-index: 2;

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 5px;
  }

  .nav {
    flex-wrap: nowrap !important;
    height: 100%;
    overflow: auto;
  }

  .addButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;

    font-size: 22px;
    font-weight: 700;
    line-height: 1;
    color: white;

    background-color: #1082CF;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  .addButton:hover {
    text-decoration: none;
  }

  .dropdown {
    position: absolute;
    top: 85%;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;

    list-style: none;
    background-color: transparent;
    border-top: 10px solid transparent;
  }

  .dropdown__el {
    width: 100%;
    padding: 5px 15px;

    background-color: #fff;
  }

  .filters {
    display: flex;
    align-items: center;
  }

  .filters__filter {
    width: 30px;
    height: 30px;
    margin-right: 5px;
    padding: 2px 5px;
  }

  .filters__filter:last-child {
    margin-right: 0;
  }

  .user {
    display: flex;
    align-items: center;
    margin: 0;
  }

  .user__avatar {
    width: 25px;
    height: 25px;
    margin-right: 5px;

    border-radius: 50%;
    overflow: hidden;
  }

</style>