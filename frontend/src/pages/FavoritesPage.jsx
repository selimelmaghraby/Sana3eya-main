import { useEffect, useState } from "react";
import axios from "axios";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch favorites
  const fetchFavorites = async () => {
    const res = await axios.get("http://localhost:5000/api/favorites", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFavorites(res.data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Remove from favorites
  const removeFavorite = async (jobId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/favorites/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Removed from favorites ❌");
      fetchFavorites(); // refresh list
    } catch (err) {
      alert("Failed to remove favorite");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Favorites</h2>

      {favorites.length === 0 && <p>No favorites yet</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {favorites.map((f) => (
          <div
            key={f._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{f.job?.title}</h3>
            <p>{f.job?.description}</p>

            <button
              style={{
                marginTop: "10px",
                backgroundColor: "#dc2626",
              }}
              onClick={() => removeFavorite(f.job?._id)}
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
