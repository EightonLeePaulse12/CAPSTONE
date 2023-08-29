const db = require('../config')

class Transactions{
    recordTransaction(userID, prodID, transactionType, transactionDate, res){
        const query = `
            INSERT INTO Transactions (userId, prodID, transaction_type, transaction_date) VALUES(?, ?, ?, ?)
        `
        const data = [userID, prodID, transactionType, transactionDate]
        db.query(query, data, (err)=>{
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg:"Transaction recorded successfully"
            })
        })
    }
    getAvg(userID){
        const query = `
            SELECT AVG(CASE WHEN transaction_type = 'buy' THEN quantity ELSE 0 END) AS avg_buy_quant,
            AVG(CASE WHEN transaciton_type = 'sell' THEN quantity ELSE 0 END) AS avg_sell_quant FROM Transactions WHERE userID = ?
        `
        db.query(query, [userID], (err, results)=>{
            if (!err){
                const avgBuyQuant = results[0].avg_buy_quantity || 0
                const avgSellQuant = results[0].avg_sell_quantity || 0
                res.json({
                    status: res.statusCode,
                    avgBuyQuant,
                    avgSellQuant
                })
            } else{
                res.json({
                    status: res.statusCode,
                    msg:"Something went wrong while fetching data",
                    err
                })
            }
        })
    }
}

module.exports = { Transactions }