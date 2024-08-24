import styles from "./Loader.module.css";
import { Oval } from "react-loader-spinner";

const Loader = ({ visible = true }) => (
  <Oval
    visible={visible}
    height="100"
    width="100"
    color="rgba(39, 1, 255, 0.5)"
    secondaryColor="rgb(39, 1, 255)"
    ariaLabel="oval-loading"
    wrapperClass={styles.loaderWrapper}
    strokeWidth="4"
  />
);

export default Loader;
