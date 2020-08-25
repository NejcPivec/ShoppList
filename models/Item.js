const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  item1: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    default: "/"
  },
  type: {
    type: String,
    default: "Ordinary"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("item", ItemSchema);
