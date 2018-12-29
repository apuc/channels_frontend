<template>
  <div class="modal-inside">
    <ul class="users-list">
      <li class="user"
          v-for="(user, index) in contactsToAdd"
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

        <div>
          <button type="button"
                  class="btn btn-sm btn-primary mr10"
                  @click="addUserToChannel(user.user_id)"
          >
            <v-icon scale="1" class="icon" name="user-plus"/>
          </button>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "ModalChannelAddUsers",
    computed: {
      ...mapGetters({
        contactsToAdd: 'channels/contactsToAdd',
      }),
    },
    methods: {
      ...mapMutations({
        removeUserFromContactsToAdd: 'channels/REMOVE_USER_FROM_CONTACTS_TO_ADD',
      }),
      ...mapActions({
        addUser: 'channels/ADD_USER',
      }),
      addUserToChannel(user_id) {
        this.addUser(user_id)
          .then(() => this.removeUserFromContactsToAdd(user_id));
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