<template>
  <div class="modal-inside">
    <header class="form-group">
      <label for="user">Поиск по пользователям канала</label>
      <input id="user" class="form-control" type="text">
    </header>

    <div class="add-user">
      <label for="add-user" style="margin-right: 10px">Добавить пользователя</label>

      <div class="input-wrap">
        <input id="add-user" class="form-control add-user__input" type="text" :value="add_user" @input="findUser">

        <button type="button" class="btn" :class="disableButton" @click="addUser(add_user)">
          <v-icon scale="1" class="icon" name="plus-square"/>
        </button>
      </div>

      <p class="user-exist" v-if="isUserInChannel">This user exist.</p>
    </div>

    <ModalChannelUsersPreview/>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import ModalChannelUsersPreview from './ModalChannelUsersPreview';

  export default {
    name: "ModalChannelUsers",
    components: {ModalChannelUsersPreview},
    computed: {
      ...mapGetters({
        currentChannelUsers: 'channels/currentChannelUsers'
      }),
      disableButton() {
        return this.add_user.length > 0 && !this.isUserInChannel ? 'btn-primary' : 'btn-default disable';
      },
    },
    data() {
      return {
        add_user: '',
        isUserInChannel: false
      }
    },
    methods: {
      ...mapActions({
        addUser: 'channels/ADD_USER',
      }),
      findUser(e) {
        this.add_user = e.target.value;
        for (let i = 0; i < this.currentChannelUsers.length; i++) {
          this.isUserInChannel = this.currentChannelUsers[i].user_id === Number(this.add_user);
        }
      }
    },
  }
</script>

<style scoped>
  header,
  .add-user {
    display: flex;
    flex-direction: column;
  }

  .add-user,
  .input-wrap {
    display: flex;
  }

  .add-user__input {
    margin-right: 20px;
  }

  .disable {
    pointer-events: none;
  }

  .user-exist {
    color: rgba(255, 0, 0, 0.64);
  }
</style>