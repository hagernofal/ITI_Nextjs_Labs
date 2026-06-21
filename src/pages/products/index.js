import React, { useState, useTransition } from 'react';
import Products from '@/components/Products';

const ProductsPage = ({ initialProducts }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState(""); 
    
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [isPending, startTransition] = useTransition();

    const categories = ["all", ...new Set(initialProducts.map(p => p.category))];

    const handleFilterAndSort = (search, cat, sort) => {
        let result = [...initialProducts];

        if (search) {
            result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
        }
        if (cat !== "all") {
            result = result.filter(p => p.category === cat);
        }
        if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
        if (sort === "rate-desc") result.sort((a, b) => b.rating - a.rating);

        setFilteredProducts(result);
    };

    return (
        <div className="container my-4">
            <h1 className="mb-4 fw-bold text-secondary">Products List</h1>
            
            <div className="row g-3 mb-4 p-3 bg-light rounded shadow-sm">
                <div className="col-md-4">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by title..." 
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            startTransition(() => handleFilterAndSort(e.target.value, category, sortBy));
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <select className="form-select" value={category} onChange={(e) => {
                        setCategory(e.target.value);
                        startTransition(() => handleFilterAndSort(searchTerm, e.target.value, sortBy));
                    }}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="col-md-4">
                    <select className="form-select" value={sortBy} onChange={(e) => {
                        setSortBy(e.target.value);
                        startTransition(() => handleFilterAndSort(searchTerm, category, e.target.value));
                    }}>
                        <option value="">Sort By</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rate-desc">Rating: Highest First</option>
                    </select>
                </div>
                {isPending && <div className="text-primary small mt-2 animate-pulse">Filtering results...</div>}
            </div>

            <Products products={filteredProducts} />
        </div>
    );
};

export default ProductsPage;
export async function getStaticProps() {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    return {
        props: {
            initialProducts: data.products,
        },
    };
}