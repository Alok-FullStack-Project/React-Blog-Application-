// src/pages/EditPost.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const EditPost = () => {
  const { id } = useParams(); // post ID from URL
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Fetch post details for editing
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        toast.error('Error loading post');
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);
    try {
      //  await API.put(`/posts/${id}`, { title, content });

      await API.put(`/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Post updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating post');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>

        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mb-2 font-semibold">Content</label>
        <textarea
          className="w-full border p-2 rounded mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
