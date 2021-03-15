// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const blogSchema = new Schema({
//   title: { type: String },
//   description: { type: String },
//   technology: { type: String },
//   addedby: { type: String },
//   time: { type: String },
//   date: { type: String }
// });

// module.exports = mongoose.model("Blog", blogSchema);



const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technology: { type: String, required: true },
  addedby: { type: String, required: true },
  time: { type: String },
  date: { type: String },
});

module.exports = mongoose.model("Blog", blogSchema);