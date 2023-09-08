const express = require("express");
const bodyParser = require("body-parser");
const { decToken } = require("../middleware/AuthenticateUser");
const routes = express.Router();
const { users, products, cart, transactions } = require("../model");

if (require.cache[require.resolve("../model/UserDB.js")]) {
  delete require.cache[require.resolve("../model/UserDB.js")];
}
const { getUserIDByEmail } = require('../model/UserDB')

// ========== User routes ==========
routes.get("/users", (req, res) => {
  users.fetchUsers(req, res);
});
routes.get("/user/:id", (req, res) => {
  users.fetchUser(req, res);
});
routes.post("/register", bodyParser.json(), (req, res) => {
  users.register(req, res);
});
routes.post("/login", bodyParser.json(), (req, res) => {
  users.login(req, res);
});
routes.patch("/user/:id", bodyParser.json(), (req, res) => {
  users.editUser(req, res);
});
routes.delete("/user/:id", (req, res) => {
  users.banUser(req, res);
});

// ========== Product Routes ==========
routes.use("/products", decToken);
routes.use("/product/:prodID", decToken);
routes.use("/product/:seller_id", decToken);

routes.get("/products", (req, res) => {
  products.fetchProducts(req, res);
});
routes.get("/product/:prodID", (req, res) => {
  products.fetchProduct(req, res);
});
routes.post("/product/:seller_id", bodyParser.json(), (req, res) => {
  products.addProduct(req, res);
});
routes.patch("/product/:prodID", bodyParser.json(), (req, res) => {
  products.updateProduct(req, res);
});
routes.delete("/product/:prodID", (req, res) => {
  products.removeProduct(req, res);
});

// ========== Cart Routes ==========
routes.use("/cart", decToken);

routes.get("/cart", (req, res) => {
  const user = req.dec.user;
  cart.fetchCartItems(user.userID, res);
});
routes.post("/cart", bodyParser.json(), async (req, res) => {
  console.log("POST /cart request received");
  console.log(req.dec)
  const userEmail = req.dec.email;

  getUserIDByEmail(userEmail).then((userID)=> {
    const { productID } = req.body
    cart.addToCart({userID, productID}, res)
  }).catch((error)=>{
    console.error("Error getting userID: ", error)
    return res.status(500).json({msg: "Internal server error"})
  })
});
routes.delete("/cart/:productID", (req, res) => {
  const userEmail = req.dec.email;
  getUserIDByEmail(userEmail).then((userID)=> {
    const { productID } = req.params
    cart.removeFromCart(userID, productID, res);
  }).catch((error)=>{
    console.error("Error getting userID: ", error)
    return res.status(500).json({msg: "Internal server error"})
  })
});


// ========== Transactions Routes ==========
routes.use("/record", decToken);
routes.use("/avg-quant/:userID", decToken);

routes.post("/record", bodyParser.json(), (req, res) => {
  const { userID, prodID, transactionType, transactionDate } = req.body;
  transactions.recordTransaction(
    userID,
    prodID,
    transactionType,
    transactionDate,
    res
  );
});
routes.get("/avg-quant/:userID", (req, res) => {
  const { userID } = req.params;
  transactions.getAvg(userID, res);
});

module.exports = { express, routes };
