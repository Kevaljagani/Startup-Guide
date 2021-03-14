const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: String },
  date: { type: String },
});

module.exports = mongoose.model("Event", eventSchema);
