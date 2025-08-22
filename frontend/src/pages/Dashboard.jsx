// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import PostList from '../components/PostList';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchUserPosts = async () => {
    try {
      const res = await API.get('posts/user/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      await API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Post deleted');
      fetchUserPosts();
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  useEffect(() => {
    if (!user) navigate('/login');
    fetchUserPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader
        heading="My Dashboard"
        linkURL="/create"
        linkTitle="Add New Post"
      />

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center">No posts found.</p>
      ) : (
        <PostList posts={posts} deletePost={deletePost} />
      )}
    </div>
  );
};

export default Dashboard;
