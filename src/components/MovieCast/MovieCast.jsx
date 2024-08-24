import { useEffect, useState } from "react";
import { getMovieCast } from "api/tmdb";
import { useParams, Link } from "react-router-dom";
import styles from "./MovieCast.module.css";
import Pagination from "components/Pagination/Pagination";
import Card from "components/Card/Card";
import Alert from "components/Alert/Alert";
import Loader from "components/Loader/Loader";

const imgpath = "https://media.themoviedb.org/t/p/w276_and_h350_face";

const MovieCast = () => {
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    total: 0,
    perPage: 8,
  });

  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMovieCast(movieId);
        setCast(result.cast);

        setPagination({
          ...pagination,
          page: 1,
          total: Math.ceil(result.cast?.length / pagination.perPage),
        });
      } catch (error) {
        setError(true);
      } finally {
        setFetchCompleted(true);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const start = (pagination.page - 1) * pagination.perPage;
  const paginatedItems = cast.slice(start, start + pagination.perPage);

  const castCardProps = ({ name, character, profile_path }) => ({
    title: name,
    subtitle: character,
    src: `${imgpath}${profile_path}`,
  });

  return (
    <div className="movie-cast">
      <Loader visible={!fetchCompleted} />
      {!!paginatedItems?.length && !error ? (
        <>
          <ul className={styles.cardSet}>
            {paginatedItems?.map((item) => (
              <li className={styles.cardItem} key={item.id}>
                <Card {...castCardProps(item)} className={styles.card} />
              </li>
            ))}
          </ul>
          {pagination.total > 1 && (
            <Pagination {...pagination} onChange={handlePageChange} />
          )}
        </>
      ) : (
        fetchCompleted && <Alert>We don't have creadits for this movie!</Alert>
      )}
      {error && (
        <div>
          <Alert>
            <div>Ups, something went wrong!</div>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default MovieCast;
