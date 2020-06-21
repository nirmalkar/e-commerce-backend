const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

const data = require("./data");
app.use(cors({}));

const userRoute = require("./routes/userRoute");
dotenv.config();

//connect to db
mongoose.set("useCreateIndex", true);
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

// middleware
app.use(express.json());

// routing middleware
app.use("/api/users", userRoute);
app.get("/", (req, res) => res.send("hello"));
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
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
