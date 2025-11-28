const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../Controllers/listingController.js");
const { upload } = require("../cloudinary.js");

// Index & New
router.get("/", listingController.indexRouter);
router.get("/new", isLoggedIn, listingController.newRouter);

// Show
router.get("/:id", listingController.showRouter);

// Create
router.post(
  "/",
  isLoggedIn,
  validateListing,
  upload.single("listing[image]"),
  listingController.createRouter
);

// Edit Form
router.get("/:id/edit", isLoggedIn, isOwner, listingController.editRouter);

// Update
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  upload.single("listing[image]"),
  listingController.updateRouter
);

// Delete
router.delete("/:id", isLoggedIn, isOwner, listingController.deleteRouter);

module.exports = router;
