import { useState } from "react";
import axios from "axios";

export default function Setup({ onSetup }) {
  const [form, setForm] = useState({ 
    dbHost: "", 
    dbPort: "", 
    dbName: "", 
    dbUser: "", 
    dbPassword: "", 
    adminUsername: "", 
    adminPassword: "" 
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, this is where you would call your backend API.
      // The frontend should never directly connect to the database.
      await axios.post("http://localhost:5000/setup", form);
      onSetup();
    } catch (error) {
      console.error("Setup failed:", error);
      // You would typically show an error message to the user here.
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <form 
        onSubmit={submit} 
        className="bg-white p-8 rounded-2xl shadow-2xl space-y-6 w-full max-w-lg transition-all duration-300 transform hover:scale-105"
      >
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Database Setup
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your PostgreSQL and admin User Details details to get started.
          </p>
        </div>
        
        {/* Dynamic Input Fields */}
        <div className="space-y-4">
          {Object.keys(form).map((key) => (
            <div key={key} className="relative">
              <input
                type={key.toLowerCase().includes("password") ? "password" : "text"}
                id={key}
                placeholder=" "
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors peer"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
              <label 
                htmlFor={key}
                className="absolute left-4 -top-2.5 px-1 text-xs text-gray-500 bg-white transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-xs"
              >
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
            </div>
          ))}
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        >
          Complete Setup
        </button>
      </form>
    </div>
  );
}
