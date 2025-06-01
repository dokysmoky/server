const db = require("../db");

// Get wishlist items for a user
exports.getWishlist = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT l.* FROM wishlist w
    JOIN listing l ON w.product_id = l.product_id
    WHERE w.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(results);
  });
};

exports.addToWishlist = (req, res) => {
  const { user_id, product_id } = req.body;

  const sql = `INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)`;

  db.query(sql, [user_id, product_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    // result.affectedRows === 1 => added, 0 => already existed
    if (result.affectedRows === 0) {
      res.status(200).json({ message: "Item already in wishlist", alreadyExists: true });
    } else {
      res.status(201).json({ message: "Added to wishlist", alreadyExists: false });
    }
  });
};

//  Remove item from wishlist
exports.removeFromWishlist = (req, res) => {
  const { user_id, product_id } = req.body;

  const sql = `DELETE FROM wishlist WHERE user_id = ? AND product_id = ?`;

  db.query(sql, [user_id, product_id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Removed from wishlist" });
  });
};
