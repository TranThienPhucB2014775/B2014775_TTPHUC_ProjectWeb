import { createWebHistory, createRouter } from "vue-router";
import index from '../views/index.vue';

const routes = [
    //login
    {
        path: "/login",
        name: "login",

        component: () => import('../components/login.vue'),
    },
    //Register
    {
        path: "/register",
        name: "register",
        component: () => import('../components/register.vue'),
    },
    //admin
    {
        path: "/admin/users",
        name: "admin-users",
        component: () => import('../views/admin/user_manager_screen.vue'),
    },
    {
        path: "/admin/products",
        name: "admin-products",
        component: () => import('../views/admin/product_manager_screen.vue'),

    },
    {
        path: "/admin/add_product",
        name: "admin-add-products",
        component: () => import('../components/admin/product_form.vue'),

    },
    {
        path: "/product/edit_product/:id",
        name: "admin-product-edit",
        component: () => import('../components/admin/product_form.vue'),
    },
    {
        path: "/:pathMatch(.*)*", //regular expression
        name: "error",
        component: () => import('../views/Error.vue'),
    },
    // Home
    {
        path: "",
        name: "index",
        component: index,
        children: [
            {
                path: "/products",
                name: "products",
                component: () => import('../components/list_product.vue'),
            },
            {
                path: "/cart",
                name: "cart",
                component: () => import('../components/cart_products.vue'),
            },
            {
                path: "",
                name: "about",
                component: () => import('../components/about.vue'),
            },
            {
                path: "/contact",
                name: "contact",
                component: () => import('../components/contact.vue'),
            }
        ]
    },


];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// router.beforeEach((to, from, next) => {
//     const authToken = localStorage.getItem("localUserLogin");
//     if (to.name === "admin-dashboard" && !authToken) {
//         // If the user is trying to access the protected route and doesn't have a valid auth token, redirect to the login page.
//         next({ name: "admin" });
//     } else {
//         // Otherwise, allow the user to enter the route.
//         next();
//     }
// });
export default router;