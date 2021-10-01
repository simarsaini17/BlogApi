const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    description: String
})

module.exports = mongoose.model("Blog", blogSchema);