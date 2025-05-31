// server/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./routes/users");
const listingRoutes = require("./routes/listings");

app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);

const PORT = process.env.PORT || 5021;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5021;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});*/
