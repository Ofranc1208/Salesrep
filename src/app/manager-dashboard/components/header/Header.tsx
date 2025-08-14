import React from 'react';

// Header is now a simple, static component
const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold">Logo</div>
        <div>
          <button className="p-2 border border-gray-300 rounded-md">Filters</button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>Quick Stats</div>
      </div>
    </header>
  );
};

export default Header;
