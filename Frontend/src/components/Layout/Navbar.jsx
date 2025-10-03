import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { Calendar, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const navLinkClass = (path) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(path)
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
    }`;

  return (
    <nav aria-label="Main navigation" className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">EventHub</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/events" className={navLinkClass('/events')}>Events</Link>
          {isAuthenticated && (
            <>
              <Link to="/bookings" className={navLinkClass('/bookings')}>My Bookings</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className={navLinkClass('/admin')}>Admin</Link>
              )}
            </>
          )}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <>
              <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <User className="h-5 w-5" />
                <span>{user.name}</span>
              </Link>
              <button
                aria-label="Logout"
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkClass('/login')}>Login</Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
          <Link to="/events" className={navLinkClass('/events')}>Events</Link>
          {isAuthenticated && (
            <>
              <Link to="/bookings" className={navLinkClass('/bookings')}>My Bookings</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className={navLinkClass('/admin')}>Admin</Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
