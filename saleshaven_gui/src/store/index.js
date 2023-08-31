import { createStore } from "vuex";
import axios from "axios";
const api = "https://capstone-project-ymzb.onrender.com/";
import Cookies from "js-cookie";

export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    product: null,
    selectedProduct: null,
    loader: null,
    token: null,
    regStatus: null,
    logStatus: null,
    error: null,
    token: null,
  },
  getters: {
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product;
    },
    setLoader(state, loader) {
      state.loader = loader;
    },
    setToken(state, token) {
      state.token = token;
    },
    setRegStatus(state, status) {
      state.regStatus = status;
    },
    setError(state, error) {
      state.error = error;
    },
    setToken(state, token) {
      state.token = token;
    },
    setLogStatus(state, status) {
      state.logStatus = status;
    },
  },
  actions: {
    async fetchUsers(context) {
      try {
        const { err, results } = await axios.get(`${api}users`);
        if (results) {
          context.commit("setUsers", results);
          console.log("Users retrieved successfully");
        }
        if (err) {
          context.commit("setMsg", err);
        }
      } catch (e) {
        context.commit("setMsg", e);
      }
    },
    async fetchUser(context) {
      try {
        const { err, result } = await axios.get(`${api}user`);
        if (result) {
          context.commit("setUser", result);
          console.log("User retrieved successfully");
        }
        if (err) {
          context.commit("setMsg", err);
        }
      } catch (e) {
        context.commit("setMsg", e);
      }
    },
    async register(context, payload) {
      console.log("Reached")
      try {
        const res = await axios.post(`${api}register`, payload)
        if(res){
          context.commit("setUser", res.data)
          context.commit("setRegStatus", "Registered!")
          context.commit("setError", null)
        }
      } catch (e) {
        context.commit("setError", e.response.data.msg);
        console.log(e)
        context.commit("setRegStatus", "Not registered");
        throw e;
      }
    },
    async login(context, payload) {
      try {
        const res = await axios.post(`${api}login`, payload);
        console.log(res)
        const token = res.data.token;
        context.commit("setUser", res.data)
        context.commit("setToken", token);
        context.commit("setLogStatus", "Logged in!");
        Cookies.set("userToken", token, { expires: 1 });
      } catch (e) {
        context.commit("setError", e.response.data.msg);
        context.commit("setLogStatus", "Not logged in");
      }
    },
    init(context){
      const token = Cookies.get("userToken")
      if(token){
        context.commit("setToken", token)
      }
    },
    async logout(context){
      context.commit("setToken", null)
      Cookies.remove("userToken")
    }
  },
  modules: {},
});