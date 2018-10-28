<template>
  <aside class="nav d-flex flex-column col-md-3 p-0 bg-light">
    <header class="nav-header">
      <div @mouseover="addMenuVisible = true" @mouseout="addMenuVisible = false">
        <button class="addButton" type="button">
          <v-icon scale="1.6" class="icon" name="plus-circle"/>
        </button>

        <ul v-if="addMenuVisible" class="dropdown">
          <li v-for="(elem, index) in info" class="dropdown__el"><a :href="elem.link" @click="openModal($event, elem.modalTrigger, elem.link)">{{elem.name}}</a></li>
        </ul>
      </div>

      <div class="filters">
        <button type="button" class="btn btn-primary filters__filter" data-filter="all" @click="filter">All</button>

        <button type="button" class="btn btn-primary filters__filter" data-filter="channel" @click="filter">
          <v-icon scale="1.6" class="icon" name="bullhorn"/>
        </button>

        <button type="button" class="btn btn-primary filters__filter" data-filter="group" @click="filter">
          <v-icon scale="1.6" class="icon" name="folder"/>
        </button>
      </div>
    </header>

    <NavSection title="Каналы"
                :itemsList="channelsSlugs"
                :type="'channel'"
                v-if="filters.channelsVisible"/>
    <NavSection title="Группы"
                :itemsList="groupsSlugs"
                :type="'group'"
                v-if="filters.groupsVisible"/>
  </aside>
</template>

<script>
  import NavSection from './NavSection';
  import {mapGetters} from 'vuex';

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
            name: 'Создать канал',
            link: '/create-channel',
            modalTrigger: 'channel'
          },
          {
            name: 'Создать группу',
            link: '/create-group',
            modalTrigger: 'group'
          },
          {
            name: 'Редактировать профиль',
            link: '/edit-profile',
            modalTrigger: 'editProfile'
          }
        ],
        addMenuVisible: false,
        filters: {
          channelsVisible: true,
          groupsVisible: true,
        }
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
      filter(e) {
        const target = e.target;
        const filterType = target.getAttribute('data-filter');
        console.log(filterType);
        switch (filterType) {
          case 'all':
            this.filters.channelsVisible = true;
            this.filters.groupsVisible = true;
            break;
          case 'channel':
            this.filters.channelsVisible = true;
            this.filters.groupsVisible = false;
            break;
          case 'group':
            this.filters.channelsVisible = false;
            this.filters.groupsVisible = true;
            break;
          default:
            break;
        }
        console.log(this.filters.channelsVisible);
        console.log(this.filters.groupsVisible);
      },
    },
    async created() {
      await this.$store.dispatch('user/GET_NAV');
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
    height: 40px;
    padding: 0 5px;
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
    color: white;

    background-color: #1082CF;
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

  .filters {
    display: flex;
    align-items: center;
  }

  .filters__filter {
    width: 40px;
    height: 30px;
    margin-right: 10px;
    padding: 2px 5px;
  }

  .filters__filter:last-child {
    margin-right: 0;
  }
</style>