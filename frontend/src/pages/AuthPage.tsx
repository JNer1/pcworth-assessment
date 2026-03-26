import { useState, FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { ApiResponse, AuthData } from "../types";
import { useAuth } from "../contexts/AuthContext";

type Tab = "login" | "register";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function AuthPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("login");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginPayload) =>
      apiClient<ApiResponse<AuthData>>("/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (res) => {
      login(res.data.user, res.data.access_token);
      navigate("/");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterPayload) =>
      apiClient<ApiResponse<AuthData>>("/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (res) => {
      login(res.data.user, res.data.access_token);
      navigate("/");
    },
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(registerForm);
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-forest-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-forest-700 rounded-xl mb-4">
            <span className="text-white font-display font-bold text-xl">
              PC
            </span>
          </div>
          <h1 className="font-display text-3xl font-semibold text-gray-900">
            PC Worth Test
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your inventory with ease
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-cream-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-cream-200">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                tab === "login"
                  ? "text-forest-700 border-b-2 border-forest-700 -mb-px bg-white"
                  : "text-gray-400 hover:text-gray-600 bg-cream-50"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                tab === "register"
                  ? "text-forest-700 border-b-2 border-forest-700 -mb-px bg-white"
                  : "text-gray-400 hover:text-gray-600 bg-cream-50"
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-8">
            {(loginMutation.isError || registerMutation.isError) && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                {tab === "login"
                  ? (loginMutation.error as Error)?.message
                  : (registerMutation.error as Error)?.message}
              </div>
            )}

            {tab === "login" && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-200 bg-cream-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-200 bg-cream-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full py-3 px-4 bg-forest-700 hover:bg-forest-900 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign in"}
                </button>
              </form>
            )}

            {tab === "register" && (
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    value={registerForm.name}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-200 bg-cream-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-200 bg-cream-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-200 bg-cream-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
                    placeholder="Min. 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    required
                    value={registerForm.password_confirmation}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password_confirmation: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-cream-200 bg-cream-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="w-full py-3 px-4 bg-forest-700 hover:bg-forest-900 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {registerMutation.isPending
                    ? "Creating account..."
                    : "Create account"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
