import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Setup from "./pages/Setup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [setupDone, setSetupDone] = useState(localStorage.getItem("setupDone") === "true");
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        {!setupDone && <Route path="/" element={<Setup onSetup={() => {
          localStorage.setItem("setupDone", "true");
          setSetupDone(true);
        }} />} />}
        
        {setupDone && !token && <Route path="/" element={<Login onLogin={(t) => {
          localStorage.setItem("token", t);
          setToken(t);
        }} />} />}

        {setupDone && token && <Route path="/" element={<Dashboard onLogout={() => {
          localStorage.removeItem("token");
          setToken(null);
        }} />} />}
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
