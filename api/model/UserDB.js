const db = require('../config')

function getUserIDByEmail(email){
    return new Promise((resolve, reject)=>{
      const query = `
        SELECT userID FROM Users WHERE email = ?
      `
      db.query(query, [email], (err, results)=>{
        if(err){
          reject(err)
        } else if(results.length === 0){
          reject(new Error("User unavailable"))
        } else{
            console.log(results[0].userID)
          resolve(results[0].userID)
        }
      })
    })
  }

  module.exports = { getUserIDByEmail }