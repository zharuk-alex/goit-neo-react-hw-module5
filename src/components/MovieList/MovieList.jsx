import { Link, useLocation } from "react-router-dom";

import styles from "./MovieList.module.css";
import Card from "components/Card/Card";

const imgpath = "https://media.themoviedb.org/t/p/w200";

const MovieList = ({ movies = [] }) => {
  const location = useLocation();

  const cardProps = ({ id, title, poster_path }) => ({
    id,
    title,
    src: `${imgpath}/${poster_path}`,
  });

  return (
    <ul className={styles.cardSet}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.cardItem}>
          <Link to={`/movies/${movie.id}`} state={{ ...location }}>
            <Card className={styles.card} {...cardProps(movie)} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
