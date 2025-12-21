import { useState } from "react";
import axios from "axios";

function ReviewsPage() {
  const [reviewee, setReviewee] = useState("");
  const [job, setJob] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/reviews",
      { reviewee, job, rating, comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Review submitted");
  };

  return (
    <div style={boxStyle}>
      <h2>Submit Review</h2>
      <form onSubmit={submit}>
        <input placeholder="Reviewee User ID" onChange={(e) => setReviewee(e.target.value)} />
        <br /><br />
        <input placeholder="Job ID" onChange={(e) => setJob(e.target.value)} />
        <br /><br />
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
        <br /><br />
        <textarea placeholder="Comment" onChange={(e) => setComment(e.target.value)} />
        <br /><br />
        <button>Submit</button>
      </form>
    </div>
  );
}

const boxStyle = {
  maxWidth: "450px",
  margin: "40px auto",
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

export default ReviewsPage;
