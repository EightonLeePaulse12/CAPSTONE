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
    userData: null,
    userRole: null
  },
  getters: {
    getError(state) {
      return state.error;
    },
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
      console.log(user)
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
    setUserData(state, userData){
      state.userData = userData
      state.userRole = userData.userRole
      console.log(userData, userData.userRole)
    }
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
      console.log("Reached");
      try {
        const res = await axios.post(`${api}register`, payload);
        console.log("Res: ", res.data)
        const { msg, err, token } = res.data
        if (msg === "An error occured"){
          context.commit("setError", msg)
          context.commit("setRegStatus", "Not registered")
          return { success: false, error: msg }
        } else if(token){
          context.commit("setToken", token)
          context.commit("setRegStatus", "Registered successfully")
          return { success: true, token }
        } else if(err){

        }
      } catch (e) {
        context.commit("setError", e);
        console.log(e);
        context.commit("setRegStatus", "Not registered");
        throw e;
      }
    },
    async login(context, payload){
      try{
        const res = await axios.post(`${api}login`, payload)
        console.log("Res: ", res.data)
        const { msg, err, token } = res.data
        if(msg === "You are providing the wrong email or password"){
          context.commit("setError", msg)
          context.commit("setLogStatus", "Not logged in")
          return { success: false, error: msg }
        }
        if(msg){
          context.commit("setUser", res.data)
          context.commit("setToken", token)
          context.commit("setUserData", res.data)
          context.commit("setLogStatus", "Logged in!")
          Cookies.set("userToken", token, {
            expires: 1
          })
          return { success: true, token }
        } else if(err){
          context.commit("setError", err)
          context.commit("setRegStatus", "Not Registered")
          return { success: false, error: err }
        } else{
          context.commit("setError", "Unknown error during login")
          context.commit("setLogStatus", "not logged in")
          return { success: false, error: "Unknown error" }
        }
      } catch(err){
        if(err.resp){
          console.error("Server gave an error: ", err.resp.status, err.resp.data)
        } else if(err.req){
          console.error("No response from the server. Check your internet connection")
        } else{
          console.log("An error occured: ", err)
        }
        context.commit("setError", "An error occured while trying to log in")
        context.commit("setLogStatus", "Not logged in")
        return { success: false, error: "Network error" }
      }
    },
    init(context) {
      const token = Cookies.get("userToken");
      if (token) {
        context.commit("setToken", token);
      }
    },
    async logout(context) {
      context.commit("setToken", null);
      Cookies.remove("userToken");
    },
  },
  modules: {},
});
