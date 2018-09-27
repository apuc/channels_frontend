<template>
  <aside class="col-md-3 bg-light">
    <section class="info" v-for="(ad, index) in ads" :key="index">
      <div class="info__img">
        <img :src="ad.img" alt="">
      </div>

      <div class="info__title">
        <a :href="ad.link">{{ ad.title }}</a>
      </div>
    </section>
  </aside>
</template>

<script>
  export default {
    name: "Advertisings",
    data() {
      return {
        ads: [
          {
            img: 'https://s.newsweek.com/sites/www.newsweek.com/files/styles/lg/public/2018/09/05/beaver.jpg',
            title: 'За бобров!',
            link: 'https://github.com'
          },
          {
            img: 'https://pp.userapi.com/c837721/v837721341/360d1/weQod8JmGwM.jpg',
            title: 'Наша еда хороша.',
            link: 'https://github.com'
          },
          {
            img: 'https://pp.userapi.com/c837230/v837230616/41903/P0YVL7I3Z9w.jpg',
            title: 'Покупайте наши велосипеды.',
            link: 'https://github.com'
          },
          {
            img: 'https://pp.userapi.com/c846218/v846218892/e901b/c09P-QuYY18.jpg',
            title: 'За енотов!',
            link: 'https://github.com'
          },
        ]
      }
    }
  }
</script>

<style scoped>
  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 100vh;
    padding: 30px;

    box-sizing: border-box;
    overflow: auto;
  }

  .info {
    width: 80%;
    min-height: 300px;
  }

  .info__img {
    width: 100%;
    height: calc(100% - 40px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>