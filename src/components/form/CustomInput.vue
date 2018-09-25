<template>
  <div class="form-group">
    <label :for="id">{{ name }}</label>

    <input type="text"
           class="form-control"
           :class="validClass"
           :id="id"
           :value="value"
           @input="onInput"
    >
  </div>
</template>

<script>
  export default {
    props: ['name', 'value', 'pattern', 'id'],
    data(){
      return {
        activated: this.value != ''
      }
    },
    mounted(){
      this.$emit('changeStatus', this.isValid);
    },
    computed: {
      isValid(){
        return this.pattern.test(this.value);
      },
      validClass(){
        if (this.activated) {
          return this.isValid ? 'is-valid' : 'is-invalid';
        }
      }
    },
    methods: {
      onInput(e){
        this.activated = true;
        this.$emit('update:value', e.target.value);
      }
    },
    watch: {
      isValid(){
        this.$emit('changeStatus', this.isValid);
      }
    }
  }
</script>