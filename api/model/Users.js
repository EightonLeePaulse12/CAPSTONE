const db = require("../config");
const { hash, compare, hashSync } = require("bcrypt");
const { createToken } = require("../middleware/AuthenticateUser");

class Users {
  fetchUsers(req, res) {
    const query = `
            SELECT userID, firstName, lastName, gender, email, userRole, userProfile FROM Users;
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
            msg: "Something went wrong",
          })
        );
      }
    });
  }
  fetchUser(req, res) {
    const query = `
        SELECT userID, firstName, lastName, username, gender, email, userRole, userProfile FROM Users WHERE userID = ${req.params.id}
        `;
    db.query(query, (err, result) => {
      if (!err) {
        res.json({
          status: res.statusCode,
          result,
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
  async register(req, res) {
    const data = req.body;
    data.userPass = await hash(data.userPass, 17);
    const user = {
      email: data.email,
      password: data.userPass,
    };
    const query = `
            INSERT INTO Users SET ?
        `;
    db.query(query, [req.body], (err) => {
      if (!err) {
        let token = createToken(user);
        res.json({
          status: res.statusCode,
          token,
          msg: "User registered successfully",
        });
      } else {
        res.json({
          err,
          msg: "An error occured",
        });
      }
    });
  }
  async login(req, res) {
    const { email, userPass } = req.body;
    const query = `
        SELECT firstName, lastName, gender, email, userPass, userRole, userProfile FROM Users WHERE email = ?
    `;
    db.query(query, [email], async (err, result) => {
      if (err) {
        return res.json({
          status: res.statusCode,
          msg: "An error occured",
        });
      }
      if (!result?.length) {
        return res.json({
          status: res.statusCode,
          msg: "You are providing the wrong email or password",
        });
      } else {
        const hashed = result[0].userPass;
        compare(userPass, hashed, (cErr, cRes) => {
          if (cErr) throw cErr;
          if (cRes) {
            const token = createToken({
              email,
              userPass,
            });

            return res.json({
              msg: "Logged in successfully",
              token,
            });
          } else {
            return res.json({
              status: res.statusCode,
              msg: "Invalid login details",
            });
          }
        });
      }
    });
  }
  banUser(req, res) {
    const query = `
        DELETE FROM Users WHERE userID = ${req.params.id}
    `;
    db.query(query, (err) => {
      if (!err) {
        res.json({
          status: res.statusCode,
          msg: "User banned successfully",
        });
      } else {
        res.json({
          status: res.statusCode,
          msg: "Something went wrong",
        });
        throw err;
      }
    });
  }
  editUser(req, res) {
    const query = `
        UPDATE Users SET ? WHERE userID = ${req.params.id}
    `;
    db.query(query, [req.body], (err) => {
      if (!err) {
        res.json({
          status: res.statusCode,
          msg: "User record updated successfully",
        });
      } else {
        res.json({
          status: res.statusCode,
          msg: "Something went wrong",
        });
        throw err;
      }
    });
  }
}

module.exports = { Users };
