const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const jokeSchema = new Schema({
  setup: { type: String, required: true },
  delivery: { type: String },
  category: { type: String },
});

module.exports = model("Joke", jokeSchema);
