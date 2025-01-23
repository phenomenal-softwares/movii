import React, { useState } from 'react';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import LoadingSpinner from './LoadingSpinner';
import LoadingScreen from './LoadingScreen';
import './styles.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false); // New state for loading screen

  const searchMovies = async (query) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=f27bfb0c&s=${query.trim()}`);
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
      const response = await axios.get(`https://www.omdbapi.com/?apikey=f27bfb0c&i=${id}`);
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

  // Display the loading screen if the app is still loading
  if (!loadingComplete) {
    return <LoadingScreen setLoadingComplete={setLoadingComplete} />;
  }

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
    </div>
  );
};

export default App;
