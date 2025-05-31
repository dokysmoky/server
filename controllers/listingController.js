// server/controllers/listingController.js
const db = require("../db");

// Get all listings
exports.getAllListings = (req, res) => {
  db.query("SELECT * FROM listing", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Create a new listing
exports.createListing = (req, res) => {
  const { listing_name, description, condition, price, user_id, photo } = req.body;

  const sql = `INSERT INTO listing 
    (listing_name, description, \`condition\`, price, user_id, photo) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [listing_name, description, condition, price, user_id, photo], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Listing created", id: result.insertId });
  });
};
