<template>
  <aside class="nav d-flex flex-column col-md-3 p-0 bg-light">

    <header class="nav-header">
      <div @mouseover="addMenuVisible = true" @mouseout="addMenuVisible = false">
        <button class="addButton" type="button">
          <v-icon scale="1.6" class="icon" name="plus-circle"/>
        </button>

        <ul v-if="addMenuVisible" class="dropdown">
          <li v-for="(elem, index) in info" class="dropdown__el"><a :href="elem.link" @click="openModal($event, elem.modalTrigger, elem.link)">Создать {{elem.name}}</a></li>
        </ul>
      </div>

      <button type="button">
        <v-icon scale="1.6" class="icon" name="bullhorn"/>
      </button>

      <button type="button">
        <v-icon scale="1.6" class="icon" name="folder"/>
      </button>
    </header>

    <NavSection title="Каналы" :itemsList="channelsSlugs" :type="'channel'"/>
    <NavSection title="Группы" :itemsList="groupsSlugs" :type="'group'"/>
  </aside>
</template>

<script>
  import NavSection from './NavSection';
  import {mapGetters} from 'vuex';
  import {joinChannels} from '../../services/socket/channels.service'

  export default {
    computed: {
      ...mapGetters({
        groupsSlugs: 'groups/groups',
        channelsSlugs: 'channels/channels',
      }),
    },
    data() {
      return {
        info: [
          {
            name: 'канал',
            link: '/create-channel',
            modalTrigger: 'channel'
          },
          {
            name: 'группу',
            link: '/create-group',
            modalTrigger: 'group'
          },
        ],
        addMenuVisible: false
      }
    },
    components: {
      NavSection
    },
    methods: {
      openModal(e, modalType, modalLink) {
        e.preventDefault();
        this.$store.commit('modal/setModal', modalType);
        this.$store.commit('modal/currentModal', modalType);
        history.pushState('', 'Title of page', modalLink);
      },
    },
    async created() {
      await this.$store.dispatch('user/GET_NAV');
      joinChannels(this.channelsSlugs)
    },

  }

</script>

<style scoped>
  .nav-header {
    position: relative;
    z-index: 2;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav {
    flex-wrap: nowrap !important;
    height: 100%;
    overflow: auto;
  }

  .addButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;

    font-size: 22px;
    font-weight: 700;
    line-height: 1;
    color: #856404;

    background-color: #E5D7A5;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  .addButton:hover {
    text-decoration: none;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 15px;

    list-style: none;
    background-color: #fff;
  }

  .dropdown__el {
    padding: 5px 0;
  }
</style>