//listingController.js
const db = require("../db");

// Get all listings
exports.getAllListings = (req, res) => {
  db.query("SELECT * FROM listing", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
/*exports.createListing = (req, res) => {
    const { listing_name, description, condition, price, user_id, photo } = req.body;
  
    if (!listing_name || !description || !condition || !price || !user_id) {
      return res.status(400).json({ error: "Missing required fields." });
    }
  
    const sql = `
      INSERT INTO listing 
      (listing_name, description, \`condition\`, price, user_id, photo) 
      VALUES (?, ?, ?, ?, ?, ?)`;
  
    db.query(sql, [listing_name, description, condition, price, user_id, photo], (err, result) => {
      if (err) {
        console.error("DB error during insert:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      res.status(201).json({ message: "Listing created", id: result.insertId });
    });
  };*/
  
exports.createListing = (req, res) => {
  const { listing_name, description, condition, price, user_id } = req.body;
  const photo = req.file ? req.file.filename : null;

  if (!listing_name || !description || !condition || !price || !user_id) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const sql = `
    INSERT INTO listing 
    (listing_name, description, \`condition\`, price, user_id, photo) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [listing_name, description, condition, price, user_id, photo], (err, result) => {
    if (err) {
      console.error("DB error during insert:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({ message: "Listing created", id: result.insertId });
  });
};
