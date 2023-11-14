<template>
    <section class="h-100 gradient-custom">
        <div class="container py-5">
            <div class="row d-flex justify-content-center my-4">
                <div class="col-md-8">
                    <h5 v-if="products.length === 0">Không có sản phẩm nào</h5>
                    <div class="card mb-4">
                        <div class="card-header py-3">
                            <h5 class="mb-0">Sản phẩm</h5>
                        </div>
                        <div class="card-body" :key="index" v-for="(product, index) in products">
                            <!-- Single item -->
                            <div class="row">
                                <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                    <!-- Image -->
                                    <div class="bg-image hover-overlay hover-zoom ripple rounded"
                                        data-mdb-ripple-color="light">
                                        <img :src="product.imgUrl" class="w-100" alt="Blue Jeans Jacket" />
                                        <a href="#!">
                                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                                        </a>
                                    </div>
                                    <!-- Image -->
                                </div>

                                <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                    <!-- Data -->
                                    <p><strong>{{ product.name }}</strong></p>
                                    <br>
                                    <button type="button" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                                        title="Remove item" @click="deleteCart(product)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    <!-- Data -->
                                </div>

                                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                    <!-- Quantity -->
                                    <div class="d-flex mb-4" style="max-width: 300px">
                                        <button class="btn btn-primary px-3 me-2" @click="decrementQuantity(product)">
                                            <i class="fas fa-minus"></i>
                                        </button>

                                        <div class="form-outline">
                                            <input id="form1" min="0" name="quantity" v-model="product.quantity"
                                                type="number" class="form-control" @change="updateQuantity(product)" />
                                            <label class="form-label" for="form1"> Số lượng</label>
                                        </div>

                                        <button class="btn btn-primary px-3 ms-2" @click="incrementQuantity(product)">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <p class="text-start text-md-center">
                                        <strong> {{
                                            String(product.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                                        }}
                                            đồng</strong>
                                    </p>
                                </div>
                            </div>
                            <hr class="my-4" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-header py-3">
                            <h5 class="mb-0">Summary</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Sản phẩm
                                    <span>{{ this.total.quantity }}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Mã giảm giá
                                    <span>Không</span>
                                </li>
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>Tổng: {{ String(this.total.price).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                                        }}</strong>
                                        <strong>
                                            <p class="mb-0">(Đã bao gồm VAT)</p>
                                        </strong>
                                    </div>
                                    <span>
                                        <strong>

                                        </strong>
                                    </span>
                                </li>
                            </ul>

                            <button type="button" class="btn btn-primary btn-lg btn-block">
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import ProductService from "../services/product.service";
import cartService from "../services/cart.service";
export default {
    data() {
        return {
            carts: [],
            products: [],
            total: {
                quantity: 0,
                price: 0,
            },
        };
    },
    methods: {
        async getAllCart() {
            try {

                // console.log(this.$store.state.userId)
                // console.log(this.carts)
                const filter = {
                    user_id: this.$store.state.userId,
                }
                this.carts = await cartService.getAll(filter);
                this.products = await Promise.all(this.carts.map(async (cart) => {
                    const product = await ProductService.get(cart.product_id);
                    product.quantity = parseInt(cart.quantity)
                    return product;
                }));
                this.countTotal()
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCart(product) {
            const filter = {
                user_id: this.$store.state.userId,
                product_id: product._id
            }
            try {
            console.log(filter)
            const result = await cartService.delete(filter)
            
            alert(result.message)
            this.products = []
            this.getAllCart()
            }
            catch (error) {
                alert(error)
            }
        },
        async updateCart(product) {
            const filter = {
                user_id: this.$store.state.userId,
                product_id: product._id,
                quantity: product.quantity
            }
            try {
                await cartService.update(filter)
            }
            catch (error) {
                alert(error)
            }
        },

        countTotal() {
            this.total.quantity = 0;
            this.total.price = 0;
            this.products.forEach((product) => {
                this.total.quantity += product.quantity;
                this.total.price += product.price * product.quantity;
            });
        },
        updateQuantity(product) {
            // Đảm bảo số lượng là một số hợp lệ
            const newQuantity = parseInt(product.quantity);
            if (!isNaN(newQuantity)) {
                // Cập nhật số lượng của sản phẩm
                product.quantity = newQuantity;
                // Tính lại tổng
                this.updateCart(product);
                this.countTotal();
            }
        },

        incrementQuantity(product) {
            // Tăng số lượng của sản phẩm
            product.quantity++;
            this.updateCart(product);
            // Tính lại tổng
            this.countTotal();
        },

        decrementQuantity(product) {
            // Đảm bảo số lượng không giảm dưới 0
            if (product.quantity > 0) {
                // Giảm số lượng của sản phẩm
                product.quantity--;
                this.updateCart(product);
                // Tính lại tổng
                this.countTotal();
            }
        },
    },
    mounted() {
        const listLocalCart = JSON.parse(
            localStorage.getItem("localProductCart") ?? "[]"
        );
        this.products = listLocalCart;
    },
    created() {
        this.getAllCart()
    }
};
</script>
<style></style>