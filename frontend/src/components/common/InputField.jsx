import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="block mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
