import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { ApiResponse, Product } from "../types";
import Navbar from "../components/Navbar";

interface ProductPayload {
  name: string;
  description: string;
  price: string;
  stock: string;
}

export default function AddProductPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<ProductPayload>({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const mutation = useMutation({
    mutationFn: (data: ProductPayload) =>
      apiClient<ApiResponse<Product>>("/products", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          price: parseFloat(data.price),
          stock: parseInt(data.stock || "0", 10),
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const handleChange =
    (field: keyof ProductPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-forest-700 transition-colors">
            Products
          </Link>
          <span>›</span>
          <span className="text-gray-700">Add Product</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-gray-900">
            Add Product
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Fill in the details to add a new product to your inventory.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-cream-200 p-8">
          {mutation.isError && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
              {(mutation.error as Error)?.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={255}
                value={form.name}
                onChange={handleChange("name")}
                placeholder="e.g. Wireless Keyboard"
                className="w-full px-4 py-2.5 rounded-lg border border-cream-200 bg-cream-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
                <span className="text-gray-400 font-normal ml-1">
                  (optional)
                </span>
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Brief description of the product..."
                className="w-full px-4 py-2.5 rounded-lg border border-cream-200 bg-cream-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    ₱
                  </span>
                  <input
                    type="number"
                    required
                    min={0}
                    step="0.01"
                    value={form.price}
                    onChange={handleChange("price")}
                    placeholder="0.00"
                    className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-cream-200 bg-cream-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stock
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.stock}
                  onChange={handleChange("stock")}
                  placeholder="0"
                  className="w-full px-4 py-2.5 rounded-lg border border-cream-200 bg-cream-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1 py-3 px-4 bg-forest-700 hover:bg-forest-900 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? "Adding product..." : "Add product"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
