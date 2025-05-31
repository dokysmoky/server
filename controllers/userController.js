// server/controllers/userController.js
const db = require("../db");

exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;
  db.query(
    "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "User registered", id: result.insertId });
    }
  );
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM user WHERE email = ? AND password = ?", [email, password], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });
  
      const { password, ...userWithoutPassword } = results[0];
      res.status(200).json({ message: "Login successful", user: userWithoutPassword });
    });
  };
  