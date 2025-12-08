// backend/server.js
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middleware (Allows Frontend to talk to Backend)
app.use(cors());
app.use(express.json());

// 2. Database Connection
mongoose.connect('mongodb://localhost:27017/truestate_assignment')
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ Connection Error:", err));

// 3. Routes (Connects the URL to your Logic)
app.use('/api/sales', require('./src/routes/salesRoutes'));

// 4. Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));