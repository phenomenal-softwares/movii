import React, { useState } from 'react';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import LoadingSpinner from './LoadingSpinner';
import Footer from './Footer';
import './styles.css';

const featuredMovies = [
  { Title: 'Inception', Year: '2010', imdbID: 'tt1375666', Poster: 'N/A' },
  { Title: 'The Matrix', Year: '1999', imdbID: 'tt0133093', Poster: 'N/A' },
  { Title: 'Interstellar', Year: '2014', imdbID: 'tt0816692', Poster: 'N/A' },
  { Title: 'Parasite', Year: '2019', imdbID: 'tt6751668', Poster: 'N/A' },
  { Title: 'The Dark Knight', Year: '2008', imdbID: 'tt0468569', Poster: 'N/A' },
];

const App = () => {
  const [movies, setMovies] = useState(() => [
    featuredMovies[Math.floor(Math.random() * featuredMovies.length)],
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const searchMovies = async (query) => {
    setLoading(true);
    setError('');
    setSelectedMovie(null);
    try {
      const response = await axios.get('/api/movies', {
        params: { s: query.trim() },
      });
      if (response.data.Response === 'False') {
        setError(response.data.Error);
        setMovies([]);
      } else {
        setMovies(response.data.Search || []);
      }
    } catch (error) {
      setError('Failed to fetch movie data.');
      console.error('Error fetching movie data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/movies', {
        params: { i: id },
      });
      setSelectedMovie(response.data);
    } catch (error) {
      setError('Failed to fetch movie details.');
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Movii</h1>
        <button onClick={toggleDarkMode} className="theme-toggle">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>
      <SearchBar onSearch={searchMovies} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      ) : (
        <>
          <MovieList movies={movies} onMovieSelect={fetchMovieDetails} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
