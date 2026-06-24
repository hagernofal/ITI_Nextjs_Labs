import connectDB from "@/lib/db";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await connectDB(); 

  if (req.method === "GET") {
    try {
      const products = await Product.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  if (req.method === "POST") {
    try {
      const newProduct = await Product.create(req.body);
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json({ error: "Invalid product data" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}