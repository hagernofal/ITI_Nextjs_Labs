import connectDB from "@/lib/db";
import Product from "@/models/Product";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage({ product }) {
  if (!product) return <div className="container my-5 text-center">Loading...</div>;

  return (
    <div className="container my-5">
      <ProductForm existingProduct={product} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  await connectDB();
  try {
    const productData = await Product.findById(params.id).lean();
    if (!productData) {
      return { notFound: true };
    }
    return {
      props: {
        product: JSON.parse(JSON.stringify(productData)),
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}