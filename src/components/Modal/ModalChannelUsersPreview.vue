<template>
  <div class="placeholder" 
       v-if="isChannelUsersLoading"
       :style="calculatePlaceholders"
  ></div>

  <ul class="users-list" v-else>
    <li class="user" v-for="user in currentChannelSearchUsers" :key="user.email">
      <div class="mr-1">
        <div class="user-info">
          <div class="image-wrap">
            <img class="img"
                 :src="user.avatar.small"
                 width="30" height="30" alt="">
          </div>

          <div>
            <router-link :to="`/user/${user.user_id}`"
                         @click.native="goToProfile(user.user_id)"
            >
              {{user.username}} 
              <span v-if="user.user_id === currentChannelData.owner_id" class="owner">(создатель канала)</span>
              <span v-if="user.is_bot" class="owner">(бот)</span>
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="isAuthenticated">
        <button type="button"
                class="btn btn-sm btn-primary mr10"
                title="Добавить в друзья"
                @click="makeFriendshipRequest($event.target, {user_id: userData.user_id, contact_id: user.user_id})"
                v-if="userData.user_id !== user.user_id && !findUserContact(user.user_id) && !findFriendshipRequest(user.user_id) && !user.is_bot"
        >
          <v-icon scale="1" class="icon" name="user-plus"/>
        </button>

        <button v-if="userData.user_id === currentChannelData.owner_id 
                     && user.user_id !== currentChannelData.owner_id"
                type="button"
                class="btn btn-sm btn-danger"
                title="Удалить из канала"
                @click="removeUserFromChannel(user.user_id)"
        >
          <v-icon scale="1" class="icon" name="user-minus"/>
        </button>
      </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex';

  export default {
    name: "ModalChannelUsersPreview",
      
    computed: {
      ...mapGetters('channels', ['isChannelUsersLoading', 'currentChannelData', 'currentChannelSearchUsers']),
      ...mapGetters('user', ['userData', 'findUserContact','findFriendshipRequest']),
      ...mapGetters('auth', ['isAuthenticated']),
        
      calculatePlaceholders() {
        const height = 45;
        if (this.currentChannelData.count < 5 && this.currentChannelData.count > 0) {
          return `height: ${height * this.currentChannelData.count}px`
        } else {
          return 'height: 135px'
        }
      }
    },
      
    data() {
      return {}
    },
      
    methods: {
      ...mapMutations({
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),
        
      ...mapActions('user', ['SEND_FRIENDSHIP_REQUEST', 'GET_USER_DATA']),
        
      ...mapActions({
        DELETE_USER_FROM_CHANNEL: 'channels/DELETE_USER_FROM_CHANNEL',
        GET_CHANNEL_USERS: 'channels/GET_CHANNEL_USERS',
        SET_CURRENT_CHANNEL_USERS: 'channels/SET_CURRENT_CHANNEL_USERS',
      }),

        /**
         * Перейти к профилю
          * @param id
         */ 
      goToProfile(id) {
        this.GET_USER_DATA(id);
        this.DELETE_MODAL();
      },

        /**
         * Добавить в друзья
         * @param target
         * @param data
         */
      makeFriendshipRequest(target, data) {
        this.SEND_FRIENDSHIP_REQUEST({
          user_id: data.user_id,
          contact_id: data.contact_id
        }).then(res => {
            this.$swal({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                type: 'success',
                title: 'Запрос отправлен!'
            })
        });
        
        target.closest('button').remove();
      },

        /**
         * Удалить пользователя из канала
         * @param userId
         */
      removeUserFromChannel(userId) {
        this.DELETE_USER_FROM_CHANNEL(userId)
          .then(response => {
            this.$swal({
              toast: true,
              position: 'top',
              type: 'success',
              showConfirmButton: false,
              title: 'Пользователь удалён',
              timer: 4000,
            });
            
            this.GET_CHANNEL_USERS(this.currentChannelData.id)
              .then(users => this.SET_CURRENT_CHANNEL_USERS(users));
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
  }
</script>

<style scoped>
  .users-list {
    max-height: 300px;
    margin: 0;
    margin-top: 10px;
    padding: 0;
    overflow: auto;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 3px;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .img {
    display: block;
  }

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
  
  .owner{
    color: black;
    font-weight: bold;
    font-size: 12px;
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
</style>
