<template>
  <header class="bg-light">
    <b-dropdown class="language-dropdown" variant="link">
      <button type="button" class="settings__btn" slot="button-content">
        <v-icon scale="1.6" class="icon" name="flag"/>
      </button>

      <b-dropdown-item
        v-for="lang in $ml.list"
        :key="lang"
        @click="$ml.change(lang)"
        v-text="lang"
      ></b-dropdown-item>
    </b-dropdown>

    <button class="btn btn-primary exit" type="button" @click="LOGOUT">Exit</button>
  </header>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    methods: {
      ...mapActions({
        LOGOUT: 'auth/LOGOUT',
      }),
    }
  }
</script>

<style scoped>
  header {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 15px;
  }

  .settings {
    position: relative;
    z-index: 1;
  }

  .settings__btn {
    padding: 5px;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .settings__list {
    position: absolute;
    left: 0;
    z-index: 2;

    width: 200px;

    background-color: #fff;
  }

  .list {
    padding: 10px;
    list-style: none;
  }

  .list__el {
    padding: 8px 0;
    line-height: 1.2;
  }

  .icon {
    color: #ffeeba;
    stroke: blue;
    stroke-width: 15px;
  }

  .exit {
    margin-left: auto;
  }
</style>