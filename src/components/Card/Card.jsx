import { MdImageNotSupported } from "react-icons/md";
import styles from "./Card.module.css";
import { useState } from "react";

const Card = ({ id, src, title, subtitle }) => {
  const [imgError, setImgError] = useState(0);

  return (
    <div className={styles.card}>
      {imgError === id ? (
        <div className={styles.cardImgError}>
          <MdImageNotSupported />
        </div>
      ) : (
        <img
          className={styles.cardImg}
          src={src}
          alt={title}
          onError={() => setImgError(id)}
          loading="lazy"
        />
      )}
      <div className={styles.cardBody}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

export default Card;
