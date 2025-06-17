import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BookOpen, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../utils/authProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoggingOut, setUserRole } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginEndpoint = role === "teacher" ? "/teacher/login" : "/student/login";
    const redirectPath = role === "teacher" ? "/teacher/dashboard" : "/student/dashboard";

    try {
      const res = await api.post(loginEndpoint, { email, password });
      setIsAuthenticated(true);
      setIsLoggingOut(false);
      setUserRole(role);

      toast.success("Login successful! Redirecting...", { position: "top-right", autoClose: 800 });
      setTimeout(() => navigate(redirectPath), 800);
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white/50 shadow-md backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1
            className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            EduVerse
          </h1>
        </div>
      </header>

      {/* Login Card */}
      <div className="bg-white mt-10 p-8 rounded-2xl shadow-xl w-[90%] max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
            />
            <div className="text-right mt-1">
              <button type="button" className="text-xs text-blue-500 hover:underline">
                Forgot password?
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center space-x-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:opacity-90 transition duration-200 disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            <span>Login</span>
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
