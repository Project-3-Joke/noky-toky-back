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
    const { type, img, joke, user, size, color  } = req.body;
    console.log("user from Product  ", user);
    console.log(req.body);
  
    Product.create({
      type: type,
      img: img,
      size: size,
      color: color,
    //joke: $push: {joke._id}
    })
    .then((newProduct) => {
        return User.findByIdAndUpdate(
          user._id,
          {
            $push: { product: newProduct._id },
          },
          { new: true }
        ) 
        && 
        Product.findByIdAndUpdate(
            newProduct._id,
            {
                $push: { joke: joke._id },
            },
            { new: true}
        )
    })
    .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });
  




module.exports = router;
