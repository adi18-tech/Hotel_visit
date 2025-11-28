const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../Controllers/userController.js");


router.get("/register", userController.renderRegister);
router.post("/register", userController.registerUser);
router.get("/login", userController.renderLogin);
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginUser
);
router.get("/logout", userController.logoutUser);

module.exports = router;
