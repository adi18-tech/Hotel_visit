const express = require("express");
const router = express.Router({ mergeParams: true });  
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware.js");
const reviewController = require("../Controllers/reviewController.js");

 
router.post("/", isLoggedIn, validateReview, reviewController.createReview);

 
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;
