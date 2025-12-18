import AuthPage from "./pages/AuthPage";
import ReviewsPage from "./pages/ReviewsPage";
import TrackingPage from "./pages/TrackingPage";
import JobsPage from "./pages/JobsPage";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sana3eya Platform</h1>

      <AuthPage />
      <hr />

      <JobsPage />
      <hr />

      <TrackingPage />
      <hr />

      <ReviewsPage />
    </div>
  );
}

export default App;





