import { Routes, Route, Navigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobsPage from "./pages/JobsPage";
import ReviewsPage from "./pages/ReviewsPage";
import TrackingPage from "./pages/TrackingPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      role = jwtDecode(token).role;
    } catch {
      role = null;
    }
  }

  // 🔒 BEFORE LOGIN
  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // 🔓 AFTER LOGIN
  return (
    <>
      <nav style={navStyle}>
        <strong style={{ fontSize: 20 }}>Sana3eya</strong>
        <Link to="/jobs">Jobs</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/tracking">Tracking</Link>
        <Link to="/favorites">Favorites</Link>

        <span style={roleBadge}>Role: {role}</span>

        <button
          style={logoutBtn}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </nav>

      <Routes>
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<Navigate to="/jobs" />} />
      </Routes>
    </>
  );
}

const navStyle = {
  background: "#4f46e5",
  padding: "15px 30px",
  display: "flex",
  gap: "20px",
  alignItems: "center",
  color: "white",
};

const roleBadge = {
  marginLeft: "auto",
  background: "white",
  color: "#4f46e5",
  padding: "6px 14px",
  borderRadius: 20,
  fontWeight: "bold",
};

const logoutBtn = {
  marginLeft: 10,
  background: "#dc2626",
  color: "white",
};

export default App;

