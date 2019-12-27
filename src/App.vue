<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </component>

    <transition name="fade" mode="out-in">
      <Modal v-if="modalStatus"/>
    </transition>
  </div>
</template>

<script>
  import Modal from './components/Modal/Modal';
  import {mapGetters} from 'vuex';

  export default {
    components: {Modal},
    computed: {
      ...mapGetters({
        modalStatus: 'modal/modalStatus'
      }),
      layout() {
        return (this.$route.meta.layout || 'main') + '-layout'
      },
    },
  }
</script>

<style lang="scss">
  #app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 500;
    color: #2c3e50;
  }

  @media (max-width: 992px) {
    #app .container {
      width: 100%;
      max-width: 100vw;
    }

    .container.home {
      background-color: #fff;
    }
  }

  .page-wrapper {
    position: relative;
    z-index: 1;

    background-color: #ebebeb;
  }

  .home {
    display: flex;
    width: 100%;
    min-height: calc(100vh - 68px);
  }

  .main {
    position: relative;

    flex: 1 0 auto;
    display: grid;
    max-width: calc(100% - 350px);
    height: calc(100vh - 68px);

    background-color: #fff;
  }

  .nav {
    flex: 1 0 350px;
    flex-wrap: nowrap !important;
    max-width: 350px;
    max-height: calc(100vh - 68px);
    overflow-y: auto;
    overflow-x: hidden;

    background-color: #fff;
  }

  .avatar {
    flex: 1 0 50px;
    margin-right: 15px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    .main {
      max-width: 100%;
    }
    .nav {
      position: absolute;
      left: 0;
      z-index: 1;

      height: 100%;

      background-color: #fff;
      box-shadow: 3px 0 10px 5px rgba(0, 0, 0, 0.11);
    }
  }

  @media (max-width: 576px) {
    .nav {
      max-width: 100vw;
    }

    .avatar {
      flex-basis: 30px;
      width: 30px;
      height: 30px;
      margin-right: 7px;
    }
  }

  .mr10 {
    margin-right: 10px;
  }

  .info-message {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;

    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.7px;
    color: #07284c;
  }

  .info-message::before {
    content: '';
    display: block;
    width: 15px;
    height: 1px;
    margin-right: 15px;

    background-color: #07284c;
  }

  .chat-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    padding: 0 15px;
  }

  /**
   * chat info
   */

  .info-btn {
    font-size: 12px;

    background-color: #fff;
    border: none;
    cursor: pointer;
  }

  .group-info {
    position: absolute;
    top: -30px;
    right: -20px;
    z-index: 3;

    display: grid;
    grid-template-columns: 85px 150px 25px;
    grid-template-rows: 17px 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 15px;

    min-height: 190px;
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 17px;

    background-color: #fff;
    border-radius: 4px;
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.15);
  }

  .group-info__header {
    grid-column: 1 / span 2;
    grid-row: 1 / 2;
    display: flex;
    align-items: center;
    height: 17px;
    padding: 0;
    padding-left: 10px;
  }

  .group-info__header-img {
    margin-right: 15px;
  }

  .group-info__header-text {
    font-size: 11px;
    color: rgba(0, 0, 0, 0.5);
  }

  .group-info__img {
    grid-column: 1 / 2;
    grid-row: 2 / 3;

    width: 85px;
    height: 85px;

    border-radius: 50%;
  }

  .group-info__info {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  .group-info__close {
    position: relative;

    grid-column: 3 / 4;
    grid-row: 1 / 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 4px;

    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .group-info__close-text {
    position: absolute;
    bottom: 5px;
    left: 4px;

    white-space: nowrap;
    transform: rotate(-90deg);
    transform-origin: 0 0;
  }

  .info__title {
    font-size: 14px;
    font-weight: 700;
    color: black;
  }

  .info__list {
    padding-left: 10px;
  }

  .info__li {
    margin-bottom: 5px;
    font-size: 11px;
    color: #125092;
  }

  .info__users-btn {
    padding: 0;

    text-decoration: underline;
    color: #125092;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .info__users-btn:hover {
    text-decoration: none;
  }

  .tooltip-wrap {
    position: relative;
  }

  ._tooltip {
    position: absolute;
    left: 50%;
    bottom: 27px;

    display: block;
    padding: 3px 5px;
    padding-top: 1px;

    font-size: 10px;
    color: white;

    transform: translateX(-50%);
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.9);
    opacity: 0;
    transition: opacity 0.2s;
  }

  ._tooltip::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;

    display: block;
    width: 3px;
    height: 3px;

    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top: 5px solid rgba(0, 0, 0, 0.9);
    transition: opacity 0.2s;
  }

  .tooltip-wrap:hover ._tooltip {
    opacity: 1;
    transition: opacity 0.2s;
  }

  @media (max-width: 992px) {
    .group-info {
      right: 0;
    }
  }

  /**
   * modal
   */

  .modal-inside {
    max-height: 90%;
    padding: 30px;
    overflow: auto;
  }

  .modal__content {
    margin-top: 10px;
  }

  .modal__header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .modal__header-img {
    flex: 1 0 31px;
    max-width: 31px;
    height: auto;
  }

  .modal__title {
    margin-bottom: 0;
    margin-left: 15px;

    font-size: 19px;
    font-weight: 700;
    color: #0e4075;
  }

  .btn-file input[type="file"] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
  }

  .button_remove {
    margin-top: 15px;
    padding: 10px 20px;
  }

  input[type="file"] {
    position: absolute;
    left: 0;
    z-index: -1;

    opacity: 0;
  }

  .hidden {
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .hidden.image {
    display: flex;
  }

  .img {
    width: 100%;
    height: auto;
  }

  .drop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
    height: 100%;
    min-height: 100px;
    margin-bottom: 15px;

    border: 4px dashed #ccc;
    background-color: #f6f6f6;
    border-radius: 2px;
  }

  .drop label {
    margin-bottom: 0;
  }

  progress::-webkit-progress-value {
    transition: width 0.5s ease;
  }

  .modal__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .edit-notice {
    font-size: 12px;
    color: rgba(14, 64, 117, 0.57);
  }

  .image-wrap {
    flex: 1 0 auto;
    width: 30px;
    height: 30px;
    margin-right: 10px;

    background-color: #cccccc;
    border-radius: 50%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translateX(-100%);
    transition: all 0.3s;
  }
</style>
