const express = require('express');
const app = express();
const db = require('./db'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

require('dotenv').config();
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images
const port = process.env.PORT || 8080;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require("./routes/reviewRoutes");

app.use('/user', userRoutes);
app.use('/auth', authRoutes );
app.use('/product', productRoutes);
app.use("/review", reviewRoutes);

// Static files
app.use(express.static(path.join(__dirname, "frontend")));

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Clothing');
});

// Start server
app.listen(port, () => { 
    console.log(`Server is running on http://127.0.0.1:${port}`);
});