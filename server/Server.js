// backend/server.js
const express = require('express');
const cors = require('cors');

// 1. Load Environment Variables FIRST
require('dotenv').config();

// 2. Import Database Connection
// CHANGE THIS: Use the clean 'db.js' file instead of 'importData.js'
const connectDB = require('./src/db'); 

const app = express();

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Connect to Database
// (This now uses the code inside src/db.js)
connectDB();

// 5. Routes
app.use('/api/sales', require('./src/routes/salesRoutes'));

// 6. Add Tag Route (Ensure this line exists if you want the dropdown to work!)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

