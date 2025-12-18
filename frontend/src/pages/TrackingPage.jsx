import trackingData from "../data/trackingData";

function TrackingPage() {
  return (
    <div>
      <h2>Project Tracking Dashboard</h2>
      <h4>Job: {trackingData.jobTitle}</h4>

      <p>Progress: {trackingData.progress}%</p>

      <div style={{ background: "#ddd", height: "20px", width: "100%", marginBottom: "20px" }}>
        <div
          style={{
            background: "green",
            height: "100%",
            width: `${trackingData.progress}%`,
          }}
        ></div>
      </div>

      <h3>Milestones</h3>

      <ul>
        {trackingData.milestones.map((m) => (
          <li key={m.id}>
            {m.completed ? "✅" : "⬜"} {m.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackingPage;
