const mongoose = require("mongoose");
 

const reviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true // ⚠️ This is why the error shows if not set
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing"
  }
});


module.exports = mongoose.model("Review", reviewSchema);
