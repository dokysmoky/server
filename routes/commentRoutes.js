const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.get("/:productId", commentController.getCommentsByProduct);
router.post("/", commentController.addComment);
router.delete("/:commentId", commentController.deleteComment);

module.exports = router;
