<template>
    <nav class="navbar">
        <div class="navbar-container container">
            <input type="checkbox" name="" id="">
            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
            <ul class="menu-items">
                <router-link :to="{ name: 'about' }"><li><a>Giới thiệu</a></li></router-link>
                <router-link :to="{ name: 'products' }"><li v-if="!isUserRole"><a>Cửa hàng</a></li></router-link>
                <li v-if="isLoggedIn && !isUserRole"><router-link :to="{name: 'cart'}"><a>Giỏ hàng</a></router-link></li>
                <router-link :to="{ name: 'contact' }"><li><a>Liên Hệ</a></li></router-link>
                <li v-if="isUserRole" class="sign_in"><router-link to="/admin/products">Quản trị</router-link></li>
                <li v-if="isLoggedIn">{{ this.$store.state.userName }}</li>
                <li v-if="isLoggedIn"><a @click="Log_out" href="#">Đăng suất</a></li>
                <div v-else>
                    <li class="sign_in"><router-link to="/login">Đăng nhập</router-link></li>
                </div>
            </ul>
            <h1 class="logo"><router-link :to="{ name: 'about' }">Gamer's Haven</router-link></h1>
        </div>
    </nav>
</template>
<script>
export default {
    methods: {
        Log_out() {
            this.$store.commit('logout');
            this.$store.commit('setRole', '');
            this.$store.commit('setID', '');

        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.isLoggedIn;
        },
        isUserRole() {
            return this.$store.state.role == 'admin';
        },
    },
    
};
</script>
<style>
.navbar input[type="checkbox"],
.navbar .hamburger-lines {
    display: none;
}

.container {
    max-width: 1200px;
    width: 90%;
    margin: auto;
}

.navbar {
    box-shadow: 0px 5px 10px 0px #aaa;
    position: fixed;
    width: 100%;
    background: #fff;
    color: #000;
    opacity: 0.85;
    z-index: 100;
}

.navbar-container {
    display: flex;
    justify-content: space-between;
    height: 64px;
    align-items: center;
}

.menu-items {
    order: 2;
    display: flex;
    align-items: center; /* Căn giữa theo chiều dọc */
    margin: 0; /* Xóa margin để đảm bảo căn giữa chính xác */
    padding: 0; 
}

.logo {
    order: 1;
    font-size: 2.3rem;
}

.menu-items li {
    list-style: none;
    margin-left: 1.5rem;
    font-size: 1.3rem;
}

.navbar a {
    color: #444;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease-in-out;
}

.navbar a:hover {
    color: #117964;
}

@media (max-width: 768px) {
    .navbar {
        opacity: 0.95;
    }

    .navbar-container input[type="checkbox"],
    .navbar-container .hamburger-lines {
        display: block;
    }

    .navbar-container {
        display: block;
        position: relative;
        height: 64px;
    }

    .navbar-container input[type="checkbox"] {
        position: absolute;
        display: block;
        height: 32px;
        width: 30px;
        top: 20px;
        left: 20px;
        z-index: 5;
        opacity: 0;
        cursor: pointer;
    }

    .navbar-container .hamburger-lines {
        display: block;
        height: 28px;
        width: 35px;
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .navbar-container .hamburger-lines .line {
        display: block;
        height: 4px;
        width: 100%;
        border-radius: 10px;
        background: #333;
    }

    .navbar-container .hamburger-lines .line1 {
        transform-origin: 0% 0%;
        transition: transform 0.3s ease-in-out;
    }

    .navbar-container .hamburger-lines .line2 {
        transition: transform 0.2s ease-in-out;
    }

    .navbar-container .hamburger-lines .line3 {
        transform-origin: 0% 100%;
        transition: transform 0.3s ease-in-out;
    }

    .navbar .menu-items {
        padding-top: 100px;
        background: #fff;
        height: 100vh;
        max-width: 300px;
        transform: translate(-150%);
        display: flex;
        flex-direction: column;
        margin-left: -40px;
        padding-left: 40px;
        transition: transform 0.5s ease-in-out;
        box-shadow: 5px 0px 10px 0px #aaa;
        overflow: scroll;
    }

    .navbar .menu-items li {
        margin-bottom: 1.8rem;
        font-size: 1.1rem;
        font-weight: 800;
    }

    .logo {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 2.5rem;
    }

    .navbar-container input[type="checkbox"]:checked~.menu-items {
        transform: translateX(0);
    }

    .navbar-container input[type="checkbox"]:checked~.hamburger-lines .line1 {
        transform: rotate(45deg);
    }

    .navbar-container input[type="checkbox"]:checked~.hamburger-lines .line2 {
        transform: scaleY(0);
    }

    .navbar-container input[type="checkbox"]:checked~.hamburger-lines .line3 {
        transform: rotate(-45deg);
    }

}

@media (max-width: 500px) {
    .navbar-container input[type="checkbox"]:checked~.logo {
        display: none;
    }
}
</style>