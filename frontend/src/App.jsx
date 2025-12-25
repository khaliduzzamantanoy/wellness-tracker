import axios from "axios";
import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Notification from "./components/Notification";
import ThreeBackground from "./components/ThreeBackground"; // Import your 3D background component

export default function App() {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Set base URL once when app loads
    axios.defaults.baseURL = "https://server-v12.vercel.app/api";

    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    showNotification("Login successful!", "success");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    showNotification("Logged out", "info");
  };

  return (
    <>
      {/* Animated gradient background */}
      <div className="animated-bg"></div>

      {/* Optional: 3D spheres background */}
      <ThreeBackground />

      <div className="min-h-screen bg-transparent relative z-10">
        {notification && <Notification {...notification} />}
        {user ? (
          <Dashboard
            user={user}
            setUser={setUser}
            onLogout={handleLogout}
            showNotification={showNotification}
          />
        ) : (
          <LoginPage
            apiUrl="/auth" // we'll use baseURL, so just path here
            onLogin={handleLogin}
            showNotification={showNotification}
          />
        )}
      </div>
    </>
  );
}
