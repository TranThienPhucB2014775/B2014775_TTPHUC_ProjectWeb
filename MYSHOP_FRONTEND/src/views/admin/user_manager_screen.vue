<template>
   <navbarAdmin />
   <h1>Dang sách tài khoản</h1>
   <div class="search-bar">
      <form action="">
         <input type="text" v-model="searchText" placeholder="Tìm kiếm...">
         <button type="button" class="btn btn-danger" @click="removeAllProducts">Tìm kiếm</button>
      </form>
   </div>
   <div class="button-container">
      <button type="button" class="btn btn-danger" @click="removeAllProducts">Xóa tất cả</button>
      <button type="button" class="btn btn-success" @click="createNewProduct">Thêm mới</button>
   </div>
   <table>
      <tr>
         <th>Vai trò</th>
         <th>Email</th>
         <th>Ngày tạo</th>
         <th>Thao tác</th>
      </tr>
      <tr :key="index" v-for="(user, index) in filteredUsers">
         <th>{{ user.role }}</th>
         <th>{{ user.email }}</th>
         <th>{{ time(user.createdAt) }}</th>
         <th>
            <button type="button" class="btn btn-danger" @click="deleteUser(user._id)">
               Xóa
            </button>
         </th>
      </tr>
   </table>
</template>
 
<script>
import navbarAdmin from "../../components/admin/navbarAdmin.vue";
import UserService from "../../services/user.service";

export default {
   components: {
      navbarAdmin,
   },
   data() {
      return {
         users: [],
         searchText: "",
      };
   },
   computed: {
      userStrings() {
         return this.users.map((user) => {
            const { email } = user;
            return [email].join("");
         });
      },
      filteredUsers() {
         if (!this.searchText) return this.users;
         return this.users.filter((_user, index) =>
            this.userStrings[index].includes(this.searchText)
         );
      },
      filteredUsersCount() {
         return this.filteredUsers.length;
      },
   },
   methods: {
      async getAllUser() {
         try {
            this.users = await UserService.getAll();
         } catch (error) {
            console.log(error);
         }
      },
      async deleteUser(UserId) {
         if (confirm("Bạn muốn xóa Tài khoản này?")) {
            try {
               await UserService.delete(UserId);
               this.$router.push({ name: "user.list" });
               this.getAllUser();
            } catch (error) {
               console.log(error);
            }
         }
      },
      async removeAllUsers() {
         if (confirm("Bạn muốn xóa tất cả Tài khoản?")) {
            try {
               await UserService.deleteAll();
               this.$router.push({ name: "user.list" });
               this.getAllUser();
            } catch (error) {
               console.log(error);
            }
         }
      },
      time(timestamp) {
         const date = new Date(timestamp);
         return date.toLocaleString();
      },
   },
   created() {
      this.getAllUser();
   },
};
</script>
 
<style scoped>
.search-bar {
   margin-bottom: 10px;
   display: flex;
   align-items: center;
   justify-content: flex-start;
}

.search-bar input[type="text"] {
   padding: 8px;
   border: 1px solid #ccc;
   border-radius: 4px;
   width: 200px;
}

.button-container {
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
   width: 50px;
   /* Đặt chiều ngang của ô tiêu đề thứ nhất là 100px */
}

th:nth-child(2) {
   width: 200px;
   /* Đặt chiều ngang của ô tiêu đề thứ hai là 200px */
}

th:nth-child(3) {
   width: 150px;
   /* Đặt chiều ngang của ô tiêu đề thứ ba là 150px */
}

th:nth-child(4) {
   width: 50px;
   /* Đặt chiều ngang của ô tiêu đề thứ ba là 150px */
}

td {
   padding: 8px;
   /* Đặt padding cho ô */
   text-align: left;
   /* Căn trái nội dung trong ô */
   border-bottom: 1px solid #ddd;
   /* Đường viền dưới của ô */
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
}

.navbar-container {
   display: flex;
   justify-content: space-between;
   /* Thêm dòng này */
   height: 64px;
   align-items: center;
}
</style>
 