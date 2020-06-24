const express = require("express");
const Product = require("../models/productModal");
const { getToken } = require("../utils/index");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await product.find({});
  res.send(products);
});

router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReview: req.body.numReview,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New product created", data: newProduct });
  } else {
    return res.status(500).send("Error in creating product");
  }
});

module.exports = router;
