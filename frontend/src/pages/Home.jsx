import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

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
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Blog Posts</h1>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">
                  {post.content.substring(0, 100)}...
                </p>
                <Link
                  to={`/posts/${post._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA for new visitors */}
      {/* <div className="text-center mt-10">
        <p className="text-gray-700">Want to share your own story?</p>
        <div className="mt-4 space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>*/}
    </div>
  );
};

export default Home;
