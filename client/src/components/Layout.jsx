import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content - Adjusts margin based on sidebar state */}
      <main className={`flex-1 transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;