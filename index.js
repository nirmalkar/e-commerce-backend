const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

const data = require("./data");
app.use(cors({}));

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
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
app.use("/api/products", productRoute);
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
