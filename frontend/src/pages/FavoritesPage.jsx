import { useEffect, useState } from "react";
import axios from "axios";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");

  // FETCH FAVORITES
  const fetchFavorites = async () => {
    const res = await axios.get("http://localhost:5000/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFavorites(res.data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // ❌ REMOVE FAVORITE (SEND JOB ID)
  const removeFavorite = async (jobId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/favorites/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // UPDATE UI
      setFavorites((prev) =>
        prev.filter((fav) => fav.job._id !== jobId)
      );
    } catch (err) {
      alert("Failed to remove favorite");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Favorites</h2>

      {favorites.length === 0 && <p>No favorites yet</p>}

      {favorites.map((fav) => (
        <div
          key={fav._id}
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <h4>{fav.job.title}</h4>
          <p>{fav.job.description}</p>
          <p>
            <strong>Budget:</strong> {fav.job.budget}
          </p>

          <button
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => removeFavorite(fav.job._id)}
          >
            ❌ Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;

