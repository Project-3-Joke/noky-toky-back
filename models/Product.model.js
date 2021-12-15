const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  type: { type: String },
  img: { type: String },
  joke: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  size: { type: String },
});

module.exports = model("Product", productSchema);
