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
const commentRoutes = require("./routes/commentRoutes");

app.use("/comments", commentRoutes);
app.use("/users", userRoutes);
app.use("/listings", listingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to KPOP trading backend API');
  });
  