<template>
  <aside class="ads">
    <div class="wrap">
      <div v-if="userPosition === 'channel'">
        <img
          :src="currentChannelData.avatar ? currentChannelData.avatar.average : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'"
          alt
        >

        <p>{{currentChannelData.title}}</p>
        <p>{{currentChannelData.status}}</p>
        <p>{{currentChannelData.type}}</p>
        <p>{{currentChannelData.private}}</p>
      </div>

      <div class="channel-users" v-if="currentChannelData.count > 0">
        <h3>Пользователи канала</h3>
        <button type="button" class="btn btn-primary" @click="SET_MODAL('ModalChannelUsers')">Все</button>

        <ul class="users-list">
          <li class="user" v-for="user in currentChannelUsersToShow" :key="user.email">
            <div class="user-info">
              <div class="image-wrap">
                <img
                  class="img"
                  :src="user.avatar ? user.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
                  width="30"
                  height="30"
                  alt
                >
              </div>

              <div>
                <router-link
                  :to="`/user/${user.user_id}`"
                  @click.native="GET_USER_DATA(user.user_id)"
                >
                  {{user.username}}
                </router-link>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-sm btn-primary mr10"
              @click="makeFriendshipRequest($event.target, {user_id: userData.user_id, contact_id: user.user_id})"
              v-if="userData.user_id !== user.user_id && !findUserContact(user.user_id)"
            >
              <v-icon scale="1" class="icon" name="user-plus"/>
            </button>
          </li>
        </ul>
      </div>

      <div v-if="userPosition === 'group'">
        <img
          :src="currentGroupData.avatar ? currentGroupData.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'"
          alt
        >

        <p>{{currentGroupData.title}}</p>
        <p>{{currentGroupData.status}}</p>
      </div>
    </div>
  </aside>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from "vuex";

  export default {
    name: "Advertisings",
    computed: {
      ...mapGetters('channels', [
        'currentChannelData',
        'currentChannelUsers',
      ]),
      ...mapGetters('user', [
        'userPosition',
        'userData',
        'findUserContact'
      ]),
      ...mapGetters({
        currentGroupData: "groups/currentGroupData",
      }),
      currentChannelUsersToShow() {
        if (this.currentChannelUsers.length > 4) {
          return this.currentChannelUsers.slice(0, 5);
        } else {
          return this.currentChannelUsers;
        }
      }
    },
    methods: {
      ...mapMutations({
        SET_MODAL: "modal/SET_MODAL"
      }),
      ...mapActions('user', ['SEND_FRIENDSHIP_REQUEST', 'GET_USER_DATA']),
      makeFriendshipRequest(target, data) {
        this.SEND_FRIENDSHIP_REQUEST({
          user_id: data.user_id,
          contact_id: data.contact_id
        });
        target.remove();
      }
    }
  };
</script>

<style scoped>
  .ads {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: calc(100vh - 68px);
    padding: 30px;

    box-sizing: border-box;
  }

  .wrap {
    position: sticky;
    top: 30px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  img {
    width: 100%;
    height: auto;
  }

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
</style>