import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobsPage from "./pages/JobsPage";
import TrackingPage from "./pages/TrackingPage";
import ReviewsPage from "./pages/ReviewsPage";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sana3eya Platform</h1>

      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </div>
  );
}

export default App;







