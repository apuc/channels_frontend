<template>
  <div class="chat-footer bg-light">
    <b-form-textarea id="input_message"
                     class="input_message"
                     v-model="input"
                     placeholder="Enter message"
                     :rows="3"
                     :max-rows="5">
    </b-form-textarea>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        input: ''
      }
    }
  }
</script>

<style scoped>
  .chat-footer {
    padding: 20px;
  }
  .input_message {
    resize: none;
  }
</style>