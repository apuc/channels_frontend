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

  export default {
    name: "ContactsFriendshipRequests",
    computed: {
      ...mapGetters({
        userData: 'user/userData',
        friendshipRequests: 'user/friendshipRequests',
      }),
    },
    methods: {
      ...mapMutations({
        setCurrentUserData: 'user/SET_CURRENT_USER_DATA',
        removeUserRequestFromStore: 'user/REMOVE_USER_REQUEST_FROM_STORE',
        deleteModal: 'modal/DELETE_MODAL',
        addUserToContacts: 'user/ADD_USER_TO_CONTACTS',
      }),
      ...mapActions({
        acceptFriendshipRequest: 'user/ACCEPT_FRIENDSHIP_REQUEST',
        rejectFriendshipRequest: 'user/REJECT_FRIENDSHIP_REQUEST',
        getUserFriendshipRequests: 'user/GET_USER_FRIENDSHIP_REQUESTS',
        getCurrentUserData: 'user/GET_USER_DATA',
      }),
      goToProfile(id) {
        this.getCurrentUserData(id);
        this.deleteModal();
      },
      acceptRequest(user) {
        this.acceptFriendshipRequest({
          user_id: user.user_id,
          contact_id: this.userData.user_id
        })
          .then(() => {
            this.removeUserRequestFromStore(user.user_id);
            this.getUserFriendshipRequests();
          });
        if (this.friendshipRequests.length === 0) {
          this.$router.push({path: '/contacts'})
        }
        this.addUserToContacts(user);
      },
      rejectRequest(id) {
        this.rejectFriendshipRequest({
          user_id: this.userData.user_id,
          contact_id: id
        })
          .then(() => this.removeUserRequestFromStore(id));
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

  .image-wrap {
    width: 30px;
    height: 30px;
    margin-right: 10px;

    background-color: #cccccc;
    border-radius: 50%;
  }

  .img {
    display: block;
  }
</style>