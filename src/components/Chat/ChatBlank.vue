<template>
  <div class="popular-channels">
    <NavSectionChannels v-for="channel in channels"
                        :key="channel.id"
                        :type="'channel'"
                        :data="channel"
                        :notification="false"
    />
  </div>
</template>

<script>
    import Vue from "vue";
    import NavSectionChannels from '../Nav/NavSectionChannels';
  
  export default {
    name: "ChatBlank",
      
    components:{
        NavSectionChannels, 
    },  
      
    data(){
      return {
          channels:[],
      }  
    },
      
    created(){
        this.getChannels();
    },  
    
    methods:{
       getChannels(){
           Vue.http.get(`${process.env.VUE_APP_API_URL}/channels/popular`)
               .then(
                   res => {
                       this.channels = res.body.data;
                       console.log(this.channels);
                   },
                   err => console.log('err get channels', err)
               )
       } 
    },  
  }
</script>

<style scoped>
  h3 {
    margin: 50px;
    color: #ccc;
    text-align: center;
  }

  .popular-channels{
    padding: 20px;
    max-height: 100%;
    overflow-y: auto;
  }
  
</style>