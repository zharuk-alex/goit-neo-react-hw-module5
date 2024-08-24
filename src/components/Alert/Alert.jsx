import clsx from "clsx";
import styles from "./Alert.module.css";

const Alert = ({ text, variant = "", className, children }) => {
  return (
    <div className={clsx(styles.card, variant, className)}>
      {text ?? children}
    </div>
  );
};

export default Alert;
