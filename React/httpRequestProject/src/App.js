import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import axios from 'axios';
import Spinner from './components/Spinner';

function App() {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchMovieHandler = () => {
    setIsloading(true);
    axios.get('https://swapi.dev/api/films/').then((res) => {
      const transformedMovie = res.data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawlm,
          releaseDate: movie.release_date,
        };
      });
      setMovie(transformedMovie);
      setIsloading(false);
    });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movie} />}
        {isLoading && <Spinner/>}
      </section>
    </React.Fragment>
  );
}

export default App;
