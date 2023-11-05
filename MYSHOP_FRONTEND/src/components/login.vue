<template>
    <div class="login-form">
        <form @submit.prevent="login()">
            <h1>Login</h1>
            <div class="content">
                <ul class="ul_form">
                    <li>
                        <div class="input-field">
                            <input type="email" v-model="user.email" placeholder="Email" autocomplete="nope"
                                @blur="validate()" :class="{ 'is-invalid': errors.email }">
                            <div class="invalid-feedback" v-if="errors.password">
                                {{ errors.email }}
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="input-field">
                            <input type="password" v-model="user.password" placeholder="Password"
                                autocomplete="new-password" @blur="validate()" :class="{ 'is-invalid': errors.password }">
                            <div class="invalid-feedback" v-if="errors.password">
                                {{ errors.password }}
                            </div>
                        </div>
                    </li>
                    <li><a href="#" class="link">Forgot Your Password?</a></li>
                </ul>



            </div>
            <div class="action">
                <button type="submit">Đăng nhập</button>
            </div>
        </form>
        <div class="action">
            <button @click="goToIndex($event)">Trang chủ</button>
            <button @click="goToRegister($event)">Đăng ký</button>
        </div>
    </div>
</template>
  
<script>
import UserService from "../services/user.service";

export default {
    data() {
        return {
            errors: {
                email: "",
                password: "",
            },
            user: {
                email: "",
                password: "",
            },
        }
    },
    methods: {
        validate() {
            let isValid = true;

            this.errors = {
                email: "",
                password: "",
            };
            if (!this.user.email) {
                this.errors.email = "Email là bắt buộc";
                isValid = false;
            }
            if (!this.user.password) {
                this.errors.password = "Mật khẩu là bắt buộc";
                isValid = false;
            }
            return isValid;
        },
        goToRegister(event) {
            event.preventDefault();
            this.$router.push('/register');
        },
        // goToLogin() {
        //     this.$router.push('');
        // }
        goToIndex(event) {
            event.preventDefault();
            this.$router.push('/');
        },
        async login() {
            console.log(this.user)
            if (this.validate()) {
                const userLogin = await UserService.login(this.user);
                const localUserLogin = JSON.stringify(userLogin);
                localStorage.setItem("localUserLogin", localUserLogin);
                if (userLogin.role === "user") {
                    // this.$router.push({ name: "home" });
                } else if (userLogin.role === "admin") {
                    console.log('abc')
                    // this.$router.push({ name: "admin-dashboard" });
                } else {
                    alert("Xin lỗi! Bạn đã nhập sai email hoặc mật khẩu!");
                }
            }
        }
    }
};
</script>
  

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}

body {
    /* background: #e35869; */
    font-family: 'Rubik', sans-serif;
}

.invalid-feedback {
    text-align: left;
    color: red;
    margin-top: 5px;
}

.login-form {
    background: #fff;
    width: 500px;
    margin: 65px auto;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);
}

.login-form h1 {
    padding: 35px 35px 0 35px;
    font-weight: 300;
}

.login-form .content {
    padding: 35px;
    text-align: center;
}

.login-form .input-field {
    padding: 12px 5px;
}

.login-form .input-field input {
    font-size: 16px;
    display: block;
    font-family: 'Rubik', sans-serif;
    width: 420px;
    padding: 10px 1px;
    border: 0;
    border-bottom: 1px solid #747474;
    outline: none;
    -webkit-transition: all .2s;
    transition: all .2s;
}

.login-form .input-field input::-webkit-input-placeholder {
    text-transform: uppercase;
}

.login-form .input-field input::-moz-placeholder {
    text-transform: uppercase;
}

.login-form .input-field input:-ms-input-placeholder {
    text-transform: uppercase;
}

.login-form .input-field input::-ms-input-placeholder {
    text-transform: uppercase;
}

.login-form .input-field input::placeholder {
    text-transform: uppercase;
}

.login-form .input-field input:focus {
    border-color: #222;
}

.login-form a.link {
    text-decoration: none;
    color: #747474;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    display: inline-block;
    margin-top: 20px;
}

.login-form .action {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
}

.login-form .action button {
    width: 100%;
    border: none;
    padding: 18px;
    font-family: 'Rubik', sans-serif;
    cursor: pointer;
    text-transform: uppercase;
    background: #e8e9ec;
    color: #777;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 0;
    letter-spacing: 0.2px;
    outline: 0;
    -webkit-transition: all .3s;
    transition: all .3s;
}

.login-form .action button:hover {
    background: #d8d8d8;
}

.login-form .action button:nth-child(2) {
    background: #2d3b55;
    color: #fff;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 4px;
}

.login-form .action button:nth-child(2):hover {
    background: #3c4d6d;
}

.ul_form {
    list-style-type: none;
    /* Loại bỏ dấu chấm đầu */
    padding-left: 0;
    /* Loại bỏ khoảng cách trái của danh sách */
}
</style>