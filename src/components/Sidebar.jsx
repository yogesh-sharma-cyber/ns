import { useState } from "react";

// Inline SVGs for the icons, to avoid the external dependency
const UserIconSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const CogIconSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.527.288 1.15.485 1.838.563zm-.4 9.172a1.724 1.724 0 00-2.572-1.065c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 001.066-2.572c-.426-1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.527.288 1.15.485 1.838.563zm-.4-9.172a1.724 1.724 0 00-2.572-1.065c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572 1.065c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426-1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573 1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.527.288 1.15.485 1.838.563zM12 12a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);
const LogoutIconSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);
const MenuIconSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const XIconSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Sidebar({ onLogout }) {
  const [open, setOpen] = useState(true);

  const navItems = [
    { name: "Profile", icon: <UserIconSVG /> },
    { name: "Settings", icon: <CogIconSVG /> },
  ];

  return (
    <div className={`
      relative bg-gray-900 text-white min-h-screen transition-all duration-300
      ${open ? "w-64" : "w-20"}
    `}>
      {/* Sidebar Header with Toggle Button */}
      <div className="flex items-center justify-between p-4 mb-4">
        <h1 className={`text-2xl font-bold transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
          Dashboard
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-full bg-gray-900 hover:bg-gray-700 transition-colors"
        >
          {open ? <XIconSVG className="h-6 w-6" /> : <MenuIconSVG className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Navigation Links */}
      <nav className="space-y-2 px-3">
        {navItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`
              flex items-center space-x-4 p-3 rounded-lg 
              hover:bg-gray-700 transition-colors duration-200
              ${open ? "justify-start" : "justify-center"}
            `}
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <span className={`text-sm font-medium transition-all duration-300 ${open ? "opacity-100" : "opacity-0 absolute left-full -ml-3"}`}>
              {item.name}
            </span>
          </a>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 w-full p-4">
        <button
          onClick={onLogout}
          className={`
            w-full flex items-center space-x-4 p-3 rounded-lg 
            bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-200
            ${open ? "justify-start" : "justify-center"}
          `}
        >
          <div className="flex-shrink-0">
            <LogoutIconSVG className="h-6 w-6" />
          </div>
          <span className={`text-sm font-medium transition-all duration-300 ${open ? "opacity-100" : "opacity-0 absolute left-full -ml-3"}`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
