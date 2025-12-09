const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    // 1. Transaction ID
    TransactionID: { type: String, unique: true },

    // 2. Date (Index for Date Range Filter & Sorting)
    Date: { type: Date, index: true },

    // 3. Customer ID
    CustomerID: { type: String },

    // 4. Customer Name (Index for Search & Sorting A-Z)
    CustomerName: { type: String, index: true },

    // 5. Phone Number (Index for Search)
    PhoneNumber: { type: String, index: true },

    // 6. Gender (Index for Filter)
    Gender: { type: String, index: true },

    // 7. Age (Index for Range Filter)
    Age: { type: Number, index: true },

    // 8. Customer Region (Index for Filter)
    CustomerRegion: { type: String, index: true },

    // 9. Customer Type
    CustomerType: { type: String },

    // 10. Product ID
    ProductID: { type: String, index: true },

    // 11. Product Name
    ProductName: { type: String },

    // 12. Brand
    Brand: { type: String },

    // 13. Product Category (Index for Filter)
    ProductCategory: { type: String, index: true },

    // 14. Tags (Index for Tag Filter)
    Tags: { type: String, index: true },

    // 15. Quantity (Index for Sorting High-Low)
    Quantity: { type: Number, index: true },

    // 16. Price per Unit
    PricePerUnit: { type: Number },

    // 17. Discount Percentage
    DiscountPercentage: { type: Number },

    // 18. Total Amount
    TotalAmount: { type: Number },

    // 19. Final Amount
    FinalAmount: { type: Number },

    // 20. Payment Method (Index for Filter)
    PaymentMethod: { type: String, index: true },

    // 21. Order Status
    OrderStatus: { type: String },

    // 22. Delivery Type
    DeliveryType: { type: String },

    // 23. Store ID
    StoreID: { type: String },

    // 24. Store Location
    StoreLocation: { type: String },

    // 25. Salesperson ID
    SalespersonID: { type: String },

    // 26. Employee Name
    EmployeeName: { type: String },

    // --- CALCULATED FIELDS (Required for your Stats Cards) ---
    DiscountAmount: { type: Number }
});

// --- PERFORMANCE BOOSTERS (Compound Indexes) ---
// These satisfy "Sorting must preserve active search and filters"

// 1. Sort by DATE (Newest First)
SaleSchema.index({ CustomerRegion: 1, Date: -1 });
SaleSchema.index({ Gender: 1, Date: -1 });
SaleSchema.index({ ProductCategory: 1, Date: -1 });

// 2. Sort by QUANTITY (High to Low)
SaleSchema.index({ CustomerRegion: 1, Quantity: -1 });
SaleSchema.index({ ProductCategory: 1, Quantity: -1 });

// 3. Sort by CUSTOMER NAME (A-Z)
SaleSchema.index({ CustomerRegion: 1, CustomerName: 1 });
SaleSchema.index({ Gender: 1, CustomerName: 1 });

// 4. Text Search Support
SaleSchema.index({ CustomerName: 'text', PhoneNumber: 'text' });

module.exports = mongoose.model('Sale', SaleSchema);