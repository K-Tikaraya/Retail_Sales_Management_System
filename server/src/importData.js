require('dotenv').config();
const mongoose = require('mongoose');

const fs = require('fs');
const csv = require('csv-parser');
const Sale = require('./models/Sale'); // Path to your schema

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Connection Error:", err));

// HELPER: Finds keys even with hidden BOM characters
const getValue = (row, targetKey) => {
    const foundKey = Object.keys(row).find(k => 
        k.trim().replace(/^\uFEFF/, '') === targetKey
    );
    return foundKey ? row[foundKey] : undefined;
};

const importData = async () => {
    let salesBatch = [];
    let counter = 0;

    // 1. CLEAR OLD DATA (The Fix for Duplicate Error)
    console.log("🧹 Clearing existing data from MongoDB...");
    await Sale.deleteMany({});
    console.log("✅ Database cleared. Starting fresh import...");

    if (!fs.existsSync('dataset.csv')) {
        console.error("❌ ERROR: 'dataset.csv' not found.");
        process.exit(1);
    }

    console.log("⏳ Reading CSV file...");
    const stream = fs.createReadStream('dataset.csv').pipe(csv());

    for await (const row of stream) {
        // MAP DATA
        const cleanRow = {
            TransactionID: getValue(row, 'Transaction ID'),
            Date: new Date(getValue(row, 'Date')), 
            CustomerID: getValue(row, 'Customer ID'),
            CustomerName: getValue(row, 'Customer Name'),
            PhoneNumber: getValue(row, 'Phone Number'),
            Gender: getValue(row, 'Gender'),
            Age: parseInt(getValue(row, 'Age')) || 0,
            CustomerRegion: getValue(row, 'Customer Region'),
            ProductCategory: getValue(row, 'Product Category'),
            ProductID: getValue(row, 'Product ID'),
            Tags: getValue(row, 'Tags'),
            PaymentMethod: getValue(row, 'Payment Method'),
            Quantity: parseInt(getValue(row, 'Quantity')) || 0,
            TotalAmount: parseFloat(getValue(row, 'Total Amount')?.replace(/[^0-9.]/g, '') || 0),
            EmployeeName: getValue(row, 'Employee Name')
        };

        if (!cleanRow.TransactionID) continue;

        salesBatch.push(cleanRow);

        if (salesBatch.length === 1000) {
            await Sale.insertMany(salesBatch);
            salesBatch = [];
            counter += 1000;
            if (counter % 10000 === 0) console.log(`🚀 Imported ${counter} rows...`);
        }
    }

    if (salesBatch.length > 0) {
        await Sale.insertMany(salesBatch);
        counter += salesBatch.length;
    }

    console.log(`\n🎉 SUCCESS: Successfully imported ${counter} rows!`);
    process.exit();
};

importData().catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});