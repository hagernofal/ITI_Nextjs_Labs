import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Products = ({ products }) => {
    if (!products || products.length === 0) {
        return <p className="text-center mt-4 fw-bold">No products found.</p>;
    }

    return (
        <div className="row g-4">
            {products.map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4">
                    <div className="card h-100 shadow-sm border-0 rounded-3 text-white" style={{ backgroundColor: "#74a5ab" }}>
                        <div className="position-relative" style={{ height: "220px" }}>
                            <Image 
                                src={product.thumbnail} 
                                alt={product.title} 
                                fill
                                className="card-img-top object-fit-cover rounded-top-3"
                                priority={product.id <= 3} 
                            />
                        </div>

                        <div className="card-body d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="badge bg-dark text-uppercase">{product.category}</span>
                                    <span className="text-warning font-monospace">⭐ {product.rating}</span>
                                </div>
                                <h5 className="card-title text-dark fw-bold">{product.title}</h5>
                                <p className="text-light small line-clamp-3">{product.description}</p>
                            </div>
                            
                            <div className="mt-3">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="fs-5 fw-bold text-dark">${product.price}</span>
                                    <span className="badge bg-light text-danger">{product.availabilityStatus}</span>
                                </div>
                                <Link href={`/products/${product.id}`} className="btn btn-light w-100 fw-bold text-dark">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;