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
      <span>Информация о канале</span>
    </button>

    <div class="group-info" v-if="isChatInfoOpened">
      <header class="group-info__header">
        <img src="../../assets/img/menu_channel.png"
             alt=""
             class="group-info__header-img"
        >
        <span class="group-info__header-text">Информация о канале</span>
      </header>

      <img v-if="currentChannelData.avatar"
           :src="currentChannelData.avatar.small"
           alt=""
           class="group-info__img"
      >

      <img v-else
           src="../../assets/img/no-avatar.png"
           alt=""
           class="group-info__img"
          
      >

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
              Кол-во пользователей {{currentChannelData.count}}
            </button>
          </li>

          <li class="info__li" v-if="userInCurrentChannel(userData.user_id)">
            <button type="button"
                    class="info__users-btn"
                    @click="setAddUsersModal(currentChannelData.id)"
            >
              Пригласить в канал
            </button>
          </li>

          <li class="info__li" v-if="currentChannelData.owner_id == userData.user_id">
            <button type="button"
                    class="info__users-btn"
                    @click="SET_MODAL({name:'ModalAddIntegrationToChannel'})"
            >
              Добавить интеграцию
            </button>
          </li>
          
          <li class="info__li" v-if="userInCurrentChannel(userData.user_id)">
            <button type="button"
                    class="info__users-btn"
                    @click="removeUserFromChannel"
            >
              Покинуть канал
            </button>
          </li>
          
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
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import commonMethods from "../../mixins/commonMethods";

  export default {
    mixins: [commonMethods],
      
    computed: {
        
      ...mapGetters({
        currentChannelData: 'channels/currentChannelData',
        userInCurrentChannel: 'channels/userInCurrentChannel',
        userData: 'user/userData',
      }),
        
      fadeUsers() {
        return this.currentChannelData.count ? 'fade-users_active' : 'fade-users'
      },
        
      fadePreloader() {
        return this.currentChannelData.count ? 'fade-preloader' : 'fade-preloader_active'
      },
    },
      
      
    data() {
      return {
        usersCount: null,
        isChatInfoOpened: false
      }
    },
      
      
    methods: {
      ...mapMutations({
        SET_MODAL: 'modal/SET_MODAL',
      }),
        
      ...mapMutations('channels', [
        'SET_CHANNEL_ID_TO_DELETE',
        'REMOVE_DELETED_CHANNEL_FROM_STORE',
        'SET_CONTACTS_FREE_TO_ADD_SEARCH',
        'SET_CONTACTS_TO_ADD_CHANNEL_ID',
      ]),
        
      ...mapActions({
        LOGOUT: 'auth/LOGOUT',
      }),
        
      ...mapActions('channels', [
        'DELETE_USER_FROM_CHANNEL',
        'DELETE_CHANNEL',
      ]),
        
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
      },

        /**
         * Открывает модалку добавления пользователя в канал
         */
        setAddUsersModal(id) {
            this.SET_CONTACTS_TO_ADD_CHANNEL_ID(id);
            this.SET_CONTACTS_FREE_TO_ADD_SEARCH([]);
            this.SET_MODAL({name: "ModalChannelAddUsers"});
        },

        /**
         * Покинуть канал
         * @returns {Promise<void>}
         */
      async removeUserFromChannel() {
        let title = 'Вы действительно хотите покинуть канал?';
        let text = '';
        const isUserOwner = this.userData.user_id === this.currentChannelData.owner_id;
        
        if (isUserOwner) text = 'При выходе канал будет удалён'; 

        const shouldLeave = await this.$swal({
          title,
          text,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Да',
          cancelButtonText: 'Нет'
        });
        
        if (shouldLeave.value) {
          if (isUserOwner) {
            this.SET_CHANNEL_ID_TO_DELETE(this.currentChannelData.id);
            this.DELETE_CHANNEL();
            this.$swal({
              toast: true,
              position: 'top',
              type: 'success',
              showConfirmButton: false,
              title: 'Вы покинули канал',
              timer: 4000,
            });
          } else {
            this.DELETE_USER_FROM_CHANNEL(this.userData.user_id)
              .then(response => {
                this.REMOVE_DELETED_CHANNEL_FROM_STORE(this.currentChannelData.id);
                this.$router.push('/');
                this.$swal({
                  toast: true,
                  position: 'top',
                  type: 'success',
                  showConfirmButton: false,
                  title: 'Вы покинули канал',
                  timer: 4000,
                });
              })
              .catch(error => this.$swal({
                toast: true,
                position: 'top',
                type: 'error',
                showConfirmButton: false,
                title: 'Произошла ошибка',
                text: error.body.errors.message,
                timer: 4000,
              }));
          }
        }
      },
    },
  }
</script>

<style scoped>
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
