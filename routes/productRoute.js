const express = require("express");
const Product = require("../models/productModal");
const { isAuth, isAdmin } = require("../middlewares/atuh");
const router = express.Router();

router.get("/", async (req, res) => {
  const allProducts = await Product.find({});
  res.send(allProducts);
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const Products = await Product.findOne({ _id: id });
  if (Products) {
    res.send(Products);
  } else {
    res.status(404).send({ msg: "product not found" });
  }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
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

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId });
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
  }
  const updatedProduct = await product.save();
  if (updatedProduct) {
    return res
      .status(200)
      .send({ message: "Product Updated successfully", data: updatedProduct });
  } else {
    return res.status(500).send("Error in Updating product");
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findById(productId);
  if (deletedProduct) {
    deletedProduct.remove();
    res.status(200).send("product deleted successfully");
  } else {
    res.send("Error in product deletion");
  }
});

module.exports = router;
