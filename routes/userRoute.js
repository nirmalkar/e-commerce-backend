const router = require("express").Router();
const User = require("../models/userModal");
const { getToken } = require("../utils");

router.post("/signin", async (req, res) => {
  const signInUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (signInUser) {
    res.send({
      _id: signInUser.id,
      name: signInUser.name,
      email: signInUser.email,
      isAdmin: signInUser.isAdmin,
      token: await getToken(signInUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid email or password" });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
  });
  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid User Data" });
  }
});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Hemant",
      email: "hemantnir@gmail.com",
      password: "999999999",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

module.exports = router;
