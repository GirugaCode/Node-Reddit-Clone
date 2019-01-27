const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, require: true },
  url: { type: String, require: true},
  summary: { type: String, require: true}
});

module.exports = mongoose.model("Post", PostSchema);
