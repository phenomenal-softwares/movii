import React from 'react';
import { FaFilm } from 'react-icons/fa';

const MovieList = ({ movies, onMovieSelect }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div key={index} className="movie-card" onClick={() => onMovieSelect(movie.imdbID)}>
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <div className="movie-poster-placeholder" aria-hidden="true">
              <FaFilm />
              <span>{movie.Title}</span>
            </div>
          )}
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
