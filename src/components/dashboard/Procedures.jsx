import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';

const Procedures = () => {
  return (
    <div className="p-34 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-sm text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">No procedures yet</h2>
      <p className="text-gray-600 mb-4">Start by creating a new procedure or check your existing ones.</p>
      <Link to="/dashboard/new-procedure">
        <Button variant="primary">Create New Procedure</Button>
      </Link>
    </div>
  );
};

export default Procedures;