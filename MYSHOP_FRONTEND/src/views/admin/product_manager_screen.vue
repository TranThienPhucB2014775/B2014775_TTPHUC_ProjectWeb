<template>
   <navbarAdmin />
   <h1>Danh sách sản phẩm</h1>
   <br>
   <div class="search-bar">
      <form action="">
         <input type="text" placeholder="Tìm kiếm" v-model="searchText">
         <button type="submit">Tìm kiếm</button>
      </form>
   </div>
   <div class="button-container">
      <button type="button" class="btn btn-danger" @click="removeAllProducts">Xóa tất cả</button>
      <button type="button" class="btn btn-success" @click="createNewProduct">Thêm mới</button>
   </div>
   <table>
      <tr>
         <th>Tên sản phẩm</th>
         <th>Giá</th>
         <th>Ảnh sản phẩm</th>
         <th>mô tả</th>
         <th>Ngày tạo/Cập nhật</th>
         <th>Thao tác</th>
      </tr>
      <tbody>
         <tr :key="index" v-for="(product, index) in filteredProducts">
            <th class="items-center">{{ product.name }}</th>
            <th class="items-center text-center">
               {{ String(product.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
               đồng
            </th>
            <th>
               <img class="product-img" :src="product.imgUrl" alt="Hình ảnh sản phẩm" />
            </th>
            <th class="items-center">{{ product.description }}</th>
            <th class="items-center">
               {{ time(product.createdAt) }}
            </th>
            <th class="items-center">
               <router-link :to="{
                  name: 'admin-product-edit',
                  params: { id: product._id },
               }">
                  <button type="button" class="btn btn-success">
                     Sửa
                  </button>
               </router-link>
               &nbsp;
               <button type="button" @click="deleteProduct(product._id)" class="btn btn-danger">
                  Xóa
               </button>
            </th>
         </tr>
      </tbody>
   </table>
</template>
 
<script>
import navbarAdmin from "../../components/admin/navbar_admin.vue";
import ProductService from "../../services/product.service";
export default {
   components: {
      navbarAdmin,
   },
   data() {
      return {
         products: [],
         searchText: "",
      };
   },
   computed: {
      productStrings() {
         return this.products.map((product) => {
            const { name, description } = product;
            return [name, description].join("");
         });
      },
      filteredProducts() {
         if (!this.searchText) return this.products;
         return this.products.filter((_product, index) =>
            this.productStrings[index].includes(this.searchText)
         );
      },
      filteredProductsCount() {
         return this.filteredProducts.length;
      },
   },
   methods: {
      async getAllProduct() {
         try {
            this.products = await ProductService.getAll();
            // console.log('123')
         } catch (error) {
            console.log(error);
         }
      },
      async deleteProduct(productId) {
         if (confirm("Bạn muốn xóa Sản phẩm này?")) {
            try {
               await ProductService.delete(productId);
               this.$router.push({ name: "admin-products" });
               this.getAllProduct();
            } catch (error) {
               console.log(error);
            }
         }
      },
      async removeAllProducts() {
         if (confirm("Bạn muốn xóa tất cả Sản phẩm?")) {
            try {
               await ProductService.deleteAll();
               this.$router.push({ name: "admin-products" });
               this.getAllProduct();
            } catch (error) {
               console.log(error);
            }
         }
      },
      createNewProduct() {
         this.$router.push('/admin/add_product');
      },
      time(timestamp) {
         const date = new Date(timestamp);
         return date.toLocaleString();
      },
   },
   created() {
      console.log(this.$store.state.role)
      this.getAllProduct();
   },
   mounted() {
      if (!this.$store.state.isLoggedIn) {
         this.$router.push('/error');
      }
   },
   mounted() {
      if (!this.$store.state.isLoggedIn && this.$store.state.role != 'admin') {
         this.$router.push('/error');
      }
   },
};
</script>
 
<style scoped>
.search-bar {
   padding-left: 10px;
   margin-bottom: 10px;
   display: flex;
   align-items: center;
   justify-content: flex-start;
}

.search-bar input[type="text"] {
   padding: 8px;
   border: 1px solid #ccc;
   border-radius: 4px;
   margin-right: 8px;
}

.search-bar button[type="submit"] {
   padding: 8px 12px;
   background-color: #4caf50;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
}

.button-container {
   padding-right: 10px;
   display: flex;
   align-items: center;
   justify-content: flex-end;
   margin-bottom: 10px;
}

.button-container button {
   margin-left: 10px;
}

table {
   width: 100%;
   /* Đặt độ rộng của bảng là 100% */
   border-collapse: collapse;
   /* Gộp các đường viền của ô thành một */
}

th {
   padding: 8px;
   /* Đặt padding cho ô */
   text-align: left;
   /* Căn trái nội dung trong ô */
   border-bottom: 1px solid #ddd;
   /* Đường viền dưới của ô */
}

th:nth-child(1) {
   width: 300px;
   /* Đặt chiều ngang của ô tiêu đề thứ nhất là 100px */
}

th:nth-child(2) {
   width: 200px;
   /* Đặt chiều ngang của ô tiêu đề thứ hai là 200px */
}

th:nth-child(3) {
   width: 350px;
   /* Đặt chiều ngang của ô tiêu đề thứ ba là 150px */
}

th:nth-child(4) {
   width: 200px;
   /* Đặt chiều ngang của ô tiêu đề thứ ba là 150px */
}

th {
   padding: 8px;
   /* Đặt padding cho ô */
   text-align: left;
   /* Căn trái nội dung trong ô */
   border-bottom: 1px solid #ddd;
   /* Đường viền dưới của ô */
}

.product-img {
   width: 290px;
   /* Thay đổi giá trị này thành chiều cao mong muốn */
}

.container {
   background-color: #fff;
   margin-top: 10px;
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
   margin-bottom: 10px;
}

.navbar-container {
   display: flex;
   justify-content: space-between;
   /* Thêm dòng này */
   height: 64px;
   align-items: center;
}
</style>
 