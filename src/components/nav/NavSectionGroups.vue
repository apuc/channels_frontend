<template>
  <section class="list-group__item"
           @click="setData($event, data.group_id)"
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
              @click="openChannelsAdding(data.group_id)">
        <v-icon scale="1" class="icon" name="plus-circle"/>
      </button>

      <button type="button"
              class="button"
              @click="editThis(data.group_id)">
        <v-icon scale="1" class="icon" name="pen"/>
      </button>

      <button type="button"
              class="button"
              @click="deletingModal(data.group_id)"
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
      ...mapGetters({
        channels: 'channels/channels',
        currentGroupData: 'groups/currentGroupData',
        groupToEdit: 'groups/groupToEdit',
        addingChannelsData: 'groups/addingChannelsData',
        userData: 'user/info',
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
      ...mapMutations({
        setUserPosition: 'user/SET_USER_POSITION',
        setGroupData: 'groups/SET_GROUP_DATA',
        setCurrentGroupData: 'groups/SET_CURRENT_GROUP_DATA',
        setCurrentGroupChannelsToSearch: 'groups/SET_CURRENT_GROUP_CHANNELS_TO_SEARCH',
        setModal: 'modal/SET_MODAL',
        setGroupIdToDelete: 'groups/SET_GROUP_ID_TO_DELETE',
        setGroupIdForAddingChannels: 'groups/SET_GROUP_ID_FOR_ADDING_CHANNEL',
        setAvailableChannelsToAdd: 'groups/SET_AVAILABLE_CHANNELS_TO_ADD',
        setChannelsToSearch: 'groups/SET_CHANNELS_TO_SEARCH',
      }),
      ...mapActions({
        getGroupData: 'groups/GET_GROUP_DATA',
        setAddingChannelsToGroup: 'groups/SET_ADDING_CHANNELS_TO_GROUP',
      }),
      async setData(e, id) {
        if (!e.target.hasAttribute('type')) {
          await this.getGroupData(Number(id)).then(data => {
            console.log(data);
            this.setCurrentGroupData(data);
            this.setCurrentGroupChannelsToSearch(data.channels);
          });
        }
      },
      editThis(id) {
        this.setModal('ModalGroupEdit');
        this.setGroupData(this.groupToEdit(id));
      },
      deletingModal(id) {
        this.setModal('ModalGroupDelete');
        this.setGroupIdToDelete(id);
      },
      async openChannelsAdding(group_id) {
        this.setModal('ModalGroupAddChannels');
        await this.setAvailableChannelsToAdd({group_id: group_id, channels: this.channels});
        this.setGroupIdForAddingChannels(group_id);
        this.setChannelsToSearch(this.addingChannelsData.avalaibleChannels);
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