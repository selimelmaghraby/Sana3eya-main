import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password,
      role: "worker",
    });
    navigate("/login");
  };

  return (
    <div style={boxStyle}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <br /><br />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button>Register</button>
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

export default RegisterPage;
