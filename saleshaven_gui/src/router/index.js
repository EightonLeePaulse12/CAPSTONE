import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { title: "Home - SalesHaven" },
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    meta: { title: "About - SalesHaven" },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { title: "Register - SalesHaven" },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "Login - SalesHaven" },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/products",
    name: "products",
    meta: { title: "Catalog - SalesHaven" },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    meta: { title: "Admin - SalesHaven" },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AdminView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    meta: { title: "Cart - SalesHaven" },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CartView.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    meta: { title: "Checkout - SalesHaven" },

    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CheckoutView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { title: "Profile - SalesHaven" },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserProfileView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    meta: { title: "Contact - SalesHaven" },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ContactView.vue"),
  },
  {
    path: "/product/:prodID",
    name: "ProductView",
    meta: { title: "Product - SalesHaven" },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SingleProductView.vue"),
  },
  {
    path: "/success",
    name: "success",
    meta: { title: "Purchase Complete - SalesHaven" },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SuccessView.vue"),
  },
  ,
  {
    path: "/manage",
    name: "manage",
    meta: { title: "Manage Your Products - SalesHaven" },

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Manage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
