import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminHeader() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleLogout() {
    // Perform logout logic here
    navigate('/'); // Redirect to the welcome page after logout
  }

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  return (
    <div className="">
      <nav className="flex items-center  h-16 bg-gray-800 px-6 py-2">
        
        <div className="flex grow items-center">
          <img src="/src/assets/images/3.png" alt="Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-white text-xl font-bold">VEE Railway</h1>
        </div>
        <div className="flex flex-none items-center">
          <div className="relative">
            <button className="text-white font-semibold text-md" type="button" onClick={toggleDropdown}>
              MENU
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2  py-2 w-40 bg-white rounded shadow-lg">
                <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-200 font-semibold">
                  Dashboard
                </Link>
                <Link to="/admin/trains" className="block px-4 py-2 hover:bg-gray-200 font-semibold">
                  Trains
                </Link>
                <Link to="/admin/bookings/passenger" className="block px-4 py-2 hover:bg-gray-200 font-semibold">
                  Passengers
                </Link>
                <a href="#home" className="block px-4 py-2 hover:bg-gray-200 font-medium">
                  Reports
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="flex ml-5 flex-none items-center">
          <button className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white text-md font-semibold rounded" onClick={handleLogout}>
            LOG OUT
          </button>
        </div>
      </nav>

     
    </div>
  );
}

export default AdminHeader;
