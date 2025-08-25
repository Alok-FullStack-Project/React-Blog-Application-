import React from 'react';

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  className = 'w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
}) => {
  return (
    <div>
      <label className="block mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={type !== 'file' ? value : undefined} // file input shouldn't be controlled with value
        {...(type === 'file' ? { accept: 'image/*' } : {})} // only add accept if file
      />
    </div>
  );
};

export default InputField;
