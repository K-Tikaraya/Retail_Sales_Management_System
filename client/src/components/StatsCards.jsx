import React from 'react';

const StatsCards = ({ data }) => {
  // 1. Calculate Totals for the CURRENT PAGE (the 'data' array)
  const stats = data.reduce(
    (acc, row) => {
      acc.totalUnits += row.Quantity || 0;
      acc.totalAmount += row.TotalAmount || 0;
      acc.totalDiscount += row.DiscountAmount || 0; 
      return acc;
    },
    { totalUnits: 0, totalAmount: 0, totalDiscount: 0 }
  );

  // Helper for currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex gap-4 flex-wrap mb-5 px-6">
      
      {/* Card 1: Total Units */}
      <div className="flex-1 min-w-[160px] max-w-[220px] p-4 bg-white rounded-lg shadow-sm border-2 border-gray-200 hover:border-blue-300 transition-colors">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Total Units Sold
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {stats.totalUnits}
          </span>
        </div>
      </div>

      {/* Card 2: Total Amount */}
      <div className="flex-1 min-w-[160px] max-w-[220px] p-4 bg-white rounded-lg shadow-sm border-2 border-gray-200 hover:border-green-300 transition-colors">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Total Amount
          </span>
          <span className="text-2xl font-bold text-green-600">
            {formatCurrency(stats.totalAmount)}
          </span>
        </div>
      </div>

      {/* Card 3: Total Discount */}
      <div className="flex-1 min-w-[160px] max-w-[220px] p-4 bg-white rounded-lg shadow-sm border-2 border-gray-200 hover:border-red-300 transition-colors">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Total Discount
          </span>
          <span className="text-2xl font-bold text-red-500">
            {formatCurrency(stats.totalDiscount)}
          </span>
        </div>
      </div>

    </div>
  );
};

export default StatsCards;