import { useEffect, useState } from "react";
import axios from "axios";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const token = localStorage.getItem("token");

  // Fetch jobs
  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Create job
  const submitJob = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/jobs",
        { title, description, budget },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔥 SHOW JOB ID IMMEDIATELY
      alert(`Job created successfully!\n\nJob ID:\n${res.data.job._id}`);

      setTitle("");
      setDescription("");
      setBudget("");
      fetchJobs();
    } catch (err) {
      alert("Failed to create job");
    }
  };

  // Add to favorites
  const addToFavorites = async (jobId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/favorites/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Added to favorites ❤️");
    } catch (err) {
      alert("Already in favorites or error");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* CREATE JOB */}
      <div
        style={{
          maxWidth: "500px",
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          marginBottom: "40px",
        }}
      >
        <h2>Create Job</h2>

        <form onSubmit={submitJob}>
          <input
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br /><br />

          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br /><br />

          <input
            type="number"
            placeholder="Budget (EGP)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <br /><br />

          <button type="submit">Create Job</button>
        </form>
      </div>

      {/* JOB LIST */}
      <h2>Available Jobs</h2>

      {jobs.length === 0 && <p>No jobs yet</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Budget:</strong> {job.budget} EGP</p>

            {/* 🔑 SHOW JOB ID */}
            <p style={{ fontSize: "12px", color: "#555" }}>
              <strong>Job ID:</strong> {job._id}
            </p>

            <button
              style={{ marginTop: "10px" }}
              onClick={() => addToFavorites(job._id)}
            >
              ❤️ Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobsPage;

