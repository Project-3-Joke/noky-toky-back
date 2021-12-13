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
  console.log("user from NEW ", user);
  console.log(req.body);

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

  console.log("user from like", user);

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
  console.log(" body from get", req.params);
  console.log("User id", req.query.userId);
  const user = req;
  // console.log("body from front end", user);

  // NEEDS TO FIND A WAY TO SORT BY USERID BUT DOES NOT WORK

const Data = new Promise((resolve, reject) => {
    User.findById(req.query.userId)
      .then((User) => {
        const favorites = new Promise((resolve, reject) => {
          Joke.find({
            _id: {
              $in: User.favorites,
            },
          }).then((res) => resolve(res));
        });
        console.log(2);
        console.log(favorites);
        favorites.then((response) => resolve(response));
      })  
      .catch((err) => res.json(err));
  });
  Data.then((res2) => res.json(res2));


// User.findById(req.query.userId).populate("favorites")
// .then( user => {
// res.json(user.favorites)
// }) 


});


//  DELETE /api/jokes/:jokeId  - Deletes a specific joke by id


router.delete("/jokes/:id", (req, res, next) => {
  

  const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(jokeId)) {
  //   res.status(400).json({ message: "Specified id is not valid" });
  //   return;
  console.log("joke from delete", id)
 // console.log( "req", req.query.userId)

//  console.log( User.findOneAndDelete( {favorites: [jokeId] } )   )


  Joke.findByIdAndRemove(id)
    .then(() =>
    
    res.json({ message: `Joke with ${id} is removed successfully.` })

      )
    .catch((error) => res.json(error));
});



module.exports = router;
