import { useState } from "react";

export default function AddServerModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (name && ip) {
      onSave(name, ip); // calls parent Dashboard to save in DB + refresh list
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <form
        onSubmit={handleAdd}
        className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl w-96 max-w-sm space-y-6 transform scale-100 transition-transform duration-300"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-400">Add New Server</h2>

        <div>
          <label htmlFor="serverName" className="block text-sm font-medium text-gray-400">
            Server Name
          </label>
          <input
            id="serverName"
            type="text"
            className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            placeholder="e.g., Main Database"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="serverIp" className="block text-sm font-medium text-gray-400">
            Server IP
          </label>
          <input
            id="serverIp"
            type="text"
            className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            placeholder="e.g., 192.168.1.1"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg font-semibold text-gray-200 bg-gray-600 hover:bg-gray-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            ➕ Add Server
          </button>
        </div>
      </form>
    </div>
  );
}
