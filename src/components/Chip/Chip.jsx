import styles from "./Chip.module.css";

const Chip = ({ children, variant = "default" }) => {
  return <div className={styles[variant]}>{children}</div>;
};

export default Chip;
