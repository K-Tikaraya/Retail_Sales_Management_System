import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import the phone line
import Header from '../components/Header';
import FilterPanel from '../components/Filterpanel';
import SalesTable from '../components/SalesTable';
import Pagination from '../components/Pagination';
import StatsCards from '../components/StatsCards';


const Dashboard = () => {
  // 1. STATE (The Clipboard)
  const [filters, setFilters] = useState({
    search: '',
    region: '',
    gender: '',
    ageRange: '',
    category: '',
    tags: '',
    paymentMethod: '',
    dateRange: '',
    sortBy: 'date_desc'
  });

  // New State for REAL Data
  const [data, setData] = useState([]);           // Holds the current 10 rows
  const [loading, setLoading] = useState(false);  // Shows "Loading..." while fetching
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // For Pagination
  const [totalRecords, setTotalRecords] = useState(0); // "Showing 10 of 5000"

  // 2. HANDLERS (The Controls)
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Always go back to Page 1 when filtering
  };

  const handleReset = () => {
    setFilters({ 
      search: '', region: '', gender: '', ageRange: '', category: '', 
      tags: '', paymentMethod: '', dateRange: '', sortBy: 'date_desc' 
    });
    setCurrentPage(1);
  };

  // 3. THE API CALL (Connecting to the Backend)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // We create a clean params object to send to the server
        const params = {
          page: currentPage,
          limit: 10,
          ...filters // Spreads all your filters (search, region, etc.)
        };

        // The Call: "Hello Backend, give me sales matching these params"
        const response = await axios.get('http://localhost:5000/api/sales', { params });

        // The Response: Update our state with what the backend sent
        setData(response.data.sales);
        setTotalPages(response.data.pages);
        setTotalRecords(response.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: Wait 500ms after user stops typing search to avoid too many calls
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timeoutId); // Cleanup

  }, [filters, currentPage]); // Re-run this whenever filters or page changes

  return (
    <div className="flex flex-col gap-5 py-4">
      
      {/* Header */}
      <Header 
        searchValue={filters.search} 
        onSearchChange={(val) => handleFilterChange('search', val)} 
      />

      {/* Filter Panel */}
      <FilterPanel 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onReset={handleReset}
      />

      {/* Info Bar */}
      <div className="px-6 text-sm text-gray-600">
        {loading ? (
          <span className="font-bold">Loading data...</span>
        ) : (
          <span>Found <span className="font-bold text-gray-900">{totalRecords}</span> records. Showing Page {currentPage} of {totalPages}.</span>
        )}
      </div>


      <StatsCards data={data} />

      {/* Info Text */}
      <div style={{ color: '#666', fontSize: '14px' }}>
         {/* ... (keep your existing loading/count text) ... */}
      </div>


      {/* Data Table - Now receiving REAL data */}
      <SalesTable data={data} />

      {/* Pagination - Now using REAL total pages */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages}
        onPageChange={setCurrentPage} 
      />

    </div>
  );
};

export default Dashboard;