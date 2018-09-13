<template>
  <div class="nav d-flex flex-column">
    <div class="list-group">
      <div class="list-group-item list-group-item-primary d-flex justify-content-between align-items-md-center">
        <span>Собеседники</span>
        <b-btn v-b-toggle.collapse1 variant="primary" class="w-25 h-25">+</b-btn>
      </div>
      <b-collapse id="collapse1">
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span>Андрей</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span>Юра</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span>Киррил</span>
        </a>
      </b-collapse>
    </div>
    <div class="list-group">
      <div class="list-group-item list-group-item-primary d-flex justify-content-between align-items-md-center">
        <span>Каналы</span>
        <b-btn v-b-toggle.collapse2 variant="primary" class="w-25 h-25">+</b-btn>
      </div>
      <b-collapse id="collapse2">
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span>Андрей</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span>Юра</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span>Киррил</span>
        </a>
      </b-collapse>
    </div>
    <div class="list-group">
      <div class="list-group-item list-group-item-primary d-flex justify-content-between align-items-md-center">
        <span>Группы</span>
        <b-btn v-b-toggle.collapse3 variant="primary" class="w-25 h-25">+</b-btn>
      </div>
      <b-collapse id="collapse3">
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span>Андрей</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span>Юра</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span>Киррил</span>
        </a>
      </b-collapse>
    </div>
  </div>

</template>

<script>

  export default {

  }

</script>