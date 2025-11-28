const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressErrors = require("./Util/ExpressErrors"); // make sure path is correct
const { listingSchema } = require("./schemas"); // your Joi schema
const { reviewSchema } = require("./schemas"); // include review schema if used

// ------------------- Middlewares -------------------

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  req.flash("error", "You must be logged in to do that.");
  return res.redirect("/login");
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session && req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressErrors(400, msg);
  } else {
    next();
  }
};

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "⛔ You don't have permission to do that.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// If you're also validating reviews with Joi, you can add this:
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressErrors(400, msg);
  } else {
    next();
  }
};

// ------------------- Export All -------------------

module.exports = {
  isLoggedIn,
  saveRedirectUrl,
  validateListing,
  isOwner,
  isReviewAuthor,
  validateReview // optional if used
};
