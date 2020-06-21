const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const getToken = (user) => {
  console.log(user);
  return jwt.sign(
    {
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

module.exports = getToken;
