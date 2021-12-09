const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  type: [{ type: String, required: true }],
  img: { type: String },
  joke: [{ type: Schema.Types.ObjectId, ref: "Joke" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  size: { type: String },
  color: { type: String },
});

module.exports = model("Product", productSchema);
