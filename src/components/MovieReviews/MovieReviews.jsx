import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieReviews } from "api/tmdb";
import styles from "./MovieReviews.module.css";
import Pagination from "components/Pagination/Pagination";
import Alert from "components/Alert/Alert";
import Loader from "components/Loader/Loader";

const MovieReviews = () => {
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    total: 0,
    perPage: 1,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMovieReviews(movieId);
        setReviews(result.results);
        setPagination({
          ...pagination,
          page: 1,
          total: Math.ceil(result.results?.length / pagination.perPage),
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
  const paginatedItems = reviews.slice(start, start + pagination.perPage);

  return (
    <div>
      <Loader visible={!fetchCompleted} />
      {!!paginatedItems?.length ? (
        <>
          <div className={styles.cardSet}>
            {paginatedItems?.map(({ id, author, content: review }) => (
              <div key={id}>
                <p className={styles.review}>{review}</p>
                <p className={styles.author}>{author}</p>
              </div>
            ))}
          </div>
          {pagination.total > 1 && (
            <Pagination {...pagination} onChange={handlePageChange} />
          )}
        </>
      ) : (
        fetchCompleted && <Alert>We don't have any reviews!</Alert>
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

export default MovieReviews;
