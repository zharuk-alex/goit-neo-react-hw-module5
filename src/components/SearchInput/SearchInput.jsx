import { MdOutlineSearch } from "react-icons/md";
import Btn from "components/Btn/Btn";
import styles from "./SearchInput.module.css";
import { useEffect, useState } from "react";

const errorMsgText = "Field is empty!";

const SearchInput = ({ onSubmit }) => {
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { search: { value = "" } = {} } = evt.target?.elements;
    if (!value.trim()) {
      setErrorMsg(errorMsgText);
      return;
    }

    onSubmit(value.trim());
    evt.target.reset();
  };

  useEffect(() => {
    setTimeout(() => setErrorMsg(""), 3000);
  }, [errorMsg]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formControl}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="search"
            placeholder="Search movie"
            onChange={() => setErrorMsg("")}
          />
          <Btn type="submit" className={styles.formGroupBtn}>
            <MdOutlineSearch />
          </Btn>
        </div>
        {!!errorMsg && <div className={styles.inputError}>{errorMsg}</div>}
      </div>
    </form>
  );
};

export default SearchInput;
