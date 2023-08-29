const { Users } = require('./Users')
const { Products } = require('./Products')
const { Cart } = require('./Cart')
const { Transactions } = require('./Transactions')

module.exports = {
    users: new Users(),
    products: new Products(),
    cart: new Cart(),
    transactions: new Transactions()
}