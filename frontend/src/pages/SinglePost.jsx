// src/pages/SinglePost.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4 text-sm">
        By <span className="font-medium">{post.author?.name || 'Unknown'}</span>
        {post.category && (
          <>
            {' '}
            | Category:{' '}
            <span className="font-medium">{post.category.name}</span>
          </>
        )}
        {post.createdAt && (
          <> | {new Date(post.createdAt).toLocaleDateString()}</>
        )}
      </p>

      {post.image && (
        <img
          src={`https://react-blog-application-ck97.onrender.com${post.image}`}
          alt={post.title}
          className="w-full h-auto rounded-lg shadow mb-4"
        />
      )}

      <p className="text-lg leading-relaxed">{post.content}</p>

      <div className="mt-6 flex gap-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
        {token &&
          post.author?._id === JSON.parse(atob(token.split('.')[1])).id && (
            <>
              <Link
                to={`/edit/${post._id}`}
                className="text-yellow-500 hover:underline"
              >
                Edit
              </Link>
              <Link
                to={`/delete/${post._id}`}
                className="text-red-500 hover:underline"
              >
                Delete
              </Link>
            </>
          )}
      </div>
    </div>
  );
};

export default SinglePost;
