import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import styles from "./Pagination.module.css";
import Btn from "components/Btn/Btn";

const Pagination = ({ page, total, isLoading, onChange }) => {
  const handlePrev = () => {
    if (page > 1) {
      onChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < total) {
      onChange(page + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <Btn onClick={handlePrev} disabled={isLoading || page === 1}>
        <MdChevronLeft />
      </Btn>
      <span style={{ margin: "0 10px" }}>
        Page {page} of {total}
      </span>
      <Btn onClick={handleNext} disabled={isLoading || page === total}>
        <MdChevronRight />
      </Btn>
    </div>
  );
};

export default Pagination;
