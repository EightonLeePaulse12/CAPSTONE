const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

function createToken(user) {
  return sign(
    {
      email: user.email,
      password: user.userPass,
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

const decToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      msg: "Access denied. Token not provided",
    });
  }
  const dec = verifyAToken(token);
  if (!dec) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
  req.dec = dec;
  next();
};

module.exports = { createToken, decToken };
