import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String},
  rating: { type: Number, default: 4.5 },
  availabilityStatus: { type: String, default: 'In Stock' },
  thumbnail: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);