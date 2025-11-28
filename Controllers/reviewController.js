const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../Util/wrapAsync.js");

module.exports.createReview = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { content, rating } = req.body.review;

  // 1️⃣ Create a new review
  const review = new Review({
    content,
    rating,
    author: req.user._id, // from logged-in user
    listing: id           // optional, if schema supports listing ref
  });

  // 2️⃣ Save the review
  await review.save();

  // 3️⃣ Find the listing and push the review reference
  const listing = await Listing.findById(id);
  listing.reviews.push(review);

  // 4️⃣ Save updated listing
  await listing.save();

  req.flash("success", "Review added successfully!");
  res.redirect(`/listings/${id}`);
});

module.exports.deleteReview = wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;

  // 1️⃣ Delete the review
  await Review.findByIdAndDelete(reviewId);

  // 2️⃣ Remove review reference from the listing
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
});
