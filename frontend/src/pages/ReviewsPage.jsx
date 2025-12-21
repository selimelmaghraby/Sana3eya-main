import { useEffect, useState } from "react";
import axios from "axios";

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [jobId, setJobId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  // =========================
  // FETCH REVIEWS
  // =========================
  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // =========================
  // SUBMIT REVIEW
  // =========================
  const submitReview = async (e) => {
    e.preventDefault();

    if (!jobId) {
      alert("Please enter Job ID");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/reviews",
        {
          jobId: jobId.trim(),
          rating: Number(rating),
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review submitted successfully");

      setJobId("");
      setRating(5);
      setComment("");
      fetchReviews();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to submit review");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* ================= FORM ================= */}
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
        <h2>Submit Review</h2>

        <form onSubmit={submitReview}>
          <input
            placeholder="Job ID"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
          />
          <br /><br />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value={5}>5 ⭐</option>
            <option value={4}>4 ⭐</option>
            <option value={3}>3 ⭐</option>
            <option value={2}>2 ⭐</option>
            <option value={1}>1 ⭐</option>
          </select>

          <br /><br />

          <textarea
            placeholder="Comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <br /><br />

          <button type="submit">Submit Review</button>
        </form>
      </div>

      {/* ================= LIST ================= */}
      <h2>All Reviews</h2>

      {reviews.length === 0 && <p>No reviews yet</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {reviews.map((r) => (
          <div
            key={r._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              <strong>Job:</strong> {r.job?.title || r.job?._id}
            </p>
            <p>
              <strong>Reviewer:</strong> {r.reviewer?.name}
            </p>
            <p>
              <strong>Reviewee:</strong> {r.reviewee?.name}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {r.rating}
            </p>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsPage;

