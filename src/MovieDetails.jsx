import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the close icon
import './styles.css';

const MovieDetails = ({ movie, onClose }) => {
  return (
    <div className="movie-details">
      <button onClick={onClose} className="close-button">
        <FaTimes />
      </button>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Rated:</strong> {movie.Rated}</p>
      <p><strong>Released:</strong> {movie.Released}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Writer:</strong> {movie.Writer}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Language:</strong> {movie.Language}</p>
      <p><strong>Country:</strong> {movie.Country}</p>
      <p><strong>Awards:</strong> {movie.Awards}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
    </div>
  );
};

export default MovieDetails;
