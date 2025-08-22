import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin, onGoToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // This is where you would make a real API call to your backend.
      // For this example, we'll simulate a successful response.
      const res = await axios.post("http://localhost:5000/auth/login", { username, password });
      
      // On successful login, pass the token to the parent component.
      onLogin(res.data.token);
    } catch (error) {
      // Handle login errors and display a user-friendly message.
      console.error("Login failed:", error);
      setErrorMessage("Invalid username or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm">
        <form 
          onSubmit={submit} 
          className="bg-white p-8 rounded-2xl shadow-2xl space-y-6 w-full transform transition-transform duration-300"
        >
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500">
              Sign in to your account
            </p>
          </div>
          
          {/* Form Inputs */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                id="username"
                placeholder=" "
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors peer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label 
                htmlFor="username"
                className="absolute left-4 -top-2.5 px-1 text-xs text-gray-500 bg-white transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-xs"
              >
                Username
              </label>
            </div>
            
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder=" "
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors peer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label 
                htmlFor="password"
                className="absolute left-4 -top-2.5 px-1 text-xs text-gray-500 bg-white transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-xs"
              >
                Password
              </label>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-center text-sm text-red-600 font-medium">
              {errorMessage}
            </div>
          )}

          {/* Button Section */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
