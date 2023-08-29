const express = require('express')
const bodyParser = require('body-parser')
const { verifyAToken } = require('../middleware/AuthenticateUser')
const routes = express.Router()
const { users, products, cart, transactions } = require('../model')

// ========== User routes ==========
routes.get('/users', (req, res)=>{
    users.fetchUsers(req, res)
})
routes.get('/user/:id', (req, res)=>{
    users.fetchUser(req, res)
})
routes.post('/register', bodyParser.json(), (req, res)=>{
    users.register(req, res)
})
routes.post('/login', bodyParser.json(), (req, res)=>{
    users.login(req, res)
})
routes.patch('/user/:id', bodyParser.json(), (req, res)=>{
    users.editUser(req, res)
})
routes.delete('/user/:id', (req, res)=>{
    users.banUser(req, res)
})

// ========== Product Routes ==========
routes.get('/products', (req, res)=>{
    products.fetchProducts(req, res)
})
routes.get('/product/:prodID', (req, res)=>{
    products.fetchProduct(req, res)
})
routes.post('/product', bodyParser.json(), (req, res)=>{
    products.addProduct(req, res)
})
routes.patch('/product/:prodID', bodyParser.json(), (req, res)=>{
    products.updateProduct(req, res)
})
routes.delete('/product/prodID', (req, res)=>{
    products.removeProduct(req, res)
})

// ========== Cart Routes ==========
routes.get('/cart', (req, res)=>{
    cart.fetchCartItems(req, res)
})
routes.post('/cart', bodyParser.json(), (req, res)=>{
    cart.addToCart(req, res)
})
routes.delete('/cart/:userID/:productID', (req, res)=>{
    const { userID, productID } = req.params
    cart.removeFromCart(userID, productID, res)
})

// ========== Transactions Routes ==========
routes.post('/record', bodyParser.json(), (req, res)=>{
    const { userID, prodID, transactionType, transactionDate } = req.body
    transactions.recordTransaction(userID, prodID, transactionType, transactionDate, res)
})
routes.get('/avg-quant/:userID', (req, res)=>{
    const {userID} = req.params
    transactions.getAvg(userID, res) 
})

// ========== Setting user payload through token authorization ==========
exports.profile = (req, res, next) =>{
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({
            msg: "Access denied. Token not provided"
        })
    }
    const dec = verifyAToken(token)
    if(!dec){
        return res.status(403).json({
            msg: "Invalid token"
        })
    }
    res.json({
        msg: "User profile successfully received", user: dec
    })
}

module.exports = { express, routes }