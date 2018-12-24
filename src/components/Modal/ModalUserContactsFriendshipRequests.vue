<template>
  <ul class="users-list">
    <li class="user"
        v-for="(user, index) in friendshipRequests"
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
                         @click.native="goToUserProfile(user.user_id)"
            >
              {{user.username}}
            </router-link>
          </div>
        </div>
      </div>

      <div>
        <button type="button"
                class="btn btn-sm btn-primary mr10"
                @click="acceptRequest(user.user_id)"
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
    name: "ModalUserContactsFriendshipRequests",
    computed: {
      ...mapGetters({
        userData: 'user/info',
        friendshipRequests: 'user/friendshipRequests',
      }),
    },
    methods: {
      ...mapMutations({
        setCurrentUserData: 'user/SET_CURRENT_USER_DATA',
        removeUserRequestFromStore: 'user/REMOVE_USER_REQUEST_FROM_STORE',
        deleteModal: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        acceptFriendshipRequest: 'user/ACCEPT_FRIENDSHIP_REQUEST',
        rejectFriendshipRequest: 'user/REJECT_FRIENDSHIP_REQUEST',
        getUserFriendshipRequests: 'user/GET_USER_FRIENDSHIP_REQUESTS',
      }),
      setUserData(id) {
        const getUser = this.friendshipRequests.find(user => user.user_id === id);
        this.setCurrentUserData(getUser);
      },
      goToUserProfile(id) {
        this.setUserData(id);
        this.deleteModal();
      },
      acceptRequest(id) {
        this.acceptFriendshipRequest({
          user_id: id,
          contact_id: this.userData.user_id
        })
          .then(() => {
            this.removeUserRequestFromStore(id);
            this.getUserFriendshipRequests();
          });
      },
      rejectRequest(id) {
        this.rejectFriendshipRequest({
          user_id: this.userData.user_id,
          contact_id: id
        })
          .then(() => this.removeUserRequestFromStore(id));
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