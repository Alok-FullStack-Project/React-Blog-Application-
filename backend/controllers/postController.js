// backend/controllers/postController.js
import Post from '../models/Post.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate('author', 'username')
    .populate('category', 'name') // populate only category name
    .sort({ createdAt: -1 });
  res.json(posts);
};

// Get post by ID
export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'name')
    .populate('category', 'name'); // populate only category name;
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      title,
      content,
      image,
      author: req.user.id, // from auth middleware
      category,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update post
export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const { title, content, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  if (image)
    if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() !== req.user.id)
    return res.status(403).json({ message: 'Unauthorized' });
  let updatedPost;
  if (image) {
    updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
        image,
      },
      {
        new: true,
      }
    );
  } else {
    updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category,
      },
      {
        new: true,
      }
    );
  }

  res.json(updatedPost);
};

// Delete post
export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() !== req.user.id)
    return res.status(403).json({ message: 'Unauthorized' });

  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
};

// Get posts by logged-in user
export const getUserPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user.id })
    .populate('category', 'name') // populate only category name
    .sort({ createdAt: -1 });
  res.json(posts);
};
