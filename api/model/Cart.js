const db = require('../config')

class Cart{
    fetchCartItems(req, res){
        const query = `
            SELECT cartID, userID, productID, quantity FROM Cart
        `
        db.query(query, (err, results)=>{
            if (!err){
                res.json({
                    status: res.statusCode,
                    results
                })
            } else{
                throw err && res.json({
                    status: res.statusCode,
                    err,
                    msg:"An error occured"
                })
            }
        })
    }
    addToCart({userID, productID, quantity, total_price}, res){
        const query = `
            INSERT INTO Cart (userID, productID, quantity, total_price) VALUES(?, ?, ?, ?)
        `
        const data = [userID, productID, quantity, total_price]
        db.query(query, data, (err)=>{
            if (!err){
                res.json({
                    status: res.statusCode,
                    msg:"Product added to cart successfully"
                })
            } else{
                throw err && res.json({
                    status: res.statusCode,
                    msg:"Something went wrong"
                })
            }
        })
    }
    removeFromCart(req, res){
        const query = `
            DELETE FROM Cart WHERE userID = ? AND productID = ?
        `
        const data = [userID, productID]
        db.query(query, data, (err)=>{
            if (!err){
                res.json({
                    status: res.statusCode,
                    msg:"Product removed from cart"
                })
            } else{
                throw err && res.json({
                    status: res.statusCode,
                    msg:"Something went wrong"
                })
            }
        })
    }
}

module.exports = { Cart }