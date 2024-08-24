import clsx from "clsx";

const PageLayout = ({ children, className }) => {
  return <div className={clsx("container", className)}>{children}</div>;
};

export default PageLayout;
