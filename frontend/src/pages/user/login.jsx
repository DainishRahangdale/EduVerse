import React from 'react'
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../utils/authProvider';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const {setIsAuthenticated,setIsLoggingOut,setUserRole } =useAuth();
    
  
    const handleSubmit =async (e) => {
      e.preventDefault();
      setMessage('');
     if(email&&password&&role==='teacher'){
      try{
       const res = await api.post(`/teacher/login`, {email:email, password:password});
       setIsAuthenticated(true);
       setIsLoggingOut(false);
       setUserRole('teacher')
       toast.success('Login successfully! Redirecting...', {
        position: 'top-right',
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate('/teacher/dashboard');
      }, 1000);
  
    }
    catch(err){
      console.log(err);
      
        toast.error(err.response?.data?.error || 'Login failed');
    }
       
     }
     else if(email&&password&&role==='student'){
      try{
        const res = await api.post(`/student/login`, {email:email, password:password});
        setIsAuthenticated(true);
        setIsLoggingOut(false);
        setUserRole('student')
        
        toast.success('Login successfully! Redirecting...', {
         position: 'top-right',
         autoClose: 1000,
       });
       setTimeout(() => {
         navigate('/student/dashboard');
       }, 1000);
   
     }
     catch(err){
       console.log(err);
       
         toast.error(err.response?.data?.error || 'Login failed');
     }
     }
     else{
           setMessage("Enter information !!");
     }
      
    };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Doesn't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default login;
