const db = require("../db");

// Get all comments for a listing
exports.getCommentsByProduct = (req, res) => {
  const productId = req.params.productId;

  db.query(
    `SELECT comment.*, user.username FROM comment 
     JOIN user ON comment.user_id = user.user_id 
     WHERE comment.product_id = ? 
     ORDER BY comment.comment_date DESC`,
    [productId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json(results);
    }
  );
};

exports.addComment = (req, res) => {
  const { user_id, product_id, comment_text } = req.body;
  const comment_date = new Date();

  console.log("Received comment data:", {
    user_id,
    product_id,
    comment_text,
    comment_date,
  });

  if (!user_id || !product_id || !comment_text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.query(
    `INSERT INTO comment (user_id, product_id, comment_text, comment_date)
     VALUES (?, ?, ?, ?)`,
    [user_id, product_id, comment_text, comment_date],
    (err, result) => {
      if (err) {
        console.error("SQL error:", err);  
        return res.status(500).json({ error: err.sqlMessage });
      }

      res.status(201).json({ message: "Comment added" });
    }
  );
};
// Delete a comment
/*exports.deleteComment = (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.body.user_id; // Ensure the user ID is passed in body or from authentication

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Verify the comment belongs to the user before deleting
  db.query(
    `DELETE FROM comment WHERE comment_id = ? AND user_id = ?`,
    [commentId, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (result.affectedRows === 0) {
        return res.status(403).json({ error: "Unauthorized or comment not found" });
      }

      res.json({ message: "Comment deleted" });
    }
  );
};*/

// commentController.js
exports.deleteComment = (req, res) => {
  const commentId = req.params.commentId;
  const { user_id } = req.body;

  if (!user_id || !commentId) {
    return res.status(400).json({ error: "Missing user_id or commentId" });
  }

  const sql = `
    DELETE FROM comment 
    WHERE comment_id = ? AND user_id = ?
  `;

  db.query(sql, [commentId, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: "Unauthorized or comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  });
};
