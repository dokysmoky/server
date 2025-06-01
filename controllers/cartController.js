const db = require("../db");

// Get all cart items
exports.getCart = (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT l.*, c.quantity FROM cart c
    JOIN listing l ON c.product_id = l.product_id
    WHERE c.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(results);
  });
};

// Add item to cart or increment quantity
exports.addToCart = (req, res) => {
  const { user_id, product_id } = req.body;
  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE quantity = quantity + 1
  `;
  db.query(sql, [user_id, product_id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.status(201).json({ message: "Item added to cart" });
  });
};

// Remove item from cart
exports.removeFromCart = (req, res) => {
  const { user_id, product_id } = req.body;
  const sql = `DELETE FROM cart WHERE user_id = ? AND product_id = ?`;
  db.query(sql, [user_id, product_id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({ message: "Item removed from cart" });
  });
};
