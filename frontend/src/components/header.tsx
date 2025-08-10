// src/components/common/Navbar.tsx

import React, { useContext } from 'react';


const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold mr-4">Restaurant App</Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {user.role === 'user' && (
              <>
                <Link to="/user/home" className="hover:text-gray-300">Home</Link>
                <Link to="/user/restaurants" className="hover:text-gray-300">Restaurants</Link>
                <Link to="/user/cart" className="hover:text-gray-300">Cart</Link>
                <Link to="/user/profile" className="hover:text-gray-300">Profile</Link>
              </>
            )}
            {user.role === 'merchant' && (
              <>
                <Link to="/merchant/dashboard" className="hover:text-gray-300">Dashboard</Link>
                <Link to="/merchant/menu" className="hover:text-gray-300">Menu</Link>
                <Link to="/merchant/orders" className="hover:text-gray-300">Orders</Link>
                <Link to="/merchant/profile" className="hover:text-gray-300">Profile</Link>
              </>
            )}
            {user.role === 'admin' && (
              <>
                <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
                <Link to="/admin/users" className="hover:text-gray-300">Users</Link>
                <Link to="/admin/restaurants" className="hover:text-gray-300">Restaurants</Link>
                <Link to="/admin/analytics" className="hover:text-gray-300">Analytics</Link>
              </>
            )}
            <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;