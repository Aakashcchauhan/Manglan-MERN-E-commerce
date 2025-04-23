import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-6">You don't have permission to access this page.</p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default UnauthorizedPage;