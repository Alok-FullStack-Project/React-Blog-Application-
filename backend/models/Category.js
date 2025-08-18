import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Ensure category name is unique per user
categorySchema.index({ name: 1, user: 1 }, { unique: true }); // compound unique index in Mongoose.

export default mongoose.model('Category', categorySchema);
