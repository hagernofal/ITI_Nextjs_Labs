import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export default function ProductDetail({ product }) {
  if (!product) return <div className="container my-5 text-center">Loading...</div>;

  return (
    <div className="container my-5">
      <Link href="/products" className="btn btn-outline-secondary mb-4">← Back to Products</Link>
      
      <div className="row g-5 align-items-center p-4 rounded shadow bg-white">
        <div className="col-md-6">
          <div className="position-relative text-center" style={{ height: "400px" }}>
            {product.thumbnail?.startsWith('data:image') ? (
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="img-fluid rounded object-fit-cover w-100 h-100"
              />
            ) : (
              <Image 
                src={product.thumbnail || "https://via.placeholder.com/400"} 
                alt={product.title} 
                fill 
                className="object-fit-cover rounded"
                priority
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <span className="badge bg-primary mb-2 text-uppercase">{product.category}</span>
          <h1 className="display-6 fw-bold mb-3 text-dark">{product.title}</h1>
          <p className="lead text-muted small">{product.description}</p>
          <div className="h3 text-success fw-bold my-4">${product.price}</div>
          <div className="text-warning mb-4 fw-bold">Rating: ⭐ {product.rating || '4.5'}</div>
          <button className="btn btn-primary btn-lg w-100">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  await connectDB();
  const products = await Product.find({}, '_id').lean();

  const paths = products.map((product) => ({
    params: { id: product._id.toString() },
  }));

  return { 
    paths, 
    fallback: 'blocking' 
  };
}

export async function getStaticProps({ params }) {
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
      revalidate: 10,
    };
  } catch (error) {
    return { notFound: true };
  }
}