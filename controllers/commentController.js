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
/*
// Post a comment to a listing
exports.addComment = (req, res) => {
  const { user_id, product_id, comment_text } = req.body;
  const comment_date = new Date();

  db.query(
    `INSERT INTO comment (user_id, product_id, comment_text, comment_date)
     VALUES (?, ?, ?, ?)`,
    [user_id, product_id, comment_text, comment_date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      res.status(201).json({ message: "Comment added" });
    }
  );
};*/
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
