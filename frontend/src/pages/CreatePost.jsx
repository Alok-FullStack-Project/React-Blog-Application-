import { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]); // all categories
  const [categoryId, setCategoryId] = useState(''); // selected category
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);
    if (categoryId) formData.append('category', categoryId);

    try {
      await API.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Post created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating post');
    }
  };

  // fetch categories on load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get('/categories');
        setCategories(data);
      } catch (error) {
        toast.error('Failed to load categories' + error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Dropdown */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
          rows="5"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
