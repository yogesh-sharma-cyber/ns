import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddServerModal from "../components/AddServerModal";
import axios from "axios";

// SVG for the server card icon
const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

export default function Dashboard({ onLogout }) {
  const [servers, setServers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set up a timer to update the time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    // Fetch servers on component mount
    fetchServers();

    // Cleanup function to clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  const fetchServers = async () => {
    setLoading(true);
    setError(null);
    try {
      // NOTE: This uses a mock API call for demonstration.
      // Replace with your actual backend endpoint.
      const res = await axios.get("http://localhost:5000/servers");
      setServers(res.data);
    } catch (e) {
      console.error("Failed to fetch servers:", e);
      setError("Failed to load server data. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSaveServer = async (name, ip) => {
    try {
      // NOTE: Using mock API call for demonstration.
      await axios.post("http://localhost:5000/servers", { name, ip });
      fetchServers(); // Refresh the list after saving
      setShowModal(false);
    } catch (e) {
      console.error("Failed to save server:", e);
      setError("Failed to save the new server. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="text-xl font-mono text-indigo-400">
              {time.toLocaleTimeString()}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-colors duration-200"
            >
              ➕ Add Server
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center p-10 text-gray-400 text-lg">
            Loading servers...
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-200">My Servers</h2>
            {servers.length === 0 ? (
              <div className="text-center p-10 text-gray-400">
                <p className="mb-2">No servers found. Add your first server to get started!</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-colors duration-200"
                >
                  ➕ Add Server
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servers.map((srv) => (
                  <div key={srv.id} className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1">
                    <div className="flex items-center mb-4 space-x-3">
                      <ServerIcon />
                      <h3 className="text-xl font-semibold text-white">{srv.name}</h3>
                    </div>
            <div className="space-y-2 text-gray-300">
  <p className="flex items-center space-x-2">
    <span className="font-bold text-gray-400">IP:</span>
    <span>{srv.ip}</span>
  </p>

  <div className="flex items-center space-x-2">
    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
    <span className="text-green-400 font-medium">Online</span>
  </div>

  {/* Action buttons */}
  <div className="flex space-x-3 mt-4">
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md shadow"
      onClick={() => alert(`Manage server: ${srv.name}`)}
    >
      Manage
    </button>
    <button
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow"
      onClick={async () => {
        if (window.confirm(`Are you sure you want to delete ${srv.name}?`)) {
          try {
            await axios.delete(`http://localhost:5000/servers/${srv.id}`);
            fetchServers(); // refresh after delete
          } catch (e) {
            console.error("Failed to delete server:", e);
            setError("Failed to delete server. Please try again.");
          }
        }
      }}
    >
      Delete
    </button>
  </div>
</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showModal && (
        <AddServerModal onClose={() => setShowModal(false)} onSave={onSaveServer} />
      )}
    </div>
  );
}
