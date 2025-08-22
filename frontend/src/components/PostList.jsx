import PostCard from './PostCard';

const PostList = ({ posts, deletePost = null }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} deletePost={deletePost} />
      ))}
    </div>
  );
};

export default PostList;
