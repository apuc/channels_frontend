<template>
  <section class="list-group__item">
    <router-link :to="`/group/${data.slug}`"
                 class="list-group__link"
                 :title="data.title"
                 @click.native="setData($event, data.id, type)"
    >
      <img :src="data.avatar ? data.avatar.small : 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg'"
           alt=""
           class="avatar"
           width="50"
           height="50"
      >

      <img src="../../assets/img/folder.png"
           alt=""
           class="mr-2"
      >

      <span class="name">
        {{ data.title }}
      </span>
    </router-link>

    <div v-if="userData.user_id === data.owner_id"
         class="control"
    >
      <button type="button"
              class="button"
              @click="openChannelsAdding(data.id)">
        <img src="../../assets/img/plus.png" alt="">
      </button>

      <button type="button"
              class="button"
              @click="editThis(data.id)">
        <img src="../../assets/img/pencil.png" alt="">
      </button>

      <button type="button"
              class="button"
              @click="deletingModal(data.id)"
      >
        <img src="../../assets/img/bin.png" alt="">
      </button>
    </div>
  </section>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: "NavSectionGroups",
    computed: {
      ...mapGetters('groups', ['currentGroupData', 'groupToEdit', 'addingChannelsData']),
      ...mapGetters({
        channels: 'channels/channels',
        userData: 'user/userData',
      }),
    },
    props: {
      type: {
        type: String,
        required: true
      },
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        sectionWidth: 0,
        controlBtnsWidth: 0
      }
    },
    methods: {
      ...mapMutations('groups', [
        'SET_GROUP_DATA',
        'SET_GROUP_ID',
        'SET_CURRENT_GROUP_DATA',
        'SET_CURRENT_GROUP_CHANNELS_TO_SEARCH',
        'SET_GROUP_ID_TO_DELETE',
        'SET_GROUP_ID_FOR_ADDING_CHANNEL',
        'SET_AVAILABLE_CHANNELS_TO_ADD',
        'SET_CHANNELS_TO_SEARCH'
      ]),
      ...mapMutations({
        SET_USER_POSITION: 'user/SET_USER_POSITION',
        SET_MODAL: 'modal/SET_MODAL',
      }),
      ...mapActions({
        GET_GROUP_DATA: 'groups/GET_GROUP_DATA',
      }),
      async setData(e, id, type) {
        this.SET_USER_POSITION(type);
        await this.GET_GROUP_DATA(Number(id)).then(data => {
          this.SET_CURRENT_GROUP_DATA(data);
          this.SET_CURRENT_GROUP_CHANNELS_TO_SEARCH(data.channels);
        });

      },
      editThis(id) {
        this.SET_MODAL('ModalGroupEdit');
        this.SET_GROUP_ID(id);
      },
      deletingModal(id) {
        this.SET_MODAL('ModalGroupDelete');
        this.SET_GROUP_ID_TO_DELETE(id);
      },
      async openChannelsAdding(group_id) {
        this.SET_MODAL('ModalGroupAddChannels');
        await this.SET_AVAILABLE_CHANNELS_TO_ADD({group_id, channels: this.channels});
        this.SET_GROUP_ID_FOR_ADDING_CHANNEL(group_id);
        this.SET_CHANNELS_TO_SEARCH(this.addingChannelsData.availableChannels);
      },
    },
  }
</script>

<style scoped>
  .list-group {
    max-height: calc(100% - 100px);
  }

  .list-group__item,
  .control {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list-group__item {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }

  .list-group__item:hover {
    background-color: #f8f9fa;
  }

  .list-group__link {
    flex: 1 2 auto;
    display: flex;
    align-items: center;
    min-height: 100%;
    padding: 3px 7px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #495057;
  }

  .list-group__link:hover,
  .list-group__link:active,
  .list-group__link:focus {
    text-decoration: none;
  }

  h2 {
    font-size: 24px;
  }

  .avatar {
    margin-right: 15px;
    border-radius: 50%;
  }

  .button {
    padding: 2px 4px;

    font-size: 0;

    background-color: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.5;
  }

  .button:hover {
    opacity: 0.8;
  }

  .icon_mla {
    margin-left: auto;
    flex-shrink: 0;
  }

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>