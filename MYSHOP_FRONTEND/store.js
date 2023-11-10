// store.js
import Vuex from 'vuex';

const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        role: null,
        userName: null,
        userId: null,
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.role = null; // Đặt giá trị role về null khi đăng xuất
        },
        setRole(state, role) {
            state.role = role;
        },
        setName(state, name){
            state.userName = name;
        },
        setID(state, id){
            state.userId = id;
        }
    },
});

export default store;