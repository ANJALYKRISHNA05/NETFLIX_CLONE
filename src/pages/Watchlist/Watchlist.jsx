import React from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../../context/WatchlistContext";
import "./Watchlist.css";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  if (!watchlist || watchlist.length === 0) {
    return (
      <div style={{ padding: "20px", color: "white" }}>
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
        <p>No movies in watchlist.</p>
      </div>
    );
  }

  return (
    <div className="watchlist">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      <h1>My Watchlist</h1>
      <div className="watchlist-grid">
        {watchlist.map((movie) => (
          <div key={movie.id} className="watchlist-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onClick={() => navigate(`/detail/${movie.id}`)}
            />
            <p>{movie.title}</p>
            <button onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
