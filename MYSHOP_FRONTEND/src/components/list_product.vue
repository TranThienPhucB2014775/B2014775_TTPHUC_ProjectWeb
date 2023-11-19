<template>
    <hr>
    <BaseSlider />
    <h1 class="h1_list_product">Danh sách sản phẩm</h1>
    <div class="search-bar">
        <form action="">
            <input type="text" placeholder="Tìm kiếm" v-model="searchText">
            <button type="submit">Tìm kiếm</button>
        </form>
    </div>
    <div class="Items">
        <div class="Item" :key="index" v-for="(product, index) in filteredProducts">
            <a href="" class="Item__link">
                <div class="ImageContainer">
                    <img :src="product.imgUrl" alt="Ripcurl Corp Tee Black" class="Image">
                    <span class="CartIcon">
                    </span>
                </div>
                <div class="Item__title">{{ product.name }}</div>
                <div class="Item__price">{{
                    String(product.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }}
                    đồng</div>
            </a>
            <button class="AddToCartButton" @click="addProductToCart(product)">Thêm vào giỏ hàng</button>
        </div>

    </div>
    <div class="load-more-container">
        <button class="btn btn-primary px-3 ms-2 smaller-icon" @click="showMoreProducts">Xem thêm</button>
    </div>
</template>
<script>
import ProductService from "../services/product.service";
import cartService from "../services/cart.service";
import BaseSlider from "./BaseSlider.vue";
export default {
    components: {
        BaseSlider
    },
    data() {
        return {
            products: [],
            searchText: "",
            showMore: 12,
        };
    },

    computed: {
        productStrings() {
            return this.products.map((product) => {
                const { name, description } = product;
                return [name, description].join("");
            });
        },
        // filteredProducts() {
        //     if (!this.searchText) return this.products;
        //     return this.products.filter((_product, index) =>
        //         this.productStrings[index].includes(this.searchText)
        //     );
        // },
        filteredProducts() {
            if (!this.searchText) {
                return this.products.slice(0, this.showMore);
            }
            const searchTextLower = this.searchText.toLowerCase();
            const filtered = this.products.filter((_product, index) =>
                this.productStrings[index].toLowerCase().includes(searchTextLower)
            );
            if (filtered.length <= this.showMore) {
                return filtered;
            }
            return filtered.slice(0, this.showMore);
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
        showMoreProducts() {
            this.showMore += 12;
        },
    },
    methods: {
        async getAllProduct() {
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async addProductToCart(index) {
            const filter = {
                user_id: this.$store.state.userId,
                product_id: index._id,
                quantity: '1'
            }
            try {
                const result = await cartService.create(filter)
                alert(result.message);
            }
            catch (error) {
                alert(error)
            }

        },
    },

    created() {
        this.getAllProduct();
    },
};
</script>
<style>
.load-more-container {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
}

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

.h1_list_product {
    text-align: center;
}

.Items {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
}

.Item {
    padding: 10px 5px;
    width: 290px;
    transition: box-shadow 0.4s ease-in-out;
    border-radius: 3px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

@media (max-width: 1050px) {
    .Item {
        width: 48%;
    }
}

@media (max-width: 600px) {
    .Item {
        width: 100%;
    }
}

.Item:not(:last-child) {
    margin-bottom: 10px;
}

.Item__link {
    text-decoration: none;
}

.Item__title {
    height: 41px;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9em;
    color: #555;
    width: 90%;
    margin: 5px auto 0;
}

.Item__price {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9em;
    margin-top: 5px;
    color: #777;
}

.ImageContainer {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Image {
    width: auto;
    height: 130px;
    border-radius: 5px
}

.Item:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.ImageContainer {
    position: relative;
}

.AddToCartButton {
    width: 100%;
    padding: 10px;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9em;
    color: #fff;
    background-color: #333;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.AddToCartButton:hover {
    background-color: #555;
}
</style>
