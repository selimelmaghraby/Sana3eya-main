import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/jobs">Jobs</Link> |{" "}
      <Link to="/tracking">Tracking</Link> |{" "}
      <Link to="/reviews">Reviews</Link>
    </nav>
  );
}

export default Navbar;

