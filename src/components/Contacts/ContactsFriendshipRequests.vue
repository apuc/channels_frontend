<template>
    <ul class="users-list">
      <li class="user"
          v-for="user in friendshipRequests"
          :key="user.email">
        <div>
          <div class="user-info">
            <div class="image-wrap">
              <img class="img"
                   :src="user.avatar ? user.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
                   width="30" height="30" alt="">
            </div>

            <div>
              <router-link :to="`/user/${user.user_id}`"
                           @click.native="goToProfile(user.user_id)"
              >
                {{user.username}}
              </router-link>
            </div>
          </div>
        </div>

        <div>
          <button type="button"
                  class="btn btn-sm btn-primary mr10"
                  @click="acceptRequest(user)"
          >
            <v-icon scale="1" class="icon" name="user-plus"/>
          </button>

          <button type="button"
                  class="btn btn-sm btn-danger"
                  @click="rejectRequest(user.user_id)"
          >
            <v-icon scale="1" class="icon" name="user-minus"/>
          </button>
        </div>
      </li>
    </ul>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import 'vue-awesome/icons/user-plus';
  import 'vue-awesome/icons/user-minus';

  export default {
    name: "ContactsFriendshipRequests",
      
    computed: {
      ...mapGetters('user', ['userData', 'friendshipRequests']),
    },
      
    methods: {
      ...mapMutations('user', ['REMOVE_USER_REQUEST_FROM_STORE', 'ADD_USER_TO_CONTACTS']),
        
      ...mapMutations({
        DELETE_MODAL: 'modal/DELETE_MODAL',
      }),
        
      ...mapActions('user', [
        'ACCEPT_FRIENDSHIP_REQUEST',
        'REJECT_FRIENDSHIP_REQUEST',
        'GET_USER_FRIENDSHIP_REQUESTS',
        'GET_USER_DATA'
      ]),

        /**
         * Перейти к профилю
          * @param id
         */ 
      goToProfile(id) {
        this.GET_USER_DATA(id);
        this.DELETE_MODAL();
      },

        /**
         * Принять запрос в друзья
          * @param user
         */ 
      acceptRequest(user) {
        this.ACCEPT_FRIENDSHIP_REQUEST({
          user_id: user.user_id,
          contact_id: this.userData.user_id
        })
          .then(() => {
            this.REMOVE_USER_REQUEST_FROM_STORE(user.user_id);
            this.GET_USER_FRIENDSHIP_REQUESTS();

              this.$swal({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  type: 'success',
                  title: `Пользователь ${user.username} добавлен в контакты!`
              })
          });
        
        if (this.friendshipRequests.length === 0) {
          this.$router.push({path: '/contacts'})
        }
        
        this.ADD_USER_TO_CONTACTS(user);
      },

        /**
         * Отклонить запрос в друзья
         * @param user
         */
        rejectRequest(id) {
            
        this.REJECT_FRIENDSHIP_REQUEST({
          user_id: id,
          contact_id: this.userData.user_id
        })
          .then(() => {
              this.REMOVE_USER_REQUEST_FROM_STORE(id)

              this.$swal({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 4000,
                  type: 'success',
                  title: `Запрос отклонен!`
              })
          });
        
        if (this.friendshipRequests.length === 0) {
          this.$router.push({path: '/contacts'})
        }
      }
    }
  }
</script>

<style scoped>
  .users-list {
    margin: 0;
    margin-top: 10px;
    padding: 0;
    overflow: auto;
    height: calc(100vh - 238px);
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
</style>