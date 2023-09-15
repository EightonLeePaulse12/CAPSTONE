const db = require("../config");

class Cart {
  fetchCartItems(userID, res) {
    const query = `
            SELECT cartID, userID, productID FROM Cart WHERE userID = ?
        `;
    db.query(query, [userID], (err, results) => {
      if (!err) {
        res.json({
          status: res.statusCode,
          results,
        });
      } else {
        throw (
          err &&
          res.json({
            status: res.statusCode,
            err,
            msg: "An error occured",
          })
        );
      }
    });
  }
  addToCart({ userID, productID }, res) {
    try {
      const query = `
            INSERT INTO Cart (userID, productID) VALUES(?,?)
        `;
      const data = [userID, productID];
      db.query(query, data, (err) => {
        if (!err) {
          res.json({
            status: res.statusCode,
            msg: "Product added to cart successfully",
          });
        } else {
          throw (
            err &&
            res.json({
              status: res.statusCode,
              msg: "Something went wrong",
              err,
            })
          );
        }
      });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ status: res.statusCode, msg: "Internal server error", err: e });
    }
  }
  removeFromCart(userID, productID, res) {
    const query = `
            DELETE FROM Cart WHERE userID = ? AND productID = ?
        `;
    const data = [userID, productID];
    db.query(query, data, (err) => {
      if (!err) {
        res.json({
          status: res.statusCode,
          msg: "Product removed from cart",
        });
      } else {
        throw (
          err &&
          res.json({
            status: res.statusCode,
            msg: "Something went wrong",
          })
        );
      }
    });
  }
}

module.exports = { Cart };
