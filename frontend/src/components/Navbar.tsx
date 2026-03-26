import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { ApiResponse } from "../types";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () =>
      apiClient<ApiResponse<null>>("/logout", { method: "POST" }),
    onSettled: () => {
      logout();
      navigate("/login");
    },
  });

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-cream-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-forest-700 rounded flex items-center justify-center">
            <span className="text-white text-xs font-display font-bold">P</span>
          </div>
          <span className="font-display font-semibold text-forest-700 text-lg tracking-tight">
            PC Worth Test
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md font-bold transition-colors ${
              isActive("/")
                ? "text-forest-700 underline underline-offset-2 font-bold"
                : "text-gray-600 hover:text-forest-700 hover:bg-cream-100"
            }`}
          >
            Products
          </Link>
          <Link
            to="/add-product"
            className={`px-4 py-2 rounded-md font-bold transition-colors ${
              isActive("/add-product")
                ? "bg-forest-50 text-forest-700 underline underline-offset-2 font-bold"
                : "text-gray-600 hover:text-forest-700 hover:bg-cream-100"
            }`}
          >
            Add Product
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block">
            Hello, {user?.name}
          </span>
          <button
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-forest-700 border border-forest-700 rounded-md hover:bg-forest-700 hover:text-white transition-colors disabled:opacity-50"
          >
            {logoutMutation.isPending ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>
    </header>
  );
}
