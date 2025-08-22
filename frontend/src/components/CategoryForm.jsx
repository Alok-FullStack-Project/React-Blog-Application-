import React from 'react';

const CategoryForm = ({ editName, setEditName, onSave, onCancel }) => {
  return (
    <li className="flex justify-between items-center py-2 gap-2">
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        className="flex-1 border px-2 py-1 rounded-md focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={onSave}
        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500"
      >
        Cancel
      </button>
    </li>
  );
};

export default CategoryForm;
