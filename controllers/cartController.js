
const db = require("../db");

// Get all cart items for a user
exports.getCart = (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT l.*, ci.quantity 
    FROM cart_item ci
    JOIN cart c ON ci.cart_id = c.cart_id
    JOIN listing l ON ci.product_id = l.product_id
    WHERE c.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(results);
  });
};
/*
// Add item to cart or increment quantity
exports.addToCart = (req, res) => {
  const { user_id, product_id } = req.body;

  // 1. Get or create cart for the user
  const findOrCreateCart = `
    INSERT INTO cart (user_id)
    SELECT ? FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM cart WHERE user_id = ?);
  `;

  const getCartId = `SELECT cart_id FROM cart WHERE user_id = ?`;

  db.query(findOrCreateCart, [user_id, user_id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    db.query(getCartId, [user_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      const cart_id = results[0].cart_id;

      // 2. Add or update item in cart_item
      const addOrUpdateCartItem = `
        INSERT INTO cart_item (cart_id, product_id, quantity)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE quantity = quantity + 1
      `;

      db.query(addOrUpdateCartItem, [cart_id, product_id], (err) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.status(201).json({ message: "Item added to cart" });
      });
    });
  });
};*/
exports.addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  const findOrCreateCart = `
    INSERT INTO cart (user_id)
    SELECT ? FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM cart WHERE user_id = ?);
  `;
  const getCartId = `SELECT cart_id FROM cart WHERE user_id = ?`;

  db.query(findOrCreateCart, [user_id, user_id], (err) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });

    db.query(getCartId, [user_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      const cart_id = results[0].cart_id;

      const addOrUpdateCartItem = `
        INSERT INTO cart_item (cart_id, product_id, quantity)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)
      `;

      db.query(addOrUpdateCartItem, [cart_id, product_id, quantity], (err) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.status(201).json({ message: "Cart updated with selected quantity" });
      });
    });
  });
};

// Remove item from cart
exports.removeFromCart = (req, res) => {
  const { user_id, product_id } = req.body;

  const getCartId = `SELECT cart_id FROM cart WHERE user_id = ?`;
  db.query(getCartId, [user_id], (err, results) => {
    if (err || results.length === 0)
      return res.status(500).json({ error: err?.sqlMessage || "Cart not found" });

    const cart_id = results[0].cart_id;
    const sql = `DELETE FROM cart_item WHERE cart_id = ? AND product_id = ?`;

    db.query(sql, [cart_id, product_id], (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      res.json({ message: "Item removed from cart" });
    });
  });
};
