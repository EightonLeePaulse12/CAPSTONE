const db = require("../config");

class Products {
  fetchProducts(req, res) {
    const query = `
            SELECT prodID, prodName, prodDesc, category, price, seller_id FROM Products
        `;
    db.query(query, (err, results) => {
      if (!err) {
        res.json({
          status: res.statusCode,
          results,
        });
      } else {
        res.json({
          status: res.statusCode,
          msg: "An error occured",
          err,
        });
      }
    });
  }
  fetchProduct(req, res) {
    const query = `
            SELECT prodID, prodName, prodDesc, category, price, seller_id FROM Products WHERE prodID = ${req.params.prodID}
        `;
    db.query(query, (err, results) => {
      if (!err) {
        res.json({
          status: res.statusCode,
          results,
        });
      } else {
        res.json({
          status: res.statusCode,
          msg: "An error occured",
          err,
        });
      }
    });
  }
  addProduct(req, res) {
    const query = `
            INSERT INTO Products (prodName, prodDesc, category, price, prodURL, seller_id) VALUES (?, ?, ?, ?, ?, ?);
        `;
    const { prodName, prodDesc, category, price, prodURL } = req.body;
    const seller_id = req.params.seller_id;
    const data = [prodName, prodDesc, category, price, prodURL, seller_id];
    if (!prodName || !prodDesc || !category || !price || !prodURL || !seller_id) {
      return res.status(400).json({
        status: res.statusCode,
        msg: "Missing or invalid data",
      });
    }
    db.query(query, data, (err) => {
      if (!err) {
        res.json({
          status: res.statusCode,
          msg: "Product added successfully",
        });
      } else {
        throw (
          err &&
          res.json({
            err,
            status: res.statusCode,
            msg: "Something went wrong",
          })
        );
      }
    });
  }
  removeProduct(req, res) {
    const query = `
            DELETE FROM Products WHERE prodID = ${req.params.prodID}
        `;
    db.query(query, (err) => {
      if (!err) {
        res.json({
          status: res.statusCode,
          msg: "Product deleted successfully",
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
  updateProduct(req, res) {
    const query = `
            UPDATE Products SET ? WHERE prodID = ${req.params.prodID}
        `;
    const body = req.body;
    db.query(query, [body], (err) => {
      if (!err) {
        res.json({
          status: res.statusCode,
          msg: "Product updated successfully",
        });
      } else {
        throw (
          err &&
          res.json({
            status: res.statusCode,
            msg: "An error occured while updating product",
          })
        );
      }
    });
  }
}

module.exports = { Products };
