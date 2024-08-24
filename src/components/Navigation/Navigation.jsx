import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Navigation.module.css";

const Navigation = ({ links = [] }) => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };

  return (
    <header className={styles.header}>
      <nav className={clsx("container", styles.nav)}>
        {links.map(({ path, title }) => (
          <NavLink key={path} to={path} className={buildLinkClass}>
            {title}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navigation;
