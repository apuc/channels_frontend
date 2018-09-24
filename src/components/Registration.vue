<template>
  <main>
    <div class="container">
      <div class="row">
        <b-form cols="6" offset="3">
          <b-form-input v-model=""
                        type="text"
                        placeholder="Enter your name"
          ></b-form-input>

          <b-form-input v-model=""
                        type="email"
                        placeholder="Enter your email"
          ></b-form-input>

          <b-form-input v-model=""
                        type="password"
                        placeholder="Enter password"
          ></b-form-input>

          <b-form-input v-model=""
                        type="password"
                        placeholder="Repeat password"
          ></b-form-input>


        </b-form>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "Registration"
  }
</script>

<style scoped>

</style>