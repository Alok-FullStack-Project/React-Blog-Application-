import express from 'express';
import {
  createPost,
  deletePost,
  getPostById,
  getUserPosts,
  getAllPosts,
  updatePost,
} from '../controllers/postController.js';
import { upload } from '../middleware/upload.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.post('/', auth, upload.single('image'), createPost);

router.put('/:id', auth, upload.single('image'), updatePost);

router.delete('/:id', auth, deletePost);

router.get('/user/posts', auth, getUserPosts);

export default router;
