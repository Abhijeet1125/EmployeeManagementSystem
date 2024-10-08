import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import MainContent from './MainContent';

const EmployeeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const sidebarRef = useRef(null); 
  
  
  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    sidebarRef.current.touchStartX = touchStartX;
  };

  const handleTouchMove = (e) => {
    const touchCurrentX = e.touches[0].clientX;
    const swipeDistance = touchCurrentX - sidebarRef.current.touchStartX;
    
    if (swipeDistance > 50) {
      setIsSidebarOpen(true);
    }

    
    if (swipeDistance < -50) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div
        className="flex flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        ref={sidebarRef}
      >
        {/* Sidebar - Responsive visibility */}
        <div
          className={`z-5 bg-gray-200 text-black dark:bg-background-tertiary dark:text-text-primary lg:w-1/5 w-64 h-full transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:static fixed`}
        >
          <LeftSidebar />
        </div>
  
        {/* Main Content */}
        <div className="flex-1 h-full overflow-y-auto">
          <Outlet/>
        </div>
      </div>
    </div>
  );
  
};

export default EmployeeLayout;
