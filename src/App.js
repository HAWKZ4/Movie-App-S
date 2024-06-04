import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef(null);

  const searchMovies = async (title) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    inputRef.current.focus();
    searchMovies(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(searchTerm);
  };

  return (
    <div className="app">
      <h1>MoviesLand</h1>

      <form onSubmit={handleSubmit} className="search">
        <input
          value={searchTerm}
          placeholder="Search for movies"
          ref={inputRef}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </form>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <h2>There's no movies</h2>
      )}
    </div>
  );
};

export default App;
