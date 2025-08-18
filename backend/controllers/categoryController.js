import Category from '../models/Category.js';

// Create category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = new Category({
      name,
      user: req.user.id, // from auth middleware
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    if (err.code === 11000) {
      // duplicate key error (Mongo unique index)
      return res
        .status(400)
        .json({ error: 'Category already exists for this user' });
    }
    res.status(500).json({ error: err.message });
  }
};

// Get categories for logged-in user
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    console.log(categories);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { name },
      { new: true, runValidators: true }
    );

    if (!category) return res.status(404).json({ error: 'Category not found' });

    res.json(category);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ error: 'Category already exists for this user' });
    }
    res.status(500).json({ error: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!category) return res.status(404).json({ error: 'Category not found' });

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
