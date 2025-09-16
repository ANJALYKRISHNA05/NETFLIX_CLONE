import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MovieDetail.css";
import { useWatchlist } from "../../context/WatchlistContext";
import { toast } from "react-toastify";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist } = useWatchlist();

  const [movie, setMovie] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTcxY2NlNTk1M2IxMTQ5NGVlM2QxZTg0NDFiMTIwYyIsIm5iZiI6MTc1NzY4MzMxMy44OCwic3ViIjoiNjhjNDFlNzFjY2FiOGI4YzYzZDI2NDI4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Ly0sF1bGrIZu05UEoG4Z-BwyBQLa1vPiZRKJwP2sm-c"
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setMovie(res))
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      <div className="movie-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <div className="detail-buttons">
            <button onClick={() => navigate(`/player/${movie.id}`)}>▶ Play</button>
          <button 
  onClick={() => {
    addToWatchlist(movie);
    toast.success("Added to Watchlist!");
  }}
>
  + Add to Watchlist
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
