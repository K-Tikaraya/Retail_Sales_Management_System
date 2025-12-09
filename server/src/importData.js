require('dotenv').config(); // Load environment variables
const fs = require('fs');
const csv = require('csv-parser');
const Sale = require('./models/Sale'); // Path to your Sale Schema
const connectDB = require('./db');     // <--- USE SHARED CONNECTION

// 1. Connect to Database using the shared file
connectDB();

// Helper to clean BOM characters and whitespace from headers
const getValue = (row, targetKey) => {
    // Finds 'Transaction ID' even if CSV has hidden characters like 'ï»¿Transaction ID'
    const foundKey = Object.keys(row).find(k => k.trim().replace(/^\uFEFF/, '') === targetKey);
    return foundKey ? row[foundKey] : undefined;
};

const importData = async () => {
    console.log("Wiping old database...");
    await Sale.deleteMany({});
    console.log("Database cleared. Starting fresh import...");

    let salesBatch = [];
    let counter = 0;
    
    // Check if file exists
    if (!fs.existsSync('dataset.csv')) {
        console.error(" 'dataset.csv' not found! Make sure it is in the 'backend' folder.");
        process.exit(1);
    }

    const stream = fs.createReadStream('dataset.csv').pipe(csv());

    console.log("Reading CSV and mapping columns...");

    for await (const row of stream) {
        // Safe Number Parsing
        const total = parseFloat(getValue(row, 'Total Amount')?.replace(/[^0-9.]/g, '') || 0);
        const final = parseFloat(getValue(row, 'Final Amount')?.replace(/[^0-9.]/g, '') || 0);
        
        // CALCULATE DISCOUNT (Total - Final)
        const discountCalc = (total - final);

        const cleanRow = {
            // --- 1. Basic Info ---
            TransactionID: getValue(row, 'Transaction ID'),
            Date: new Date(getValue(row, 'Date')),
            CustomerID: getValue(row, 'Customer ID'),
            CustomerName: getValue(row, 'Customer Name'),
            PhoneNumber: getValue(row, 'Phone Number'),
            
            // --- 2. Demographics ---
            Gender: getValue(row, 'Gender'),
            Age: parseInt(getValue(row, 'Age')) || 0,
            CustomerRegion: getValue(row, 'Customer Region'),
            CustomerType: getValue(row, 'Customer Type'), // New Column

            // --- 3. Product Info ---
            ProductID: getValue(row, 'Product ID'),
            ProductName: getValue(row, 'Product Name'),     // New Column
            Brand: getValue(row, 'Brand'),                  // New Column
            ProductCategory: getValue(row, 'Product Category'),
            Tags: getValue(row, 'Tags'),

            // --- 4. Financials ---
            Quantity: parseInt(getValue(row, 'Quantity')) || 0,
            PricePerUnit: parseFloat(getValue(row, 'Price per Unit')) || 0, // New Column
            DiscountPercentage: parseFloat(getValue(row, 'Discount Percentage')) || 0, // New Column
            TotalAmount: total,
            FinalAmount: final, // New Column
            
            // --- 5. Payment & Status ---
            PaymentMethod: getValue(row, 'Payment Method'),
            OrderStatus: getValue(row, 'Order Status'),     // New Column
            DeliveryType: getValue(row, 'Delivery Type'),   // New Column

            // --- 6. Store & Employee ---
            StoreID: getValue(row, 'Store ID'),             // New Column
            StoreLocation: getValue(row, 'Store Location'), // New Column
            SalespersonID: getValue(row, 'Salesperson ID'), // New Column
            EmployeeName: getValue(row, 'Employee Name'),

            // --- 7. Calculated Field ---
            DiscountAmount: discountCalc > 0 ? discountCalc : 0
        };

        // Only add valid rows
        if (cleanRow.TransactionID) {
            salesBatch.push(cleanRow);
        }

        // Batch Insert (Optimization)
        if (salesBatch.length === 1000) {
            await Sale.insertMany(salesBatch);
            salesBatch = [];
            counter += 1000;
            console.log(`Imported ${counter} rows...`);
        }
    }

    // Insert remaining rows
    if (salesBatch.length > 0) {
        await Sale.insertMany(salesBatch);
    }

    console.log("SUCCESS: All data imported with new columns and calculations!");
    process.exit();
};

importData();