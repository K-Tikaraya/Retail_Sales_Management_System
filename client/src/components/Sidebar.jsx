import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [expanded, setExpanded] = useState({
    services: true,
    invoices: true
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      {/* Mobile/Toggle Button - Fixed position */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto z-40 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0'
      }`}>
        <div className={`${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-700 mt-14">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">V</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Vault</h3>
                <p className="text-xs text-gray-400">Anurag Yadav</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4">
            <ul className="space-y-1">
              <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer text-sm font-medium">
                Dashboard
              </li>
              <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer text-sm">
                Nexus
              </li>
              <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer text-sm">
                Intake
              </li>

              {/* Collapsible Section: Services */}
              <li>
                <button 
                  onClick={() => toggleSection('services')}
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-800 rounded-md text-sm font-medium"
                >
                  <span>Services</span>
                  {expanded.services ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {expanded.services && (
                  <ul className="ml-4 mt-1 space-y-1">
                    <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer text-sm text-gray-300">
                      Pre-active
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer text-sm text-gray-300">
                      Active
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer text-sm text-gray-300">
                      Blocked
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer text-sm text-gray-300">
                      Closed
                    </li>
                  </ul>
                )}
              </li>

              {/* Collapsible Section: Invoices */}
              <li>
                <button 
                  onClick={() => toggleSection('invoices')}
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-800 rounded-md text-sm font-medium"
                >
                  <span>Invoices</span>
                  {expanded.invoices ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expanded.invoices && (
                  <ul className="ml-4 mt-1 space-y-1">
                    <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer text-sm text-gray-300">
                      Proforma Invoices
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer text-sm text-gray-300">
                      Final Invoices
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;