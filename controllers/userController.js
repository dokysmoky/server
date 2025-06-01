// server/controllers/userController.js

const db = require("../db");

// Get all users
exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json(results);
  });
};

// Register a new user
exports.registerUser = (req, res) => {
  const { name, surname, username, email, password, bio, age } = req.body;

  db.query(
    `INSERT INTO user (name, surname, username, email, password, bio, age, role, is_admin)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'user', FALSE)`,
    [name, surname, username, email, password, bio, age],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      // Fetch the newly created user by user_id
      db.query("SELECT * FROM user WHERE user_id = ?", [result.insertId], (err2, results) => {
        if (err2) return res.status(500).json({ error: err2.sqlMessage });

        const { password, ...userWithoutPassword } = results[0]; // Remove password before sending to frontend
        res.status(201).json({ message: "User registered", user: userWithoutPassword });
      });
    }
  );
};

// Login user
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query(
    `SELECT * FROM user WHERE email = ? AND password = ?`,
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });

      if (results.length === 0)
        return res.status(401).json({ error: "Invalid email or password" });

      const { password, ...userWithoutPassword } = results[0]; // Don't send back password
      res.status(200).json({ message: "Login successful", user: userWithoutPassword });
    }
  );
};
