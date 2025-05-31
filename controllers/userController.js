// server/controllers/userController.js
const db = require("../db");

exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;
  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "User registered", id: result.insertId });
    }
  );
};
