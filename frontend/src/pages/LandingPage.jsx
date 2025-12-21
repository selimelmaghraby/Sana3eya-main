import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={center}>
      <h1>Sana3eya</h1>
      <p>Connecting skilled workers with trusted clients</p>

      <div style={{ display: "flex", gap: "20px", marginTop: 30 }}>
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button style={{ background: "#16a34a" }}>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

const center = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

export default LandingPage;
