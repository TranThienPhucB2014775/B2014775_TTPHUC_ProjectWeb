<template>
    <body>
        <h1>Thông tin sản phẩm</h1>
        <!-- <p>Please fill out this form with the required information</p> -->
        <form @submit.prevent="save()">
            <fieldset>
                <label>Nhập tên sản phẩm
                    <input type="text" name="first-name" required @blur="validate()" v-model="product.name"
                        :class="{ 'is-invalid': errors.name }" />
                </label>
                <div class="invalid-feedback" v-if="errors.imgUrl">
                    {{ errors.imgUrl }}
                </div>
                <label>Nhập Giá sản phẩm
                    <input type="number" min="1" name="last-name" required @blur="validate()" v-model="product.price"
                        :class="{ 'is-invalid': errors.price }" />
                </label>
                <div class="invalid-feedback" v-if="errors.imgUrl">
                    {{ errors.imgUrl }}
                </div>
                <label>Nhập dường link hình ảnh sản phẩm
                    <input type="text" name="email" required @blur="validate()" v-model="product.imgUrl"
                        :class="{ 'is-invalid': errors.imgUrl }" />
                </label>
                <div class="invalid-feedback" v-if="errors.imgUrl">
                    {{ errors.imgUrl }}
                </div>
                <label>Nhập mô tả sản phẩm
                    <textarea type="text" name="text" required style="height: 200px;" @blur="validate()"
                        v-model="product.description" :class="{ 'is-invalid': errors.description }" />
                </label>
                <div class="invalid-feedback" v-if="errors.imgUrl">
                    {{ errors.imgUrl }}
                </div>
            </fieldset>
            <input type="submit" value="Submit" />
        </form>
    </body>
</template>
<script>
import ProductService from "../../services/product.service";

export default {
    data() {
        return {
            errors: {
                name: "",
                imgUrl: "",
                price: "",
                description: "",
            },
            product: {
                name: "",
                imgUrl: "",
                price: "",
                description: "",
            },
        };
    },
    methods: {
        validate() {
            let isValid = true;

            this.errors = {
                name: "",
                imgUrl: "",
                price: "",
                description: "",
            };

            if (!this.product.name) {
                this.errors.name = "Tên sản phẩm là bắt buộc";
                isValid = false;
            }
            if (!this.product.imgUrl) {
                this.errors.imgUrl = "Hình ảnh sản phẩm là bắt buộc";
                isValid = false;
            }
            if (!this.product.price) {
                this.errors.price = "Giá sản phẩm là bắt buộc";
            } else if (!this.isNumber(this.product.price)) {
                this.errors.price = "Tên sản phẩm phải là số";
                isValid = false;
            }

            if (!this.product.description) {
                this.errors.description = "Mô tả sản phẩm là bắt buộc";
                isValid = false;
            }
            return isValid;
        },
        isNumber(value) {
            return /^\d*$/.test(value);
        },
        async save() {
            if (this.validate()) {
                if (this.$route.params.id) {
                    try {
                        await ProductService.update(
                            this.$route.params.id,
                            this.product
                        );
                        this.$router.push({ name: "admin-dashboard" });
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    try {
                        await ProductService.create(this.product);
                        // this.$router.push({ name: "admin-dashboard" });
                        alert('123')
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
        async getProduct(productId) {
            try {
                this.product = await ProductService.get(productId);
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        let productId = this.$route.params.id;
        if (productId) {
            this.getProduct(productId);
        }
    },
};
</script>
<style>
body {
    width: 100%;
    height: 100vh;
    margin: 0;
    background-color: #1b1b32;
    color: #f5f6f7;
    font-family: Tahoma;
    font-size: 16px;
}

h1,
p {
    margin: 1em auto;
    text-align: center;
}

form {
    width: 60vw;
    max-width: 800px;
    min-width: 300px;
    margin: 0 auto;
    padding-bottom: 2em;
}

fieldset {
    border: none;
    padding: 2rem 0;
}

fieldset:not(:last-of-type) {
    border-bottom: 3px solid #3b3b4f;
}

label {
    display: block;
    margin: 0.5rem 0;
}

input,
textarea,
select {
    margin: 10px 0 0 0;
    width: 100%;
    min-height: 2em;
}

input,
textarea {
    background-color: #0a0a23;
    border: 1px solid #0a0a23;
    color: #ffffff;
}

.inline {
    width: unset;
    margin: 0 0.5em 0 0;
    vertical-align: middle;
}

input[type="submit"] {
    display: block;
    width: 60%;
    margin: 1em auto;
    height: 2em;
    font-size: 1.1rem;
    background-color: #3b3b4f;
    border-color: white;
    min-width: 300px;
}

input[type="file"] {
    padding: 1px 2px;
}

a {
    color: #dfdfe2;
}
</style>