<template>
  <section class="list-group__item"
           @click="setData($event, data.id)"
  >
    <router-link :to="`/group/${data.slug}`"
                 class="list-group__link"
                 :title="data.title"
                 @click.native="setUserPosition(type)"
    >
      <img :src="data.avatar.small"
           alt=""
           class="avatar"
           width="30"
           height="30"
           v-if="data.avatar">

      <span class="name">
        {{ data.title }}
      </span>

      <v-icon scale="1" class="icon icon_mla" name="folder" v-if="type === 'group'"/>
    </router-link>

    <div v-if="userData.user_id === data.owner_id"
         class="control"
    >
      <button type="button"
              class="button"
              @click="openChannelsAdding(data.id)">
        <v-icon scale="1" class="icon" name="plus-circle"/>
      </button>

      <button type="button"
              class="button"
              @click="editThis(data.id)">
        <v-icon scale="1" class="icon" name="pen"/>
      </button>

      <button type="button"
              class="button"
              @click="deletingModal(data.id)"
      >
        <v-icon scale="1" class="icon" name="trash-alt"/>
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
        'SET_CURRENT_GROUP_DATA',
        'SET_CURRENT_GROUP_CHANNELS_TO_SEARCH',
        'SET_GROUP_ID_TO_DELETE',
        'SET_GROUP_ID_FOR_ADDING_CHANNEL',
        'SET_AVAILABLE_CHANNELS_TO_ADD',
        'SET_CHANNELS_TO_SEARCH'
      ]),
      ...mapMutations({
        setUserPosition: 'user/SET_USER_POSITION',
        SET_MODAL: 'modal/SET_MODAL',
      }),
      ...mapActions({
        getGroupData: 'groups/GET_GROUP_DATA',
        setAddingChannelsToGroup: 'groups/SET_ADDING_CHANNELS_TO_GROUP',
      }),
      async setData(e, id) {
        if (!e.target.hasAttribute('type')) {
          await this.getGroupData(Number(id)).then(data => {
            console.log(data);
            this.SET_CURRENT_GROUP_DATA(data);
            this.SET_CURRENT_GROUP_CHANNELS_TO_SEARCH(data.channels);
          });
        }
      },
      editThis(id) {
        this.SET_MODAL('ModalGroupEdit');
        this.SET_GROUP_DATA(this.groupToEdit(id));
      },
      deletingModal(id) {
        this.SET_MODAL('ModalGroupDelete');
        this.SET_GROUP_ID_TO_DELETE(id);
      },
      async openChannelsAdding(group_id) {
        this.SET_MODAL('ModalGroupAddChannels');
        await this.SET_AVAILABLE_CHANNELS_TO_ADD({group_id: group_id, channels: this.channels});
        this.SET_GROUP_ID_FOR_ADDING_CHANNEL(group_id);
        this.SET_CHANNELS_TO_SEARCH(this.addingChannelsData.avalaibleChannels);
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
    padding: 5px 7px;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .button:hover {
    background-color: rgba(133, 133, 133, 0.23);
  }

  .icon {
    color: #495057;
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