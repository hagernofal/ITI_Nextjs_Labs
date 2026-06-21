import Image from "next/image";
import Link from "next/link";

export default function ProductDetail({ product }) {
  if (!product) return <div className="container my-5 text-center">Loading...</div>;

  return (
    <div className="container my-5">
      <Link href="/products" className="btn btn-outline-secondary mb-4">← Back to Products</Link>
      
      <div className="row g-5 align-items-center p-4 rounded shadow bg-white">
        <div className="col-md-6">
          <div className="position-relative" style={{ height: "400px" }}>
            <Image 
              src={product.thumbnail} 
              alt={product.title} 
              fill 
              className="object-fit-cover rounded"
            />
          </div>
        </div>
        <div className="col-md-6">
          <span className="badge bg-primary mb-2 text-uppercase">{product.category}</span>
          <h1 className="display-6 fw-bold mb-3 text-dark">{product.title}</h1>
          <p className="lead text-muted small">{product.description}</p>
          <div className="h3 text-success fw-bold my-4">${product.price}</div>
          <div className="text-warning mb-4 fw-bold">Rating: ⭐ {product.rating}</div>
          <div className="text-secondary small mb-4">Brand: {product.brand} | Stock: {product.stock}</div>
          <button className="btn btn-primary btn-lg w-100">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  const paths = data.products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const product = await res.json();

  return {
    props: { product },
  };
}