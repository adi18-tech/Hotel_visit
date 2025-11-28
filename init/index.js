// assignOwner.js
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Connected to MongoDB");
}

// Assign the same owner to all listings
async function assignSameOwnerToAllListings() {
  try {
    await main(); // 🔁 Connect first

    const ownerUser = await User.findOne({ username: "Aditya kumar" }); // Change if needed

    if (!ownerUser) {
      console.log("❌ Owner user not found.");
      return;
    }

    await Listing.updateMany({}, { owner: ownerUser._id });
    console.log("✅ All listings assigned to:", ownerUser.username);
  } catch (err) {
    console.error("❌ Error assigning owners:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed.");
  }
}

assignSameOwnerToAllListings();
