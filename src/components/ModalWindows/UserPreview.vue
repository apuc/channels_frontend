<template>
  <li>
    <div>
      <div class="user-info">
        <div class="image-wrap">
          <img v-if="avatar" :src="avatar" width="30" height="30" alt="">
        </div>

        <div>
          <router-link :to="`/user/${id}`" @click.native="goToUserProfile(id)">{{username}}</router-link>
        </div>
      </div>
    </div>

    <button type="button" class="btn btn-sm btn-danger" @click="removeUser(id)">
      <v-icon scale="1" class="icon" name="user-minus"/>
    </button>
  </li>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
  export default {
    name: "UserPreview",
    computed: {
      ...mapState('channels', ['currentChannelUsers'])
    },
    props: {
      username: String,
      id: [String, Number],
      avatar: [String, Boolean],
    },
    methods: {
      ...mapMutations({
        setCurrentUserData: 'user/SET_CURRENT_USER_DATA',
      }),
      ...mapActions({
        deleteUser: 'channels/DELETE_USER',
        closeModal: 'modal/CLOSE_MODAL_EDIT_MODE'
      }),
      removeUser(id) {
        this.deleteUser(id);
      },
      setUserData(id) {
        const getUser = this.currentChannelUsers.find(user => user.user_id === id);
        this.setCurrentUserData(getUser);
      },
      goToUserProfile(id) {
        this.setUserData(id);
        this.closeModal('channelUsers');
      }
    }
  }
</script>

<style scoped>
  li {
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

  img {
    display: block;
  }
</style>