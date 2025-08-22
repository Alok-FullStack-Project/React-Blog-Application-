import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import DashboardHeader from '../components/DashboardHeader';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/*} <h1 className="text-3xl font-bold mb-6 text-center">Latest Blog Posts</h1> */}
      <DashboardHeader heading="Latest Blog Posts" />
      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center">No posts found.</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
};

export default Home;
