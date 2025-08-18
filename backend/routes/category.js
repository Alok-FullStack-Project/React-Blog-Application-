import express from 'express';
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from '../controllers/categoryController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/categories
// @desc    Create a new category
router.post('/', auth, createCategory);

// @route   GET /api/categories
// @desc    Get all categories
router.get('/', auth, getCategories);

// @route   DELETE /api/categories/:id
// @desc    Delete a category by ID
router.delete('/:id', auth, deleteCategory);

// @route   PUT /api/categories/:id
// @desc    Update category name by ID
router.put('/:id', auth, updateCategory);

export default router;
