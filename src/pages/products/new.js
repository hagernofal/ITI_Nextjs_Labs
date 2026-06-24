import ProductForm from "@/components/ProductForm";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export default function NewProductPage({ categories }) {
  return (
    <div className="container my-5">
      <ProductForm categories={categories} />
    </div>
  );
}

export async function getServerSideProps() {
  await connectDB();
  const products = await Product.find({}, 'category').lean();
  
  const uniqueCategories = [...new Set(products.map(p => p.category))];

  return {
    props: {
      categories: uniqueCategories,
    },
  };
}