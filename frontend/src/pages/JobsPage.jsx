import jobsData from "../data/jobsData";

function JobsPage() {
  return (
    <div>
      <h2>Available Jobs</h2>

      {jobsData.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><strong>Budget:</strong> {job.budget}</p>
          <p><strong>Location:</strong> {job.location}</p>

          <button>Apply for Job</button>
        </div>
      ))}
    </div>
  );
}

export default JobsPage;
