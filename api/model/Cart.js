const db = require("../config");

class Cart {
  fetchCartItems(req, res) {
    const query = `
            SELECT cartID, userID, productID, quantity FROM Cart
        `;
    db.query(query, (err, results) => {
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
  addToCart({ userID, productID, quantity, total_price }, res) {
    console.log("Adding to cart...", userID, productID, quantity, total_price)
    try {
      const query = `
            INSERT INTO Cart (userID, productID, quantity, total_price) VALUES(?, ?, ?, ?)
        `;
      const data = [userID, productID, quantity, total_price];
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
              err
            })
          );
        }
      });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ status: res.statusCode, msg: "Internal server error" });
    }
  }
  removeFromCart(req, res) {
    const user = req.dec.user
    const productID = req.params.productID
    const query = `
            DELETE FROM Cart WHERE userID = ? AND productID = ?
        `;
    const data = [user.userID, productID];
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
