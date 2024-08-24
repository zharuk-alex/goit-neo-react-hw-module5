import { useEffect, useState } from "react";
import { getTrends } from "api/tmdb";

import PageLayout from "components/PageLayout/PageLayout";
import MovieList from "components/MovieList/MovieList";
import Alert from "components/Alert/Alert";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTrends();
        setMovies(result.results);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <PageLayout>
      <h1>Trending today</h1>
      {!error ? (
        <MovieList movies={movies} />
      ) : (
        <Alert text="Ups, something went wrong!" />
      )}
    </PageLayout>
  );
}

export default HomePage;
