<template>
  <aside class="nav d-flex flex-column p-0 bg-light">
    <div class="wrap">
      <header class="nav-header">
        <div @mouseover="addMenuVisible = true" @mouseout="addMenuVisible = false">
          <button class="addButton" type="button">
            <v-icon scale="1" class="icon" name="plus-circle"/>
          </button>

          <ul class="dropdown-settings" v-if="addMenuVisible">
            <li class="dropdown-settings__el">
              <router-link class="btn btn-link" to="/contacts">Контакты</router-link>
            </li>

            <li v-for="(elem, index) in info" class="dropdown-settings__el" :key="index">
              <button type="button" class="btn btn-link" @click="openModal($event, elem.modalTrigger)">{{elem.name}}
              </button>
            </li>

            <li class="dropdown-settings__el">
              <router-link class="btn btn-link" to="/contacts/search" @click="LOGOUT">Поиск</router-link>
            </li>

            <li class="dropdown-settings__el">
              <button class="btn btn-link" type="button" @click="LOGOUT">Exit</button>
            </li>
          </ul>
        </div>


        <div class="user">
          <div class="placeholder placeholder_user" v-if="isUserLoading"></div>

          <button type="button" class="btn btn-link" @click="openModal($event, 'ModalEditProfile')" v-else>
            <img class="user__avatar-img"
                 :src="userData.avatar ? userData.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'"
                 alt="">
            {{userData.username}}
          </button>

          <router-link to="/contacts/requests"
                  class="requests"
                  v-if="friendshipRequests.length > 0"
                  @click="openRequests"
          >
            {{friendshipRequests.length}}
          </router-link>
        </div>

        <div class="filters" v-if="channels.length > 0 && groups.length > 0">
          <button type="button" class="btn btn-primary filters__filter" data-filter="all" @click="navFilter">All</button>

          <button type="button"
                  class="btn btn-primary filters__filter"
                  data-filter="channel"
                  @click="navFilter"
          >
            <v-icon scale="1" class="icon" name="bullhorn"/>
          </button>

          <button type="button"
                  class="btn btn-primary filters__filter"
                  data-filter="group"
                  @click="navFilter"
          >
            <v-icon scale="1" class="icon" name="folder"/>
          </button>
        </div>
      </header>

      <nav>
        <drag v-for="channel in channels"
              :transfer-data="channel.id"
              :key="channel.id"
        >
          <NavSectionChannels v-if="filters.channelsVisible && !isChannelsLoading"
                              title="Каналы"
                              :type="'channel'"
                              :data="channel"
          />
        </drag>

        <drop v-for="group in groups"
              @drop="handleDrop(group.id, ...arguments)"
              :key="group.id"
        >
          <NavSectionGroups v-if="filters.groupsVisible && !isGroupsLoading"
                            title="Группы"
                            :type="'group'"
                            :data="group"
          />
        </drop>
      </nav>

      <div class="placeholder" v-if="isChannelsLoading || isGroupsLoading"></div>
    </div>
  </aside>
</template>

<script>
  import NavSectionChannels from './NavSectionChannels';
  import NavSectionGroups from './NavSectionGroups';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    components: {NavSectionChannels ,NavSectionGroups},
    computed: {
      ...mapGetters('user', ['userData', 'isUserLoading', 'friendshipRequests']),
      ...mapGetters('channels', ['channels', 'isChannelsLoading']),
      ...mapGetters('groups', ['groups', 'isGroupsLoading']),
    },
    data() {
      return {
        info: [
          {
            name: 'Создать канал',
            modalTrigger: 'ModalChannelCreate'
          },
          {
            name: 'Создать группу',
            modalTrigger: 'ModalGroupCreate'
          },
          {
            name: 'Редактировать профиль',
            modalTrigger: 'ModalEditProfile'
          },
        ],
        addMenuVisible: false,
        filters: {
          channelsVisible: true,
          groupsVisible: true,
        },
      }
    },
    methods: {
      ...mapMutations({
        SET_MODAL: 'modal/SET_MODAL',
        SET_GROUP_ID_FOR_ADDING_CHANNEL: 'groups/SET_GROUP_ID_FOR_ADDING_CHANNEL',
      }),
      ...mapActions({
        ADD_CHANNELS: 'groups/ADD_CHANNELS',
        LOGOUT: 'auth/LOGOUT',
      }),
      openModal(e, modalType) {
        e.preventDefault();
        this.SET_MODAL(modalType);
      },
      navFilter(e) {
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
      async handleDrop(group_id, data, event) {
        await this.SET_GROUP_ID_FOR_ADDING_CHANNEL(group_id);
        await this.ADD_CHANNELS([data]);
      },
      openRequests() {
        this.SET_MODAL('ModalUserContacts')
      }
    },
    async created() {
      this.filter = {
        channelsVisible: this.channels.length > 0,
        groupsVisible: this.groups.length > 0,
      };
    },

  }
</script>

<style scoped>
  .placeholder {
    width: 100%;
    height: 180px;

    background-image: radial-gradient(circle 15px at 20px, lightgray 99%, transparent 0),
    linear-gradient(lightgray 12px, transparent 0);
    background-size: 40px 45px, 80% 45px;
    background-position: 0 5px, 50px 21.5px;
    background-repeat: repeat-y;

    animation: shine 1.5s infinite;
  }

  .user {
    flex-grow: 0.9;
  }

  .placeholder_user {
    height: 50px;
  }

  @keyframes shine {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }

  .nav {
    flex-wrap: nowrap !important;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .wrap {
    position: sticky;
    top: 0;
  }

  .nav-header {
    position: relative;
    z-index: 2;

    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 5px;
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

  .dropdown-settings {
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

  .dropdown-settings__el {
    width: 100%;
    padding: 5px 15px;

    background-color: #fff;
  }

  .filters {
    display: flex;
    align-items: center;
    margin-left: auto;
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

  .user__avatar-img {
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border-radius: 50%;
    object-fit: cover;
  }

  .requests {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    padding: 2px;

    font-size: 12px;
    color: white;

    background-color: #ff5c43;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  .requests:hover {
    text-decoration: none;
  }

  .drop-zone {
    width: 100%;
    height: 100px;
    border: 1px solid;
  }
</style>