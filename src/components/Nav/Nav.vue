<template>
  <aside class="nav d-flex flex-column p-md-3 p-1">
    <div class="wrap">
      <header class="nav-header">
        <div class="mr-3"
             @mouseover="addMenuVisible = true"
             @mouseout="addMenuVisible = false"
        >
          <button class="addButton" type="button">
            <img src="../../assets/img/menu_icon.png" alt="">
          </button>

          <div class="dropdown" v-if="addMenuVisible">
            <p class="info-message text-uppercase">Внутреннее меню</p>
            <ul class="settings">
              <li class="settings__el">
                <router-link class="btn btn-link settings__link" to="/contacts">Контакты</router-link>
              </li>

              <li v-for="(elem, index) in info"
                  :key="index"
                  class="settings__el"
              >
                <button type="button"
                        class="btn btn-link settings__link"
                        @click="SET_MODAL({name: elem.modalTrigger})"
                >
                  {{elem.name}}
                </button>
              </li>

              <li class="settings__el">
                <router-link class="btn btn-link settings__link"
                             to="/contacts/search"
                             @click="LOGOUT"
                >
                  Поиск
                </router-link>
              </li>

              <li class="settings__el">
                <button class="btn btn-link settings__link"
                        type="button"
                        @click="LOGOUT"
                >
                  Выход
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="user">
          <div class="placeholder placeholder_user" v-if="isUserLoading"></div>

          <button type="button"
                  class="btn-profile"
                  v-else
                  @click="SET_MODAL({name: 'ModalEditProfile'})"
          >
            <img class="user__avatar-img"
                 :src="userAvatar"
                 alt=""
            >
            <span class="btn-profile__name">{{userData.username}}</span>
          </button>

          <router-link to="/contacts/requests"
                       class="requests"
                       v-if="friendshipRequests && friendshipRequests.length > 0"
                       @click="openRequests"
          >
            {{friendshipRequests.length}}
          </router-link>
        </div>
      </header>
      <nav>
        <div class="d-flex align-items-center mt-3">
          <img src="../../assets/img/menu_channel.png" alt="" class="mr-3">
          <span class="nav__divider">В вашем списке {{channels.length}} каналов</span>
        </div>

        <div class="mt-3">
          <drag v-for="channel in channels"
                :transfer-data="channel.id"
                :key="channel.id"
          >
            <NavSectionChannels v-if="filters.channelsVisible && !isChannelsLoading"
                                :type="'channel'"
                                :data="channel"
                                :value="isSidebarVisible"
                                @input="isSidebarVisibleHandler"
            />
          </drag>
        </div>

        <div class="d-flex align-items-center mt-3">
          <img src="../../assets/img/menu_channel.png" alt="" class="mr-3">
          <span class="nav__divider">В вашем списке {{groups.length}} групп</span>
        </div>

        <div class="mt-3">
          <drop v-for="group in groups"
                @drop="handleDrop(group.id, ...arguments)"
                :key="group.id"
          >
            <NavSectionGroups v-if="filters.groupsVisible && !isGroupsLoading"
                              :type="'group'"
                              :data="group"
                              :value="isSidebarVisible"
                              @input="isSidebarVisibleHandler"
            />
          </drop>
        </div>
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
    components: {NavSectionChannels, NavSectionGroups},
    computed: {
      ...mapGetters('user', ['userData', 'isUserLoading', 'friendshipRequests']),
      ...mapGetters('channels', ['channels', 'isChannelsLoading']),
      ...mapGetters('groups', ['groups', 'isGroupsLoading']),
      userAvatar() {
        return this.userData.avatar ? this.userData.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1';
      },
    },
    props: {
      isSidebarVisible: {
        type: Boolean,
        default: true
      }
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
          {
            name: 'Создать интеграцию',
            modalTrigger: 'ModalCreateIntegration'
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
        ADD_CHANNELS_TO_GROUP: 'groups/ADD_CHANNELS_TO_GROUP',
        LOGOUT: 'auth/LOGOUT',
      }),
      async handleDrop(group_id, data, event) {
        await this.SET_GROUP_ID_FOR_ADDING_CHANNEL(group_id);
        await this.ADD_CHANNELS_TO_GROUP([data]);
      },
      openRequests() {
        this.SET_MODAL({name: 'ModalUserContacts'})
      },
      isSidebarVisibleHandler(value) {
        this.$emit('input', value);
      }
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
    flex-grow: 1;
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

  /*.wrap {*/
    /*position: sticky;*/
    /*top: 0;*/
  /*}*/

  .nav-header {
    position: relative;
    z-index: 2;

    display: flex;
    align-items: center;
    height: 50px;
    padding: 0;
  }

  .addButton {
    position: relative;
    z-index: 2;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 17px;
    height: 17px;
    padding: 0;

    font-size: 22px;
    font-weight: 700;
    line-height: 1;
    color: white;

    background-color: transparent;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .addButton:hover {
    text-decoration: none;
  }

  .dropdown {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    display: flex;
    flex-direction: column;
    width: 190px;
    padding: 0 15px;

    background-color: white;
  }

  .info-message {
    align-self: flex-end;
    margin-top: 18px;

    font-size: 8px;
  }

  .settings {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    padding-top: 20px;

    list-style: none;
  }

  .settings__el {
    width: 100%;
    padding: 0;

    background-color: #fff;
  }

  .settings__link {
    padding-right: 0;
    padding-left: 0;

    font-size: 12px;
    font-weight: 400;
    color: black;
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

  .btn-profile {
    padding: 0;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .user__avatar-img {
    width: 30px;
    height: 30px;
    margin-right: 1rem;
    
    border-radius: 50%;
    object-fit: cover;
  }

  .btn-profile__name {
    font-size: 15px;
    text-decoration: underline;
    color: #125092;
  }

  .search {
    position: relative;
  }

  .search__icon {
    position: absolute;
    top: 50%;
    left: 10px;

    color: #bababa;
    transform: translateY(-50%);
  }

  .search__input {
    width: 100%;
    padding: 7px;
    padding-left: 35px;

    font-size: 14px;

    background-color: #f2f2f2;
    border: none;
    border-radius: 2px;
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

  .nav__divider {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.51);
  }

  .drop-zone {
    width: 100%;
    height: 100px;
    border: 1px solid;
  }
</style>