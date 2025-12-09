import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  const [tagsList, setTagsList] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sales/tags');
        setTagsList(res.data);
      } catch (err) {
        console.error("Failed to load tags:", err);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (filterKey) => {
    setOpenDropdown(openDropdown === filterKey ? null : filterKey);
  };

  const renderMultiSelect = (label, filterKey, options) => {
    const currentSelection = filters[filterKey] ? filters[filterKey].split(',') : [];
    const isOpen = openDropdown === filterKey;

    const toggleItem = (item) => {
      let newSelection;
      if (currentSelection.includes(item)) {
        newSelection = currentSelection.filter(i => i !== item);
      } else {
        newSelection = [...currentSelection, item];
      }
      onFilterChange(filterKey, newSelection.join(','));
      // Don't auto-close - let user select multiple items
    };

    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(filterKey)}
          className="flex items-center justify-between min-w-[140px] px-3 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="text-gray-700 truncate">
            {label} {currentSelection.length > 0 && `(${currentSelection.length})`}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 ml-2 text-gray-500 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-2 text-gray-500 flex-shrink-0" />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-[100] max-h-64 overflow-y-auto">
            <div className="p-2">
              {options.length === 0 ? (
                <div className="px-2 py-2 text-sm text-gray-500">No options available</div>
              ) : (
                <>
                  {options.map(option => (
                    <label 
                      key={option} 
                      className="flex items-center px-2 py-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input 
                        type="checkbox" 
                        checked={currentSelection.includes(option)}
                        onChange={() => toggleItem(option)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{option}</span>
                    </label>
                  ))}
                  {/* Close button at bottom */}
                  <button
                    onClick={() => setOpenDropdown(null)}
                    className="w-full mt-2 px-2 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700 font-medium"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSingleSelect = (label, filterKey, options) => (
    <div className="flex flex-col">
      <select 
        value={filters[filterKey]} 
        onChange={(e) => onFilterChange(filterKey, e.target.value)}
        className="min-w-[140px] px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{label}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mx-6" ref={dropdownRef}>
      {/* Header with Filters title and Reset button side by side */}
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-base font-semibold text-gray-900">Filters</h2>
        <button 
          onClick={() => {
            onReset();
            setOpenDropdown(null);
          }}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md font-medium transition-colors"
        >
          Reset Filters
        </button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {renderMultiSelect("Region", "region", ["North", "South", "East", "West", "Central"])}
        {renderMultiSelect("Gender", "gender", ["Male", "Female"])}
        {renderSingleSelect("Age Range", "ageRange", [
          { value: "0-18", label: "Under 18" },
          { value: "19-30", label: "19 - 30" },
          { value: "31-50", label: "31 - 50" },
          { value: "50+", label: "50+" }
        ])}
        {renderMultiSelect("Category", "category", ["Electronics", "Clothing", "Beauty", "Home"])}
        {renderMultiSelect("Tags", "tags", tagsList)}
        {renderMultiSelect("Payment", "paymentMethod", ["Credit Card", "PayPal", "Cash", "UPI", "Debit Card", "Wallet", "Net Banking"])}
        {renderSingleSelect("Date Range", "dateRange", [
          { value: "today", label: "Today" },
          { value: "last_7_days", label: "Last 7 Days" },
          { value: "last_30_days", label: "Last 30 Days" },
          { value: "this_year", label: "This Year" }
        ])}
        
        <div className="flex flex-col">
          <select 
            value={filters.sortBy} 
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="min-w-[180px] px-3 py-2 border border-blue-300 rounded-md text-sm bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date_desc">Sort by: Date (Newest First)</option>
            <option value="quantity_desc">Sort by: Quantity (High to Low)</option>
            <option value="name_asc">Sort by: Customer Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;