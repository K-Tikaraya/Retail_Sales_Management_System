import React from 'react';
import { Search } from 'lucide-react';

const Header = ({ searchValue, onSearchChange }) => {
  return (
    <header className="flex justify-end items-center px-6 py-4 bg-white border-b border-gray-200">
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search by Name, Phone no." 
          value={searchValue} 
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>
    </header>
  );
};

export default Header;