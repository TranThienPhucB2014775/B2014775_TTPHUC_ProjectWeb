<template>
   <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
   <navbar />

   <body>
      <bannerSlide />
   </body>
   <BaseFooter />
</template>
 
<script>
import navbar from '../components/navbar.vue'
import login from '../components/login.vue'
import BaseFooter from "../components/footer.vue"
// import BaseSlider from "../components/BannerSlide.vue"
import bannerSlide from '../components/bannerSlide.vue';
export default {
   name: "Home",
   components: {
      navbar,
      login,
      BaseFooter,
      bannerSlide
   },
};
</script>
 
<style scoped>
.wrapper {
   max-width: 100%;
   background: #fff;
}

.header {
   width: 100%;
   height: auto;
}

.container {
   width: 100%;
   height: auto;
   margin-bottom: 20px;
}

.slider {
   width: 100%;
   height: auto;
}

.listcategory {
   width: 100%;
   height: auto;
}

.slider-brand {
   width: 100%;
   height: 150px;
}

.banner-slide {
   width: 100%;
   height: 100px;
}

.navbar {
   box-shadow: 0px 5px 10px 0px #aaa;
   width: 100%;
   background: #fff;
   color: #000;
   opacity: 0.85;
   z-index: 100;
   left: 0;
   /* Thêm dòng này */
   right: 0;
   /* Thêm dòng này */
}

.navbar-container {
   display: flex;
   justify-content: space-between;
   /* Thêm dòng này */
   height: 64px;
   align-items: center;
}
</style>
 