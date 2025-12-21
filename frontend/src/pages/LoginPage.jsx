import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // 🔴 IMPORTANT: LOG RESPONSE
      console.log("LOGIN RESPONSE:", res.data);

      // 🔑 SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // 🔄 FORCE RELOAD APP STATE
      window.location.href = "/jobs";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={boxStyle}>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const boxStyle = {
  maxWidth: "400px",
  margin: "40px auto",
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

export default LoginPage;

