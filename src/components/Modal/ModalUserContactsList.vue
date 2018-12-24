<template>
  <div v-if="userContacts.length === 0">
    <p>Ваш список контактов пуст, вы можете найти своих друзей:</p>

    <ModalSearchUsersForm/>
    <ModalSearchUsersResult v-if="searchResults"/>
  </div>

  <ul class="users-list" v-else>
    <li class="user"
        v-for="(user, index) in userContacts"
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

      <button type="button"
              class="btn btn-sm btn-danger"
              @click="removeUserFromContacts(user.user_id)"
      >
        <v-icon scale="1" class="icon" name="user-minus"/>
      </button>
    </li>
  </ul>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import ModalSearchUsersForm from "./ModalSearchUsersForm";
  import ModalSearchUsersResult from "./ModalSearchUsersResult";

  export default {
    name: "ModalUserContactsList",
    components: {ModalSearchUsersResult, ModalSearchUsersForm},
    computed: {
      ...mapGetters({
        userData: 'user/info',
        userContacts: 'user/userContacts',
        searchResults: 'user/searchResults'
      }),
    },
    methods: {
      ...mapMutations({
        setCurrentUserData: 'user/SET_CURRENT_USER_DATA',
        removeUserRequestFromStore: 'user/REMOVE_USER_REQUEST_FROM_STORE',
        deleteModal: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        rejectFriendshipRequest: 'user/REJECT_FRIENDSHIP_REQUEST',
      }),
      setUserData(id) {
        const getUser = this.friendshipRequests.find(user => user.user_id === id);
        this.setCurrentUserData(getUser);
      },
      goToUserProfile(id) {
        this.setUserData(id);
        this.deleteModal();
      },
      removeUserFromContacts(id) {
        this.rejectFriendshipRequest({
          user_id: this.userData.user_id,
          contact_id: id
        })
          .then(() => this.removeUserRequestFromStore(id));
      }
    },
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