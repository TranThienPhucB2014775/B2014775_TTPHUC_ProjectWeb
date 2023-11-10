<template>
   <div class="slider-box">
      <div class="slider-content">
         <Splide :options="options" aria-label="My Favorite Images">
            <SplideSlide>
               <img src="https://haloshop.vn/image/cache/catalog/banners/game/categories/retro-categories-1280x280.jpg" alt="Sample 2" />
            </SplideSlide>
            <SplideSlide>
               <img src="https://haloshop.vn/image/cache/catalog/banners/game/categories/catalog-asus-rog-ally-luon-co-san-hang-1280x280.jpg" alt="Sample 1" />

            </SplideSlide>
            <SplideSlide>
               <img src="https://haloshop.vn/image/cache/catalog/banners/game/categories/steam-deck-da-co-hang-categories-1280x280.jpg" alt="Sample 2" />
            </SplideSlide>

         </Splide>
      </div>
   </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { defineComponent } from "vue";

export default defineComponent({
   components: {
      Splide,
      SplideSlide,
   },

   setup() {
      const options = {
         rewind: true,
         gap: "1rem",
         autoplay: true,
      };

      return { options };
   },
});
</script>

<style scoped>
.splide__slide img {
   width: 100%;
   /* height: 500px; */
   object-fit: cover;
   /* Bao phủ toàn bộ khung hình */
   display: block;
}



/* .content {
   margin-top: 5px;
   position: absolute;
   right: 10px;
   bottom: 20px;
   width: 400px;
   text-align: justify;
   background-color: #333;
   padding: 7px 7px 12px;
   border-radius: 3px;
   opacity: 0.85;
}

.content a {
   text-decoration: none;
   color: white;
   display: inline-block;
   line-height: 24px;
   text-transform: uppercase;
} */
</style>
