// server/routes/listings.js
const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");

router.get("/", listingController.getAllListings);
router.post("/", listingController.createListing);

module.exports = router;
