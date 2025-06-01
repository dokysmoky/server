/*// server/routes/listings.js
const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");

router.get("/", listingController.getAllListings);
router.post("/", listingController.createListing);

module.exports = router;*/
// server/routes/listings.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const listingController = require("../controllers/listingController");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.get("/", listingController.getAllListings);
router.post("/", upload.single("photo"), listingController.createListing);

module.exports = router;
