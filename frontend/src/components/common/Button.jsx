// src/components/common/Button.jsx
import React from 'react';

const Button = ({ children, type = 'button', onClick, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
