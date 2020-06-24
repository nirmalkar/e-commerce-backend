const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuthenticated = (req, res, next) => {
  const token = req.header.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "invalid token" });
      }
      req.user = token;
      next();
      return;
    });
  }
  return res.status(401).send({ msg: "Token not found." });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin token is not valid" });
};

module.exports = { isAuthenticated, isAdmin };
