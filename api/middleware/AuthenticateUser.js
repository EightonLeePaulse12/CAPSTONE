const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

function createToken(user) {
  return sign(
    {
      email: user.email,
      password: user.password,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
}

function verifyAToken(token) {
  try {
    const dec = verify(token, process.env.SECRET_KEY);
    return dec;
  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = { createToken, verifyAToken };
