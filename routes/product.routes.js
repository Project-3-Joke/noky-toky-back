const { JSONCookies } = require("cookie-parser");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Joke = require("../models/Joke.model");
const User = require("../models/User.model");



module.exports = router;
