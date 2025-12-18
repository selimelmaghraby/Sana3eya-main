import reviewsData from "../data/reviewsData";

function ReviewsPage() {
  return (
    <div>
      <h2>Worker Reviews</h2>

      {reviewsData.map((review) => (
        <div
          key={review.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{review.reviewer}</h4>
          <p>Rating: ⭐ {review.rating} / 5</p>
          <p>{review.comment}</p>
          <small>{review.date}</small>
        </div>
      ))}

      <h3>Add Review</h3>

      <form>
        <input type="text" placeholder="Your Name" />
        <br /><br />

        <select>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
        <br /><br />

        <textarea placeholder="Write your review"></textarea>
        <br /><br />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewsPage;
