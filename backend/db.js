require('dotenv').config();
const mongoose = require('mongoose');

// console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Export the database connection
module.exports = db;
