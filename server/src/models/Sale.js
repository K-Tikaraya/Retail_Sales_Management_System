const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    TransactionID: { type: String, unique: true },
    ProductID: { type: String, index: true },

// --- 1. SEARCH FIELDS (Case-Insensitive & Performant) [cite: 51-58] ---
    CustomerName: { type: String, index: true }, 
    PhoneNumber: { type: String, index: true }, 

   // --- 2. FILTER FIELDS [cite: 60-68] ---
    CustomerRegion: { type: String, index: true },
    Gender: { type: String, index: true },
    ProductCategory: { type: String, index: true },
    PaymentMethod: { type: String, index: true },
    Tags: { type: String, index: true }, 

    // Ranges
    Age: { type: Number, index: true },
    Date: { type: Date, index: true }, 

    // --- 3. SORTING FIELDS [cite: 74-77] ---
    Quantity: { type: Number, index: true },
    TotalAmount: { type: Number },

    // Other Info
    CustomerID: String,
    EmployeeName: String
});

// --- PERFORMANCE BOOSTERS (Compound Indexes) ---
// These satisfy "Sorting must preserve active search and filters" [cite: 79]

// 1. Sort by DATE (Newest First)
SaleSchema.index({ CustomerRegion: 1, Date: -1 });
SaleSchema.index({ Gender: 1, Date: -1 });
SaleSchema.index({ ProductCategory: 1, Date: -1 });

// 2. Sort by QUANTITY (High to Low)
SaleSchema.index({ CustomerRegion: 1, Quantity: -1 });
SaleSchema.index({ ProductCategory: 1, Quantity: -1 });

// 3. Sort by CUSTOMER NAME (A-Z) <-- ADDED THIS FOR YOU
// This ensures that "Region: North" + "Sort: Name A-Z" is instant
SaleSchema.index({ CustomerRegion: 1, CustomerName: 1 });
SaleSchema.index({ Gender: 1, CustomerName: 1 });

// 4. Text Search Support
SaleSchema.index({ CustomerName: 'text', PhoneNumber: 'text' });

module.exports = mongoose.model('Sale', SaleSchema);