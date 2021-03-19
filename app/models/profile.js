const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  bintro: { type: String },
  dintro: { type: String },
  city: { type: String },
  state: { type: String },
  areaofexpertise: { type: String },
  contact: { type: String },
  email: { type: String },
  experience: { type: String },
  education: { type: String }
});

module.exports = mongoose.model("Profile", profileSchema);
