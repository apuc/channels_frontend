<template>
  <section class="list-group__item" :class="{'list-group__item_active': data.id === currentGroupData.id}">

    <div 
      class="notification-block" 
      v-if="groupNotifications(groupChannelsIds(data.id)) > 0"  
    >
      {{groupNotifications(groupChannelsIds(data.id))}}
    </div>
    
    <router-link :to="`/group/${data.slug}`"
                 class="list-group__link"
                 :title="data.title"
                 @click.native="setData($event, data.id, type)"
    >
      <img :src="data.avatar.small"
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
              class="button tooltip-wrap"
              @click="openChannelsAdding(data.id)"
      >
        <span class="_tooltip">Добавить канал</span>
        <img src="../../assets/img/plus.png" alt="">
      </button>

      <button type="button"
              class="button tooltip-wrap"
              @click="editThis(data.id)"
      >
        <span class="_tooltip">Редактировать</span>
        <img src="../../assets/img/pencil.png" alt="">
      </button>

      <button type="button"
              class="button tooltip-wrap"
              @click="deletingModal(data.id)"
      >
        <span class="_tooltip">Удалить</span>
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
        groupChannelsIds: 'groups/groupChannelsIds',
        groupNotifications: 'messages/groupNotifications',
        deviceIsMobile: 'common/deviceIsMobile',
      }),
    },
      
    props: {
      // isSidebarVisible
      value: {
        type: Boolean
      },
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
    
    created(){
      for(let channel of this.data.channels){
        if(channel.unread_count > 0){
          this.SET_CHANNEL_NOTIFICATION({channel_id:channel.id,unread:channel.unread_count})
        }
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
        SET_CHANNEL_NOTIFICATION: "messages/SET_CHANNEL_NOTIFICATION",
        OPEN_SIDEBAR: 'nav/OPEN_SIDEBAR',
        CLOSE_SIDEBAR: 'nav/CLOSE_SIDEBAR',
      }),
        
      ...mapActions({
        GET_GROUP_DATA: 'groups/GET_GROUP_DATA',
      }),
        
      async setData(e, id, type) {       
        if(this.deviceIsMobile) {
          this.CLOSE_SIDEBAR();
        }
        this.SET_USER_POSITION(type);
        await this.GET_GROUP_DATA(Number(id)).then(data => {
          this.SET_CURRENT_GROUP_DATA(data);
          this.SET_CURRENT_GROUP_CHANNELS_TO_SEARCH(data.channels);
        });

      },
        
      /**
       * Модалка редактирования группы
       */ 
      editThis(id) {
        this.SET_MODAL({name: 'ModalGroupEdit'});
        this.SET_GROUP_ID(id);
      },
        
        /**
         * Модалка удаления группы
         */
      deletingModal(id) {
        this.SET_MODAL({name: 'ModalGroupDelete'});
        this.SET_GROUP_ID_TO_DELETE(id);
      },
      

        /**
         * Открывает окно добавления каналов
          * @param group_id
         * @returns {Promise<void>}
         */  
      async openChannelsAdding(group_id) {
        this.SET_MODAL({name: 'ModalGroupAddChannels'});
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
    position: relative;
  }

  .list-group__item {
    background-color: #fff;
  }

  .list-group__item:hover {
    background-color: #f8f9fa;
  }

  .list-group__item_active,.list-group__item_active:hover {
    background-color: rgba(112, 151, 255, 0.4);
    border-radius: 6px;
    padding: 3px;
  }

  .list-group__link {
    flex: 1 2 auto;
    display: flex;
    align-items: center;
    min-height: 100%;
    padding: 3px 0;

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
    flex: 1 0 calc(100% - 65px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .notification-block {
    position: absolute;
    left: 0;
    top: 2px;
    color: white;
    width: 18px;
    height: 18px;
    background-color: red;
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
  }

  @media (max-width: 576px) {
    .name {
      flex-basis: calc(100% - 45px);
    }
  }
</style>