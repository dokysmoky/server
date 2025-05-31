// server/controllers/listingController.js
const db = require("../db");

exports.getAllListings = (req, res) => {
  db.query("SELECT * FROM listings", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createListing = (req, res) => {
  const { title, description, price, seller_id } = req.body;
  db.query(
    "INSERT INTO listings (title, description, price, seller_id) VALUES (?, ?, ?, ?)",
    [title, description, price, seller_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Listing created", id: result.insertId });
    }
  );
};
