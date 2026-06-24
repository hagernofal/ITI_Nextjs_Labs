import connectDB from "@/lib/db";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query; 

  if (req.method === "GET") {
    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching product" });
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true, 
        runValidators: true
      });
      if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(400).json({ error: "Update failed" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) return res.status(404).json({ error: "Product not found" });
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Delete failed" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}