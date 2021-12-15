const { JSONCookies } = require("cookie-parser");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Joke = require("../models/Joke.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");

router.post("/products/new", (req, res, next) => {
  // const { joke, user } = req.body;
  const { type, img, description, user, size } = req.body;
  console.log("user from Product  ", user);
  console.log(req.body);

  Product.create({
    type: type,
    img: img,
    size: size,
    joke: description
  })
    .then((newProduct) => {
      return User.findByIdAndUpdate(
        user._id,
        {
          $push: { product: newProduct._id },
        },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/products -  Retrieves all of the jokes by user

router.get("/products", (req, res, next) => {
  console.log(" body from get", req.params);
  console.log("User id", req.query.userId);
  const user = req;

  User.findById(req.query.userId)
    .populate("product")
    .then((user) => {
      console.log("hi", user);
      res.json(user.product);
    })
    .catch((error) => res.json(error));
});

module.exports = router;
