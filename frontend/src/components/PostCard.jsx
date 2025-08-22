import { Link, useLocation } from 'react-router-dom';

const PostCard = ({ post, deletePost = null }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {post.image && (
        <img
          src={`https:localhost:5000${post.image}`} //https://react-blog-application-ck97.onrender.com
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>

        {post.category && (
          <p className="text-sm text-gray-600">
            Category: <span className="font-medium">{post.category.name}</span>
          </p>
        )}
        {token && location.pathname === '/dashboard' ? (
          <div className="flex gap-4 mt-4">
            <Link
              to={`/edit/${post._id}`}
              className="text-blue-500 hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={() => deletePost(post._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              {post.content.substring(0, 100)}...
            </p>
            <Link
              to={`/posts/${post._id}`}
              className="text-blue-500 hover:underline"
            >
              Read More
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
