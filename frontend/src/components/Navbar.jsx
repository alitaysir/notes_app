import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Navbar = ({setquery}) => {
  const { user,logout } = useAuth();

  return (
    <nav className="bg-gray-400 text-gray-800 py-4 px-6 shadow-md flex items-center justify-between w-full fixed top-0 left-0 mb-25">
      {/* Left - App Name */}
      <div className="text-xl font-semibold">
        NOTEAPP
      </div>
      
      {/* Center - Smaller Search Bar */}
      <div className="flex-1 mx-4 max-w-sm">
        <input 
          type="text" 
          placeholder="Search notes..." 
          onChange={(e)=>setquery(e.target.value)}
          className="w-full px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400" 
        />
      </div>

      {/* Right - Conditional Rendering for Auth Links or User Info */}
      <div className="flex items-center space-x-3">
        {user ? (
          <>
            <span className="text-gray-800 font-medium">{user.name || "Username"}</span>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            <Link to="/register" className="text-blue-500 hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
