import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        '/api/v4/user/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setTimeout(() => {
        navigate('/signin');
      }, 500);
      console.log('Logout response:', response);
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message || error.message);
      alert('Failed to log out. Please try again.');
    }
  };

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <div className="bg-blue-600">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-white text-xl font-semibold">RoleMaster</div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white block lg:hidden">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden lg:flex space-x-8">
          <NavLink
            to="/home"
            className={`text-white px-4 py-2 rounded-md font-medium ${isActiveRoute('/home') ? 'bg-blue-800 shadow-lg' : 'hover:bg-blue-700'}`}
          >
            User Management
          </NavLink>
          <NavLink
            to="role"
            className={`text-white px-4 py-2 rounded-md font-medium ${isActiveRoute('/home/role') ? 'bg-blue-800 shadow-lg' : 'hover:bg-blue-700'}`}
          >
            Role Management
          </NavLink>
          <NavLink
            to="permission"
            className={`text-white px-4 py-2 rounded-md font-medium ${isActiveRoute('/home/permission') ? 'bg-blue-800 shadow-lg' : 'hover:bg-blue-700'}`}
          >
            Permission Management
          </NavLink>
        </div>

        <div
          className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-0 left-0 w-full bg-blue-600 p-6 space-y-4`}
        >
          <NavLink
            to="/home"
            className={`text-white px-4 py-2 rounded-md font-medium ${isActiveRoute('/home') ? 'bg-blue-800 shadow-lg' : 'hover:bg-blue-700'}`}
          >
            User Management
          </NavLink>
          <NavLink
            to="role"
            className={`text-white px-4 py-2 rounded-md font-medium ${isActiveRoute('/home/role') ? 'bg-blue-800 shadow-lg' : 'hover:bg-blue-700'}`}
          >
            Role Management
          </NavLink>
          <NavLink
            to="permission"
            className={`text-white px-4 py-2 rounded-md font-medium ${isActiveRoute('/home/permission') ? 'bg-blue-800 shadow-lg' : 'hover:bg-blue-700'}`}
          >
            Permission Management
          </NavLink>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default TabBar;
