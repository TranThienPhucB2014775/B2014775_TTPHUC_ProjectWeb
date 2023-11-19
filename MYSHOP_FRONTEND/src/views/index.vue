<template>
   <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
   <navbar />
   <router-view></router-view>
   <div>

   <BaseFooter />
      
      
   </div>
</template>
 
<script>
import navbar from '../components/navbar.vue'
import login from '../components/login.vue'
import BaseFooter from "../components/footer.vue"

export default {
   name: "Home",
   components: {
      navbar,
      login,
      BaseFooter,
   },
   created() {
      this.$router.push({ name: 'about' });
      // console.log(this.$store.state.role)
      // console.log(this.$store.state.isLoggedIn)
   },

};
</script>
 
<style scoped>
html,
body {
   height: 100%;
   margin: 0;
   padding: 0;
}

#app {
   min-height: 100%;
   position: relative;
}

footer {
   height: auto;
   position: absolute;
   /* Các thuộc tính CSS khác cho phần footer */
}

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
 