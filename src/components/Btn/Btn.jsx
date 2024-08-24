import clsx from "clsx";
import styles from "./Btn.module.css";

const Btn = ({
  size = "md",
  variant = "default",
  onClick,
  className,
  children,
}) => {
  return (
    <button
      className={clsx(styles[size], styles[variant], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Btn;
