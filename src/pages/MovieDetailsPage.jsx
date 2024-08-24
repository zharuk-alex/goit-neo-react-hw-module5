import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getMovieDetail } from "api/tmdb";
import BackBtn from "components/BackBtn/BackBtn";
import MovieDetail from "components/MovieDetail/MovieDetail";
import Alert from "components/Alert/Alert";

const imgpath = "https://image.tmdb.org/t/p/w400";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const locationRef = useRef(location);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getMovieDetail(movieId);
        setMovie(result);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchData();
    }
  }, [movieId]);

  const { id } = movie;

  const detailProps = {
    src: `${imgpath}/${movie.poster_path}`,
    title: movie.original_title,
    description: movie.overview,
    releaseDate: movie.release_date,
    chips: movie.genres,
    scores: movie.vote_average,
  };

  return (
    <div className="container">
      <div style={{ marginBottom: 20 }}>
        <BackBtn locationState={locationRef.current.state ?? "/movies"} />
      </div>
      {id && <MovieDetail {...detailProps} />}
      {error && (
        <Alert>
          <div>Ups, something went wrong!</div>
          <Link to="/">visit main page</Link>
        </Alert>
      )}
    </div>
  );
};

export default MovieDetailsPage;
