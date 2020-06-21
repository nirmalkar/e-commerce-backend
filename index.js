const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({}));
const data = require("./data");

app.get("/api/products", (req, res) => res.send(data));
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(400).send({ msg: "product not found" });
  }
});

app.listen(4000, () => {
  console.log("app is running");
});
