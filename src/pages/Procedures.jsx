import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Procedures = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the procedures index page
    navigate('/procedures');
  }, [navigate]);
  
  // This is just a fallback in case the redirect doesn't happen immediately
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7fdf9]">
      <p className="text-lg text-[#157a3c]">Redirecting to procedures page...</p>
    </div>
  );
};

export default Procedures;