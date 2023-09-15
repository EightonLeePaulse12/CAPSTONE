import { createStore } from "vuex";
import axios from "axios";
import Cookies from "js-cookie";
const api = "https://capstone-project-ymzb.onrender.com/";
import Swal from "sweetalert2";

export default createStore({
  state: {
    users: null,
    user: null,
    myprod: null,
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
    cart: [],
    buyTransactions: 0,
    sellTransactions: 0,
    points: 0,
    upd: null,
  },
  getters: {
    getError(state) {
      return state.error;
    },
    cartTotal(state) {
      return state.cart.reduce((total, product) => total + product.price, 0);
    },
  },
  mutations: {
    setUpd(state, payload) {
      state.userData.userPass = payload.userPass;
    },
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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
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
    },
    addToCart(state, productToAdd) {
      console.log("Reached");
      const exists = state.cart.find(
        (item) => item.productID === productToAdd.prodID
      );
      console.error(exists);
      if (exists) {
        Swal.fire({
          icon: "success",
          title: "Item is already in cart",
          text: `${productToAdd.prodName} is already in cart.`,
        });
        exists.quantity += 1;
      } else {
        state.cart.push({
          productID: productToAdd.prodID,
          prodName: productToAdd.prodName,
          price: productToAdd.price,
          quantity: 1,
        });
      }
      console.log("Cart: ", state.cart);
    },
    removeFromCart(state, productID) {
      state.cart = state.cart.filter((item) => item.productID !== productID);
    },
    updateCartItem(state, updatedItem) {
      const itemIndex = state.cart.findIndex(
        (item) => item.productID === updatedItem.productID
      );
      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity = updatedItem.quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    setBuyTransactions(state, count) {
      state.buyTransactions = count;
    },
    setSellTransactions(state, count) {
      state.sellTransactions = count;
    },
    awardPoints(state, { userID, points }) {
      const user = state.users.find((user) => user.userID === userID);
      if (user) {
        user.points += points;
      }
    },
    increasePoints(state, amount) {
      state.points += amount;
    },
    setMyProd(state, myprod) {
      state.myprod = myprod;
    },
  },
  actions: {
    async fetchUsers(context) {
      try {
        // console.log(context.state.token);
        const res = await axios.get(`${api}users`, {
          headers: {
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        });
        console.log();
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
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
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
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        });
        console.log();
        const { err, results } = res.data;
        if (results) {
          context.commit("setProducts", results);
        } else if (err) {
          context.commit("setMsg", err);
        }
      } catch (e) {
        context.commit("setMsg", "An error occured");
      }
    },
    async fetchProduct(context) {
      try {
        const { data } = await axios.get(`${api}product`, {
          headers: {
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        });
        context.commit("setProduct", data.results);
      } catch (e) {
        context.commit("setMsg", "an error occured");
      }
    },
    async fetchOwnProd(context) {
      const res = await axios.get(
        `${api}ownProd/${context.state.userData.userID}`,
        {
          headers: {
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        }
      );
      const { results, err } = res.data;
      if (err) {
        context.commit("setError", err);
      }
      if (results) {
        context.commit("setMyProd", results);
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
        } else if (token && msg === "User registered successfully") {
          context.dispatch("fetchUsers");
          context.commit("setToken", token);
          context.commit("setRegStatus", "Registered successfully");
          return { success: true, token };
        } else if (err) {
          console.error(err);
        } else if (msg === "This email address is already in use") {
          context.commit("setRegStatus", "Not registered");
          return { success: false, msg: "Email is already in use" };
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
          return { success: true, token, userData };
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
    async changePass(context, payload) {
      try {
        const userID = context.state.userData.userID;
        const res = await axios.patch(`${api}user/${userID}`, payload, {
          headers: {
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        const { err, msg } = res.data;
        if (err) {
          context.commit("setError", err);
        }
        if (msg === "User record updated successfully") {
          context.commit("setUpd", payload.userPass);
          context.commit("setMsg", "Successfully updated password");
        }
      } catch (e) {}
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
    },
    async addToCart(context, product) {
      try {
        const response = await axios.post(
          `${api}cart`,
          { productID: product.prodID },
          {
            headers: {
              Authorization: context.state.token,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.msg === "Product added to cart successfully") {
          context.commit("addToCart", product);
          Swal.fire({
            icon: "success",
            title: "Added to Cart",
            text: `${product.prodName} has been added to your cart.`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          context.commit("setError", "Failed to add to cart");
        }
      } catch (e) {
        console.error("Error adding to cart: ", e);
        context.commit(
          "setError",
          "An error occurred while adding to the cart"
        );
      }
    },
    async removeFromCart(context, productID) {
      try {
        const res = await axios.delete(`${api}cart/${productID}`, {
          headers: {
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          const { err, msg } = res.data;
          if (err) {
            context.commit("setError", err);
          }
          if (msg === "Product removed from cart") {
            context.commit("removeFromCart", productID);
          } else {
            context.commit("setError", "Something went wrong with the server");
          }
        }
      } catch (e) {
        console.error("Error while removing from cart: ", e);
      }
    },
    async updateCartItem(context, updatedItem) {
      context.commit("updateCartItem", updatedItem);
    },
    async deactivate(context) {
      try {
        const res = await axios.delete(
          `${api}user/${context.state.userData.userID}`,
          {
            headers: {
              Authorization: context.state.token,
              "Content-Type": "application/json",
            },
          }
        );
        const { err, msg } = res.data;
        if (err) {
          context.commit("setError", err);
        }
        if (msg) {
          context.commit("setUser", msg);
          console.log("User deleted successfully");
        }
      } catch (e) {
        console.log("An error occured: ", e);
      }
    },
    async banUser(context, id) {
      try {
        const { res } = await axios.delete(`${api}user/${id}`, {
          headers: {
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        });
        const { msg, err } = res.data;
        if (err) {
          context.commit("setError", err);
        }
        if (msg) {
          context.dispatch("fetchUsers");
          context.commit("setUser", msg);
          console.log("User deleted successfully");
        }
      } catch (e) {
        console.log("An error occured: ", e);
      }
    },
    async deleteProduct(context, prodID) {
      try {
        const { res } = await axios.delete(`${api}product/${prodID}`, {
          headers: {
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        });
        const { msg, err } = res.data;
        if (msg) {
          context.dispatch("fetchProducts");
          context.dispatch("fetchOwnProd");
          context.commit("setProduct", msg);
        }
        if (err) {
          context.commit("setError", err);
        }
      } catch (e) {
        console.log("An error occured: ", e);
      }
    },
    async updateProduct(context, payload) {
      console.log(payload);
      try {
        const res = await axios.patch(
          `${api}product/${payload.prodID}`,
          payload,
          {
            headers: {
              Authorization: context.state.token,
              "Content-Type": "application/json",
            },
          }
        );
        const { msg, err } = res.data;
        if (err) {
          context.commit("setError", err);
        }
        if (msg) {
          context.dispatch("fetchOwnProd");
          context.dispatch("fetchProducts");
          context.commit("setProduct", msg);
          context.commit("setMsg", "Successfully updated product");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async updateUsers(context, payload) {
      try {
        const res = await axios.patch(`${api}user/${payload.userID}`, payload, {
          headers: {
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        });
        console.log(payload);
        const { msg, err } = res.data;
        if (err) {
          context.commit("setError", err);
        }
        if (msg === "User record updated successfully") {
          if(payload.userID === context.state.userData.userID){
            localStorage.setItem("userData", JSON.stringify(payload))
            context.commit("setUserData", payload)
          }
          context.dispatch("fetchUsers");
          context.commit("setUser", msg);
          context.commit("setMsg", "User profile updated successfully");
        }
      } catch (e) {}
    },
    async updateDetails(context, payload) {
      try {
        const res = await axios.patch(`${api}user/${payload.userID}`, payload, {
          headers: {
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        const { msg, err } = res.data;
        console.log(msg);
        if (err) {
          context.commit("setError", err);
        }
        if (msg) {
          console.log(payload);
          context.commit("setUserData", payload);
          context.commit("setMsg", "Successfully updated profile");
        } else {
          console.log("User data is not ready yet");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async buyTransactions(context, userID) {
      try {
        const res = await axios.get(`${api}count-buys/${userID}`);
        context.commit("setBuyTransactions", res.data.count);
      } catch (e) {
        console.error("Error counting buy transactions: ", e);
      }
    },
    async sellTransactions(context, userID) {
      try {
        const res = await axios.get(`${api}count-sells/${userID}`);
        context.commit("setSellTransactions", res.data.count);
      } catch (e) {
        console.error("Error while counting sells: ", e);
      }
    },
    async recordTransaction(context, transactionData) {
      try {
        const res = await axios.post(`${api}record`, transactionData, {
          headers: {
            Authorization: context.state.token,
            "Content-Type": "application/json",
          },
        });
        console.log("Transaction recorded successfully", res.data);
        let pointsToAward = 0;
        if (transactionData.transactionType === "buy") {
          pointsToAward = 10;
        } else if (transactionData.transactionType === "sell") {
          pointsToAward = 15;
        }

        context.commit("increasePoints", pointsToAward);
      } catch (e) {
        console.error("Error while recording transaction: ", e);
      }
    },
    async createProduct(context, payload) {
      try {
        const res = await axios.post(
          `${api}product/${context.state.userData.userID}`,
          payload,
          {
            headers: {
              Authorization: context.state.token,
              "Content-Type": "application/json",
            },
          }
        );
        const { msg, err } = await res.data;
        if (err) {
          context.commit("setError", err);
        }
        if (msg === "Product added successfully") {
          context.dispatch("fetchOwnProd");
          context.dispatch("fetchProducts");
          context.commit("setProduct", msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
});
