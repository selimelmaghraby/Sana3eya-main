import { useState } from "react";
import axios from "axios";

function TrackingPage() {
  const [jobId, setJobId] = useState("");
  const [progress, setProgress] = useState("");

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:5000/api/tracking/${jobId}`,
      { progress },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Progress updated");
  };

  return (
    <div style={boxStyle}>
      <h2>Update Job Progress</h2>
      <form onSubmit={submit}>
        <input placeholder="Job ID" onChange={(e) => setJobId(e.target.value)} />
        <br /><br />
        <input
          type="number"
          placeholder="Progress %"
          onChange={(e) => setProgress(e.target.value)}
        />
        <br /><br />
        <button>Update</button>
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

export default TrackingPage;
