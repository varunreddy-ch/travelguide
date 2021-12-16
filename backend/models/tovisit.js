const mongoose = require("mongoose");

const tovisitSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 200 },
  author: String,
  uid: String,
  isComplete: Boolean,
  date: { type: Date, default: new Date() },
});

const Tovisit = mongoose.model("Tovisit", tovisitSchema);

exports.Tovisit = Tovisit;
