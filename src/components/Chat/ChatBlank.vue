<template>
  <div class="popular-channels" :class="{ 'sidebar--is_opened': sidebarIsOpened }">
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
    import {mapGetters} from 'vuex';
  
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
                   },
                   err => console.log('err get channels', err)
               )
       } 
    }, 
    
    computed: {
      ...mapGetters('nav', ['sidebarIsOpened']),
    }
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
  @media screen and (max-width: 768px) {
    .popular-channels {
      transition: .1s;
    }
    .popular-channels.sidebar--is_opened {
      margin-left: 200px;
      transition: .4s;
    }
  }
  @media screen and (max-width: 360px) {

    .popular-channels.sidebar--is_opened {
      margin-left: 10px;
      transition: .4s;
    }
  }
</style>