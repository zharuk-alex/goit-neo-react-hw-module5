import styles from "css/NotFoundPage.module.css";
import { Link } from "react-router-dom";
import Alert from "components/Alert/Alert";

function NotFoundPage() {
  return (
    <div className="container">
      <Alert>
        <div className={styles.content}>
          <h1>404</h1>
          Page Not Found!
          <Link to="/">visit main page</Link>
        </div>
      </Alert>
    </div>
  );
}

export default NotFoundPage;
