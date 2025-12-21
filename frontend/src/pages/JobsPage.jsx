import { useEffect, useState } from "react";
import axios from "axios";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const token = localStorage.getItem("token");

  // FETCH JOBS
  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // CREATE JOB (ANY USER)
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

      alert("Job created!\nJob ID:\n" + res.data.job._id);

      setTitle("");
      setDescription("");
      setBudget("");
      fetchJobs();
    } catch (err) {
      alert("Failed to create job");
      console.log(err);
    }
  };

  // ADD TO FAVORITES
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
      alert("Added to favorites");
    } catch {
      alert("Already in favorites or error");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
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
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <br /><br />

        <button type="submit">Add Job</button>
      </form>

      <hr />

      <h2>All Jobs</h2>

      {jobs.length === 0 && <p>No jobs yet</p>}

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <h4>{job.title}</h4>
          <p>{job.description}</p>
          <p>
            <strong>Budget:</strong> {job.budget}
          </p>
          <p style={{ fontSize: "12px", color: "#555" }}>
            Job ID: {job._id}
          </p>

          <button onClick={() => addToFavorites(job._id)}>
            ⭐ Add to Favorites
          </button>
        </div>
      ))}
    </div>
  );
}

export default JobsPage;




