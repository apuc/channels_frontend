<template>
  <b-card class="mb-3" :class="user.id === myId ? 'dirRtl' : '' ">
    <b-media>
      <div class="flex">
        <a :href="'/user/' + user.slug" @click="openUserProfile($event, user)">
          <img :src="user.avatar" width="64" alt="placeholder"/>
        </a>

        <h5 class="mt-0">
          <a :href="'/user/' + user.slug" @click="openUserProfile($event, user)">{{user.name}}</a>
        </h5>
        <p class="text">{{message}}</p>
      </div>
    </b-media>

    <Modal :modalType="'userProfile'"
           :user="user"
           @onModalClose="closeModal($event)"
           v-if="isModalActive" />
  </b-card>
</template>

<script>

  import Modal from '../ModalWindows/Modal';
  export default {
    components: {Modal},
    data() {
      return {
        myId: 111,
        isModalActive: false
      }
    },
    props: {
      user: {
        name: String,
        avatar: String,
        slug: String,
        id: String
      },
      message: String
    },
    methods: {
      openUserProfile(e) {
        e.preventDefault();
        this.isModalActive = true;
        history.pushState('', 'Title of page', `/user/${this.user.slug}`);
      },
      closeModal(isModalActive) {
        this.isModalActive = isModalActive;
      }
    }
  }
</script>

<style scoped>
  .dirRtl {
    direction: rtl;
    text-align: right;
  }

  .flex {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .text {
    width: 100%;
  }
</style>