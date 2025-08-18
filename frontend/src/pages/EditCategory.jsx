import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const EditCategory = ({ token }) => {
  const { id } = useParams(); // get category id from route
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  /*const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` },
  });
  */

  // Fetch category details
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // const { data } = await api.get(`/categories`);
        // const category = data.find((c) => c._id === id);

        const res = await API.get(`/posts/${id}`);

        if (res) {
          setName(res.data.title);
        } else {
          setMessage('❌ Category not found');
        }
      } catch (err) {
        setMessage('❌ ' + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/categories/${id}`, { name });
      setMessage('✅ Category updated successfully!');
      setTimeout(() => navigate('/categories'), 1200); // redirect back
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <p className="text-gray-600">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>

      {message && (
        <p className="mt-3 text-sm font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default EditCategory;
