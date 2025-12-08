import React from 'react';

const SalesTable = ({ data }) => {
  return (
    <div className="mx-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-5">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Transaction ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Customer ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Customer Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Phone Number</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Gender</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Age</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Region</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Product Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Product ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Tags</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Payment Method</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Quantity</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Total Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">Employee Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan="15" className="px-4 py-8 text-center text-gray-500 text-sm">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={row._id || idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {row.TransactionID || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {row.Date ? new Date(row.Date).toLocaleDateString('en-CA') : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.CustomerID || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {row.CustomerName || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.PhoneNumber || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.Gender || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.Age || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.CustomerRegion || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.ProductCategory || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.ProductID || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.Tags || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.PaymentMethod || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {row.Quantity || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    ₹{row.TotalAmount?.toLocaleString('en-IN') || '0'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {row.EmployeeName || 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;