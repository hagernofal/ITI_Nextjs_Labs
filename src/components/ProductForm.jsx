import React, { useActionState, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProductForm({ existingProduct = null }) {
  const router = useRouter();
  const isEditMode = !!existingProduct;
  const [imageBase64, setImageBase64] = useState(existingProduct?.thumbnail || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  async function formAction(prevState, formData) {
    const productData = {
      title: formData.get('title'),
      price: Number(formData.get('price')),
      category: formData.get('category'),
      description: formData.get('description'),
      rating: Number(formData.get('rating')) || 4.5,
      thumbnail: imageBase64, 
    };

    if (!productData.thumbnail) {
      return { success: false, error: "Please upload a product image!" };
    }

    const url = isEditMode ? `/api/products/${existingProduct._id}` : '/api/products';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        router.push('/products');
        return { success: true, message: isEditMode ? "Updated!" : "Created!" };
      }
      const data = await res.json();
      return { success: false, error: data.error || "Something went wrong" };
    } catch (err) {
      return { success: false, error: "Server error" };
    }
  }

  const [state, submitAction, isPending] = useActionState(formAction, null);

  return (
    <div className="card p-4 shadow-sm max-w-md mx-auto bg-white text-dark rounded-3">
      <h3 className="mb-4 fw-bold">{isEditMode ? 'Edit Product' : 'Add New Product'}</h3>
      
      <form action={submitAction}>
        <div className="mb-3">
          <label className="form-label small fw-bold">Title</label>
          <input type="text" name="title" className="form-control" defaultValue={existingProduct?.title || ''} required />
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label small fw-bold">Price ($)</label>
            <input type="number" name="price" className="form-control" defaultValue={existingProduct?.price || ''} required />
          </div>
          <div className="col mb-3">
            <label className="form-label small fw-bold">Category</label>
            <input type="text" name="category" className="form-control" defaultValue={existingProduct?.category || ''} required />
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label small fw-bold">Rating (0-5)</label>
            <input type="number" step="0.1" max="5" min="0" name="rating" className="form-control" defaultValue={existingProduct?.rating || '4.5'} />
          </div>
          <div className="col mb-3">
            <label className="form-label small fw-bold">Upload Image</label>
            <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
          </div>
        </div>

        {imageBase64 && (
          <div className="mb-3 text-center">
            <img src={imageBase64} alt="Preview" className="img-thumbnail" style={{ maxHeight: '120px' }} />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label small fw-bold">Description</label>
          <textarea name="description" className="form-control" rows="3" defaultValue={existingProduct?.description || ''} required></textarea>
        </div>

        {state?.error && <div className="alert alert-danger small p-2">{state.error}</div>}

        <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={isPending}>
          {isPending ? 'Saving...' : isEditMode ? 'Update Product' : 'Save Product'}
        </button>
      </form>
    </div>
  );
}