<template>
    <body>
        <div id="error-frame">
            <div class="container_error">
                <h1>404</h1>
                <h4>Opps! Page not found</h4>
                <p>Xin lỗi, trang bạn đang tìm không tồn tại. bạn có thể về trang chủ.</p>
                <div class="btn">
                    <router-link to="/login">Trang chủ</router-link>
                </div>
            </div>
        </div>
    </body>
</template>
<style>
* {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: sans-serif;
}

/* body {
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url(https://wallpapercave.com/wp/wp3378366.jpg);
    background-position: center;
    background-size: cover;
} */

#error-frame {
    position: absolute;
    top: 10%;
    left: 15%;
    right: 15%;
    bottom: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    border: 2px solid #2DBDE8;
}

#error-frame .container_error {
    max-width: 600px;
    text-align: center;
}

.container_error h1 {
    font-size: 18vw;
    line-height: 1em;
    position: relative;
    text-shadow: 0 0 5px #2DBDE8, 0 0 5px #2DBDE8;
}

.container_error h4 {
    font-size: 1.8em;
    margin-bottom: 20px;
    text-transform: uppercase;
    color: #000;
    font-size: 2.1em;
    max-width: 600px;
    position: relative;
}

.container_error p {
    font-size: 1.2em;
    color: #0d0d0d;
}

.container_error .btn {
    margin: 25px 0;
    display: inline-flex;
}

.container_error .btn a {
    display: inline-block;
    margin: 0 10px;
    text-decoration: none;
    border: 2px solid #2DBDE8;
    color: #2DBDE8;
    font-weight: 500;
    padding: 10px 25px;
    border-radius: 25px;
    text-transform: uppercase;
    transition: all 0.5s ease;
}

.container_error .btn a:hover {
    background: #2DBDE8;
    color: #fff;
}
</style>