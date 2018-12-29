<template>
  <ul class="users-list" ref="usersList">
    <li class="user"
        v-for="(user, index) in searchResultsUsers"
        :key="user.email">
      <div>
        <div class="user-info">
          <div class="image-wrap">
            <img class="img"
                 :src="user.avatar ? user.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
                 width="30" height="30" alt="">
          </div>

          <div>
            <router-link :to="`/user/${user.user_id}`" @click.native="goToProfile(user.user_id)">{{user.username}}
            </router-link>
          </div>
        </div>
      </div>

      <button type="button"
              class="btn btn-sm btn-primary mr10"
              @click="makeFriendshipRequest($event.target, {user_id: userData.user_id, contact_id: user.user_id})"
      >
        <v-icon scale="1" class="icon" name="user-plus"/>
      </button>
    </li>
  </ul>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "ContactsSearchUsersResult",
    data() {
      return {
        options: {
          rootMargin: '0px',
          threshold: 1.0
        },
        usersList: this.$refs.usersList,
        observer: {}
      }
    },
    computed: {
      ...mapGetters({
        userData: 'user/info',
        searchResultsUsers: 'user/searchResultsUsers',
        searchResultsPages: 'user/searchResultsPages',
        searchResultsCurrentPage: 'user/searchResultsCurrentPage',
      })
    },
    methods: {
      ...mapMutations({
        setCurrentUserData: 'user/SET_CURRENT_USER_DATA',
        removeUserRequestFromStore: 'user/REMOVE_USER_REQUEST_FROM_STORE',
        deleteModal: 'modal/DELETE_MODAL',
      }),
      ...mapActions({
        sendFriendshipRequest: 'user/SEND_FRIENDSHIP_REQUEST',
        getCurrentUserData: 'user/GET_USER_DATA',
        findUsers: 'user/FIND_USERS',
      }),
      goToProfile(id) {
        this.getCurrentUserData(id);
        this.deleteModal();
      },
      makeFriendshipRequest(target, data) {
        this.sendFriendshipRequest({user_id: data.user_id, contact_id: data.contact_id});
        target.remove();
      },
      observerMethod(entries, observer) {
        if (this.searchResultsCurrentPage <= this.searchResultsPages) {
          this.findUsers({search_request: '', page: this.searchResultsCurrentPage + 1})
        }
      }
    },
    mounted() {
      this.observer = new IntersectionObserver(this.observerMethod, this.options);
      this.usersList = this.$refs.usersList;
      const users = this.usersList.querySelectorAll('.user');
      const lastUser = users[users.length - 1];
      this.observer.observe(lastUser);
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