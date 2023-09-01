import { createStore } from "vuex";
import axios from "axios";
import Cookies from "js-cookie";
const api = "https://capstone-project-ymzb.onrender.com/";

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
    userRole: null,
    featuredProducts: null,
    msg: null,
    cart: []
  },
  getters: {
    getError(state) {
      return state.error;
    },
    cart: (state) => cart,
    cartTotal: (state) => state.cart.reduce((total, product)=> total + product.price, 0)
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setMsg(state, msg) {
      state.msg = msg;
    },
    setUser(state, user) {
      state.user = user;
      console.log(user);
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
      Cookies.set("userToken", token, {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "None",
      });
    },
    setRegStatus(state, status) {
      state.regStatus = status;
    },
    setError(state, error) {
      state.error = error;
    },
    setLogStatus(state, status) {
      state.logStatus = status;
    },
    setUserData(state, userData) {
      state.userData = userData;
      if (userData && userData.userRole) {
        state.userRole = userData.userRole;
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log(userData, userData.userRole);
      } else {
        state.userData = null;
        state.userRole = null;
        localStorage.removeItem("userData");
      }
      console.log(userData, userData.userRole);
    },
    addToCart(state, product){
      state.cart.push(product)
    }
  },
  actions: {
    async fetchUsers(context) {
      try {
        // console.log(context.state.token);
          const res = await axios.get(`${api}users`, {
            headers: {
              "Authorization": context.state.token,
              "Content-Type": "application/json"
            }
          });
          console.log()
          const { err, results } = res.data;
          context.commit("setUsers", results);
        } catch (e) {
          context.commit("setMsg", "an error occured");
        }
    },
    async fetchUser(context) {
      try {
        const { err, result } = await axios.get(`${api}user`, {
          headers: {
            "Authorization": context.state.token,
            "Content-Type": "application/json"
          }
        });
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
    async fetchProducts(context) {
      try {
      // console.log(context.state.token);
        const res = await axios.get(`${api}products`, {
          headers: {
            "Authorization": context.state.token,
            "Content-Type": "application/json"
          }
        });
        console.log()
        const { err, results } = res.data;
        if(results){
          context.commit("setProducts", results);
        } else if(err){
          context.commit("setMsg", err)
        }
      } catch (e) {
        context.commit("setMsg", "An error occured");
      }
    },
    async fetchProduct(context) {
      try {
        const { data } = await axios.get(`${api}product`, {
          headers: {
            "Authorization": context.state.token,
            "Content-Type": "application/json"
          }
        });
        context.commit("setProduct", data.results);
      } catch (e) {
        context.commit("setMsg", "an error occured");
      }
    },
    async register(context, payload) {
      console.log("Reached");
      try {
        const res = await axios.post(`${api}register`, payload);
        console.log("Res: ", res.data);
        const { msg, err, token } = res.data;
        if (msg === "An error occured") {
          context.commit("setError", msg);
          context.commit("setRegStatus", "Not registered");
          return { success: false, error: msg };
        } else if (token) {
          context.commit("setToken", token);
          context.commit("setRegStatus", "Registered successfully");
          return { success: true, token };
        } else if (err) {
          console.error(err);
        }
      } catch (e) {
        context.commit("setError", e);
        console.log(e);
        context.commit("setRegStatus", "Not registered");
        throw e;
      }
    },
    async login(context, payload) {
      try {
        const res = await axios.post(`${api}login`, payload);
        console.log("Res: ", res.data);
        const { msg, err, token, userData } = res.data;
        console.log(userData);
        if (msg === "You are providing the wrong email or password") {
          context.commit("setError", msg);
          context.commit("setLogStatus", "Not logged in");
          return { success: false, error: msg };
        }
        if (msg) {
          context.commit("setUser", userData);
          context.commit("setToken", token);
          context.commit("setUserData", userData);
          context.commit("setLogStatus", "Logged in!");
          Cookies.set("userToken", token, {
            expires: 1,
          });
          return { success: true, token };
        } else if (err) {
          context.commit("setError", err);
          return { success: false, error: err };
        } else {
          context.commit("setError", "Unknown error during login");
          context.commit("setLogStatus", "not logged in");
          return { success: false, error: "Unknown error" };
        }
      } catch (err) {
        if (err.resp) {
          console.error(
            "Server gave an error: ",
            err.resp.status,
            err.resp.data
          );
        } else if (err.req) {
          console.error(
            "No response from the server. Check your internet connection"
          );
        } else {
          console.log("An error occured: ", err);
        }
        context.commit("setError", "An error occured while trying to log in");
        context.commit("setLogStatus", "Not logged in");
        return { success: false, error: "Network error" };
      }
    },
    cookieCheck(context) {
      const token = Cookies.get("userToken");
      if (token) {
        context.commit("setToken", token);
      }
    },
    init(context) {
      context.dispatch("cookieCheck");
    },
    async logout(context) {
      context.commit("setToken", null);
      context.commit("setUser", null);
      context.commit("setUserData", null);
      Cookies.remove("userToken");
      router.push("/login");
    },
    async addToCart(context, product){
      try{
        const { res } = await axios.post(`${api}cart`, product,{
          headers:{
            Authorization: context.state.token,
            "Content-Type": "application/json"
          }
        })
        const { err, msg } = res.data
        if(msg){
          context.commit("addToCart", product)
        } else{
          console.error(err)
        }
      } catch(e){
        console.error(e)
      }
      
    }
  },
  modules: {},
});
