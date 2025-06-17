import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../utils/authProvider';
import { BookOpen } from 'lucide-react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({}); // store errors per field

  const navigate = useNavigate();
  const { setIsAuthenticated, setIsLoggingOut,setUserRole } = useAuth();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required.';
    else if (!isValidEmail(email)) newErrors.email = 'Please enter a valid email address.';

    if (!password) newErrors.password = 'Password is required.';
    else if (!isStrongPassword(password))
      newErrors.password =
        'Password must be at least 8 characters, with uppercase, lowercase, number, and special char.';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    if (!name) newErrors.name = 'Name is required.';

    if (!role) newErrors.role = 'Role is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // stop submission if errors

    try {
      if (role === 'teacher') {
        await api.post(`/teacher/signup`, { email, password, name });
        setIsAuthenticated(true);
        setIsLoggingOut(false);
        setUserRole('teacher');
        toast.success('Registered successfully! Redirecting...', { position: 'top-right', autoClose: 1000 });
        setTimeout(() => navigate('/teacher/dashboard'), 1000);
      } else if (role === 'student') {
        await api.post(`/student/signup`, { email, password, name });
        setIsAuthenticated(true);
        setIsLoggingOut(false);
        setUserRole('student');
        toast.success('Registered successfully! Redirecting...', { position: 'top-right', autoClose: 1000 });
        setTimeout(() => navigate('/student/dashboard'), 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Signup failed');
    }
  };

  // Helper to clear error for a specific field on change
  const handleChange = (field, setter) => (e) => {
    setter(e.target.value);
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col items-center">
  {/* Header */}
  <header className="w-full flex justify-between items-center px-6 py-4 bg-white/60 shadow-sm backdrop-blur-md">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      <h1
        className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
        onClick={() => navigate("/")}
      >
        EduVerse
      </h1>
    </div>
  </header>

  {/* Sign Up Card */}
  <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md mt-8 transition-all duration-300">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      
      {/* Name */}
      <div>
        <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleChange('name', setName)}
          placeholder="Enter your full name"
          className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleChange('email', setEmail)}
          placeholder="Enter your email"
          className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handleChange('password', setPassword)}
          placeholder="Enter your password"
          className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange('confirmPassword', setConfirmPassword)}
          placeholder="Confirm your password"
          className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          value={role}
          onChange={handleChange('role', setRole)}
          className={`w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.role ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
      >
        Sign Up
      </button>
    </form>

    <p className="mt-5 text-center text-sm text-gray-500">
      Already have an account?{" "}
      <a href="/login" className="text-blue-500 hover:underline">
        Login
      </a>
    </p>
  </div>

  <ToastContainer />
</div>

  );
};

export default SignUp;
