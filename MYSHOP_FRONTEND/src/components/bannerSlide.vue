<template>
   <div>
      <br>
      <div class="w3-content w3-display-container">
         <img v-for="(slide, index) in slides" :key="index" class="mySlides" :src="slide.image" style="width:100%">
         <button class="w3-button w3-black w3-display-left" @click="plusDivs(-1)">&#10094;</button>
         <button class="w3-button w3-black w3-display-right" @click="plusDivs(1)">&#10095;</button>
      </div>
   </div>
</template>
 
<script>

export default {
//    beforeCreate() {
//     // Gọi hàm hoặc thực hiện các tác vụ cần thiết trước khi component được tạo
//     plusDivs(0);
//   },
   data() {
      return {
         slideIndex: 0,
         slides: [
            { image: 'https://www.amd.com/content/dam/amd/en/images/games/red-dead-redemption-2/348038-red-dead-redemption-banner.jpg' },
            { image: 'https://www.metrothegame.com/assets/Uploads/metrotwitterbanner.jpg' }
         ]
      };
   },
   methods: {
      plusDivs(n) {
         this.showDivs(this.slideIndex += n);
      },
      showDivs(n) {
         let i;
         let x = this.$el.getElementsByClassName("mySlides");
         if (n > x.length) { this.slideIndex = 1; }
         if (n < 1) { this.slideIndex = x.length; }
         for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
         }
         x[this.slideIndex - 1].style.display = "block";
      }
   },
   created() {
      this.slideIndex = 0;
   },
};
</script>
 
<style scoped>
.mySlides {
   display: none;
   max-width: 100%;
   height: 250px;
   /* width: 1400px; */
}
/* .w3-content {
    max-width: 1800px;
} */
</style>
 