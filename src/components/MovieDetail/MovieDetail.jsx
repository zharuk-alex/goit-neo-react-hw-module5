import { NavLink, Outlet } from "react-router-dom";
import { formatDate } from "helpers/formatDate";
import clsx from "clsx";

import styles from "./MovieDetail.module.css";
import Chip from "components/Chip/Chip";

const roundFloat = (value) => parseFloat(Number(value).toFixed(1));

const MovieDetail = ({
  src,
  title,
  description,
  releaseDate,
  scores,
  chips = [],
}) => {
  const linkClass = ({ isActive }) =>
    clsx(styles.link, isActive && styles.active);

  return (
    <>
      <div className={styles.wrapper}>
        <img className={styles.posterBlock} src={src} alt={title} />
        <div className={styles.infoBlock}>
          <h2>{title}</h2>
          <p>User scores: {roundFloat(scores)}</p>
          <div>
            <h3>Overview</h3>
            <p>{description}</p>
          </div>
          <div>
            <h3>Genres</h3>
            <div className={styles.geners}>
              {chips?.length &&
                chips.map(({ id, name }) => <Chip key={id}>{name}</Chip>)}
            </div>
          </div>
          <p>Release date: {formatDate(releaseDate)}</p>
        </div>
      </div>

      <div className={styles.addInfoBlock}>
        <h3>Additional Information</h3>
        <ul className={styles.linksSet}>
          <NavLink to="cast" className={linkClass}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={linkClass}>
            Reviews
          </NavLink>
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetail;
