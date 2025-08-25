import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/categories', JSON.stringify({ name }));
      toast.success('Category added successfully!');
      setName('');
    } catch (err) {
      toast.error(err.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create New Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label=""
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {' '}
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </form>
    </div>
  );
};

export default CreateCategory;
