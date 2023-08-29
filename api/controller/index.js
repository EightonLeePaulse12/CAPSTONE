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