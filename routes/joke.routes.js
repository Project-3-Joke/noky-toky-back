const { JSONCookies } = require("cookie-parser");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Joke = require("../models/Joke.model");
const User = require("../models/User.model");

router.post("/jokes/new", (req, res, next) => {
  // const { joke, user } = req.body;
  const { setup, delivery, category, user } = req.body;
  
  Joke.create({
    setup: setup,
    delivery: delivery,
    category: category,
  })
    .then((newJoke) => {
      return User.findByIdAndUpdate(
        user._id,
        {
          $push: { favorites: newJoke._id },
        },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  POST /api/jokes  -  Creates a new Joke

router.post("/jokes", (req, res, next) => {
  // const { joke, user } = req.body;
  const { joke, user } = req.body;

 

  Joke.create({
    setup: joke.setup,
    delivery: joke.delivery,
    category: joke.category,
  })
    .then((newJoke) => {
      return User.findByIdAndUpdate(
        user._id,
        {
          $push: { favorites: newJoke._id },
        },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/jokes -  Retrieves all of the jokes by user

router.get("/jokes", (req, res, next) => {
  
  const user = req;
  

  User.findById(req.query.userId)
    .populate("favorites")
    .then((user) => {
      res.json(user.favorites);
    })
    .catch((error) => res.json(error));
});

//  DELETE /api/jokes/:jokeId  - Deletes a specific joke by id

router.delete("/jokes/:id", (req, res, next) => {
  const { id } = req.params;

  Joke.findByIdAndRemove(id)
    .then(() =>
      res.json({ message: `Joke with ${id} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});


router.get("/jokes/:id", (req, res, next) => {
  const { id } = req.params;

  Joke.findById(id)
    .then(( joketoedit ) =>
      res.json(joketoedit )
    )
    .catch((error) => res.json(error));
});


router.put("/jokes/:id", (req, res, next) => {

  const { id } = req.params;

  Joke.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedjoke) => res.json(updatedjoke))
    .catch((err) => res.json(err));
});

module.exports = router;
