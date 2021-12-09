const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Joke" }],
  product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = model("User", userSchema);
