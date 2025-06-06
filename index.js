// server/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
//const bodyParser = require("body-parser");
dotenv.config();

const app = express();

app.use(cors());
//app.use(express.json());

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use('/uploads', express.static('uploads'));

// Import routes
const userRoutes = require("./routes/users");
const listingRoutes = require("./routes/listings");
const commentRoutes = require("./routes/commentRoutes");
const wishlistRoutes = require("./routes/wishlist");
const cartRoutes= require("./routes/cart");
const reportRoutes = require("./routes/report");

app.use("/report", reportRoutes);
app.use("/cart", cartRoutes); 
app.use("/comments", commentRoutes);
app.use("/users", userRoutes);
app.use("/listings", listingRoutes);
app.use("/wishlist", wishlistRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to KPOP trading backend API');
  });
  