const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let quoteSchema = new Schema({
  //id
  id: Number,
  //title
  title: String,
  //text
  text: String,
  //from which movie/series
  origin: String,
  //author
  author: String,
  //date added
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("quotes", quoteSchema);
