import React, { useState } from 'react';
import CategoryForm from '../components/CategoryForm';

const CategoryItem = ({
  cat,
  isEditing,
  setEditingId,
  saveCategory,
  deleteCategory,
}) => {
  const [editName, setEditName] = useState(cat.name);

  if (isEditing) {
    return (
      <CategoryForm
        editName={editName}
        setEditName={setEditName}
        onSave={() => saveCategory(cat._id, editName)}
        onCancel={() => setEditingId(null)}
      />
    );
  }

  return (
    <li className="flex justify-between items-center py-2 gap-2">
      <span className="text-gray-800 font-medium">{cat.name}</span>
      <div className="flex gap-2">
        <button
          onClick={() => setEditingId(cat._id)}
          className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => deleteCategory(cat._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default CategoryItem;
