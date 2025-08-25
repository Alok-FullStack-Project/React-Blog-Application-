import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';

const EditPost = () => {
  const { id } = useParams(); // post ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(''); // selected category
  const [categories, setCategories] = useState([]); // all categories

  // Fetch post details + categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postRes, catRes] = await Promise.all([
          API.get(`/posts/${id}`),
          API.get('/categories'),
        ]);

        setTitle(postRes.data.title);
        setContent(postRes.data.content);
        setCategory(postRes.data.category._id || ''); // pre-select category
        setCategories(catRes.data);
      } catch (err) {
        toast.error('Error loading post or categories' + err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
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

        {/*<label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /> */}

        <InputField
          label="Title"
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block mb-1 text-gray-700">Content</label>
        <textarea
          className="w-full border p-2 rounded mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
        />

        <label className="block mb-1 text-gray-700">Category</label>
        <select
          className="w-full border p-2 rounded mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">-- Select a Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/*} <label className="block mb-1 text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mb-4"
        />*/}

        <InputField
          label="Image"
          type="file"
          placeholder=""
          value=""
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="w-full"
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </Button>
      </form>
    </div>
  );
};

export default EditPost;
