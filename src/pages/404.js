import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="container text-center" style={{ marginTop: "15vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 bg-white p-5 rounded shadow-lg">
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <h2 className="fs-3 fw-semibold text-dark mb-3">Page Not Found</h2>
          <p className="text-muted mb-4">
            عذراً، المنتج أو الصفحة التي تبحث عنها غير موجودة.
          </p>
          <Link href="/products" className="btn btn-primary btn-lg px-4">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}