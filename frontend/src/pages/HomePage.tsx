import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiClient } from "../api/client";
import { ApiResponse, Product } from "../types";
import Navbar from "../components/Navbar";

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600">
        Out of stock
      </span>
    );
  if (stock <= 10)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600">
        Low stock · {stock}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-forest-50 text-forest-700">
      In stock · {stock}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl border border-cream-200 p-5 hover:shadow-md hover:border-forest-100 transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-semibold text-gray-900 text-lg leading-tight group-hover:text-forest-700 transition-colors">
          {product.name}
        </h3>
        <span className="text-lg font-semibold text-forest-700 shrink-0">
          ₱{parseFloat(product.price).toFixed(2)}
        </span>
      </div>

      {product.description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <StockBadge stock={product.stock} />
      </div>
    </div>
  );
}

export default function HomePage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient<ApiResponse<Product[]>>("/products"),
  });

  const products = data?.data ?? [];

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold text-gray-900">
              Products
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {isLoading
                ? "Loading..."
                : `${products.length} product${products.length !== 1 ? "s" : ""} in inventory`}
            </p>
          </div>
          <Link
            to="/add-product"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 hover:bg-forest-900 text-white text-sm font-medium rounded-lg transition-colors"
          >
            + Add Product
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-cream-200 p-5 animate-pulse"
              >
                <div className="h-5 bg-cream-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-cream-100 rounded w-full mb-2" />
                <div className="h-4 bg-cream-100 rounded w-2/3 mb-4" />
                <div className="h-5 bg-cream-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-20">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-gray-600 font-medium">Failed to load products</p>
            <p className="text-sm text-gray-400 mt-1">
              {(error as Error)?.message}
            </p>
          </div>
        )}

        {!isLoading && !isError && products.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-cream-200 rounded-2xl">
            <div className="text-5xl mb-4">📦</div>
            <p className="font-display text-xl font-semibold text-gray-700 mb-1">
              No products yet
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Start by adding your first product to the inventory.
            </p>
            <Link
              to="/add-product"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 text-white text-sm font-medium rounded-lg hover:bg-forest-900 transition-colors"
            >
              Add your first product
            </Link>
          </div>
        )}

        {!isLoading && !isError && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
