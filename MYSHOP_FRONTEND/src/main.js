import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../store.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

//vue splide
import '@splidejs/vue-splide/css'

const app = createApp(App);

app.use(store); // Sử dụng Vuex store
app.use(router);

app.mount('#app');