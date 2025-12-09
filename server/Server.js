// backend/server.js
const express = require('express');
const cors = require('cors');

// 1. Load Environment Variables FIRST
require('dotenv').config();

// 2. Import Database Connection
// (Note: You named this file importData.js, but it's acting as a DB connection file now)
const connectDB = require('./src/importData');

const app = express();

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Connect to Database
// We call this AFTER dotenv.config() so process.env.MONGO_URI is ready
connectDB();

// 5. Routes
app.use('/api/sales', require('./src/routes/salesRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));