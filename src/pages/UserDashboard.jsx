import React, { useState } from 'react';
import { Container, Button } from '../components/ui';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import HeaderDashboard from '../components/HeaderDashboard';
import useLogin from '../hooks/useLogin';

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [avatarSrc, setAvatarSrc] = useState('/img/avatar.jpg');
  const { logout } = useLogin();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSignOut = () => {
    // Clear all auth-related items from local storage
    logout(); // This removes the 'user' item
    localStorage.removeItem('token'); // Remove auth token
    localStorage.removeItem('refresh_token'); // Remove refresh token if it exists
    
    // Clear any other application data that should be removed on logout
    // Add additional removeItem calls here if needed
    
    // Redirect to login page
    navigate('/login');
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen">
      <HeaderDashboard />
      <Container>
        <div className="py-8 flex gap-8">
          {/* Left Column - Navigation Menu */}
          <div className="w-90 flex-shrink-0 p-6 rounded-xl shadow-lg bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] border border-[#e8f8ee]">
            {/* User Profile Section */}
            <div className="flex flex-col items-center space-y-4 mb-8">
              <div className="relative group">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={avatarSrc}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#1a602d]">Hello, Juan Pablo</h1>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex flex-col space-y-2">
            <Link to="/dashboard/procedures" className="block">
              <Button variant={isActive('/dashboard/procedures') ? 'primary' : 'secondary'} fullWidth className="py-3 flex items-center justify-start px-4 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                My Procedures
              </Button>
            </Link>

            <Link to="/dashboard/profile" className="block">
              <Button variant={isActive('/dashboard/profile') ? 'primary' : 'secondary'} fullWidth className="py-3 flex items-center justify-start px-4 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Your Profile
              </Button>
            </Link>

            <Link to="/dashboard/password" className="block">
              <Button variant={isActive('/dashboard/password') ? 'primary' : 'secondary'} fullWidth className="py-3 flex items-center justify-start px-4 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Update Password
              </Button>
            </Link>

            <Link to="/dashboard/new-procedure" className="block">
              <Button variant={isActive('/dashboard/new-procedure') ? 'primary' : 'secondary'} fullWidth className="py-3 flex items-center justify-start px-4 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Procedure
              </Button>
            </Link>

            <Link to="/dashboard/payments" className="block">
              <Button variant={isActive('/dashboard/payments') ? 'primary' : 'secondary'} fullWidth className="py-3 flex items-center justify-start px-4 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                My Payments
              </Button>
            </Link>

            <Button
              variant="secondary"
              fullWidth
              className="py-3 flex items-center justify-start px-4 cursor-pointer"
              onClick={handleSignOut}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </Button>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserDashboard;