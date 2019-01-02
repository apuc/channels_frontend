<template>
  <aside class="ads bg-light">
    <div class="wrap">
      <div v-if="userPosition === 'channel'">
        <img :src="channel.avatar ? channel.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'" alt="">

        <p>{{channel.title}}</p>
        <p>{{channel.status}}</p>
        <p>{{channel.type}}</p>
        <p>{{channel.private}}</p>
      </div>

      <div v-if="userPosition === 'group'">
        <img :src="group.avatar ? group.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e9022/hu0wa149Jn0.jpg?ava=1'" alt="">

        <p>{{group.title}}</p>
        <p>{{group.status}}</p>
      </div>

      <section class="channel-users" v-if="currentChannelData.channel_id">
        <h3>Пользователи канала</h3>
        <button type="button" class="btn btn-primary" @click="openModal">Все</button>

        <ul class="users-list">
          <li class="user"
              v-for="(user, index) in currentChannelUsersToShow"
              :key="user.email">
            <div>
              <div class="user-info">
                <div class="image-wrap">
                  <img class="img"
                       :src="user.avatar ? user.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
                       width="30" height="30" alt="">
                </div>

                <div>
                  <router-link :to="`/user/${user.user_id}`" @click.native="getCurrentUserData(user.user_id)">{{user.username}}
                  </router-link>
                </div>
              </div>
            </div>

            <button type="button"
                    class="btn btn-sm btn-primary mr10"
                    @click="makeFriendshipRequest($event.target, {user_id: userData.user_id, contact_id: user.user_id})"
                    v-if="userData.user_id !== currentChannelData.owner_id"
            >
              <v-icon scale="1" class="icon" name="user-plus"/>
            </button>
          </li>
        </ul>
      </section>
    </div>
  </aside>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "Advertisings",
    computed: {
      ...mapGetters({
        channel: 'channels/currentChannelData',
        currentChannelUsers: 'channels/currentChannelUsers',
        currentChannelData: 'channels/currentChannelData',
        group: 'groups/currentGroupData',
        userPosition: 'user/userPosition',
        userData: 'user/info',
      }),
      currentChannelUsersToShow() {
        if (this.currentChannelUsers.length > 4) {
          return this.currentChannelUsers.slice(0, 5)
        } else {
          return this.currentChannelUsers
        }
      }
    },
    data() {
      return {

      }
    },
    methods: {
      ...mapMutations({
        removeUserRequestFromStore: 'user/REMOVE_USER_REQUEST_FROM_STORE',
        deleteModal: 'modal/DELETE_MODAL',
        setModal: 'modal/SET_MODAL',
      }),
      ...mapActions({
        sendFriendshipRequest: 'user/SEND_FRIENDSHIP_REQUEST',
        getCurrentUserData: 'user/GET_USER_DATA',
      }),
      openModal() {
        this.setModal('ModalChannelUsers');
      },
      makeFriendshipRequest(target, data) {
        this.sendFriendshipRequest({user_id: data.user_id, contact_id: data.contact_id});
        target.remove();
      },
    }
  }
</script>

<style scoped>
  .ads {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100vh;
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