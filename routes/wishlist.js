const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.get("/:userId", wishlistController.getWishlist);
router.post("/", wishlistController.addToWishlist);
router.delete("/", wishlistController.removeFromWishlist);

module.exports = router;
