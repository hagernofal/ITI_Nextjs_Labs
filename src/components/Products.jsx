import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react"; 

const Products = ({ products }) => {
    const { data: session } = useSession(); 

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
                if (res.ok) {
                    window.location.reload(); 
                } else {
                    alert("Failed to delete product");
                }
            } catch (err) {
                alert("Server error occurred while deleting");
            }
        }
    };

    if (!products || products.length === 0) {
        return <p className="text-center mt-4 fw-bold">No products found.</p>;
    }

    return (
        <div className="row g-4">
            {products.map((product) => {
                const productId = product._id || product.id;

                return (
                    <div key={productId} className="col-12 col-sm-6 col-md-4">
                        <div className="card h-100 shadow-sm border-0 rounded-3 text-white" style={{ backgroundColor: "#74a5ab" }}>
                            
                            <div className="position-relative" style={{ height: "220px" }}>
                                {product.thumbnail?.startsWith('data:image') ? (
                                    <img 
                                        src={product.thumbnail} 
                                        alt={product.title} 
                                        className="card-img-top object-fit-cover rounded-top-3 w-100 h-100"
                                    />
                                ) : (
                                    <Image 
                                        src={product.thumbnail || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"} 
                                        alt={product.title} 
                                        fill
                                        className="card-img-top object-fit-cover rounded-top-3"
                                        priority={product.id <= 3} 
                                    />
                                )}
                            </div>

                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="badge bg-dark text-uppercase">{product.category}</span>
                                        <span className="text-warning font-monospace">⭐ {product.rating || '4.5'}</span>
                                    </div>
                                    <h5 className="card-title text-dark fw-bold">{product.title}</h5>
                                    <p className="text-light small line-clamp-3">{product.description}</p>
                                </div>
                                
                                <div className="mt-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="fs-5 fw-bold text-dark">${product.price}</span>
                                        <span className="badge bg-light text-danger">{product.availabilityStatus || 'In Stock'}</span>
                                    </div>

                                    <div className="d-flex flex-column gap-2">
                                        <Link href={`/products/${productId}`} className="btn btn-light w-100 fw-bold text-dark">
                                            View Details
                                        </Link>

                                        {session && (
                                            <div className="d-flex gap-2">
                                                <Link href={`/products/edit/${productId}`} className="btn btn-dark w-50 fw-bold">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(productId)} className="btn btn-danger w-50 fw-bold">
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Products;