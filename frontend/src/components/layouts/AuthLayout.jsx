// src/components/layouts/AuthLayout.jsx
import React from 'react';

const AuthLayout = ({ title, children }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
