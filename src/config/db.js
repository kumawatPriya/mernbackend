// database connection
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE)
  .then(() => console.log(`MongoDB connected ${process.env.DATABASE}`))
  .catch((err) => console.error("MongoDB connection error:", err));