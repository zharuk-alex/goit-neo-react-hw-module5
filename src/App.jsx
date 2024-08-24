import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import Navigation from "components/Navigation/Navigation";
import "./App.css";
import Loader from "components/Loader/Loader";

const HomePage = lazy(() => import("pages/HomePage"));
const MoviesPage = lazy(() => import("pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));
const MovieCast = lazy(() => import("components/MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("components/MovieReviews/MovieReviews"));

const $routes = [
  { path: "/", element: <HomePage />, title: "Home", isNav: true },
  { path: "/movies", element: <MoviesPage />, title: "Movies", isNav: true },
  {
    path: "/movies/:movieId",
    element: <MovieDetailsPage />,
    children: [
      { path: "cast", element: <MovieCast /> },
      { path: "reviews", element: <MovieReviews /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

function App() {
  const AppRoutes = () => useRoutes($routes);
  const $navLinks = $routes.filter(({ isNav }) => isNav);
  return (
    <>
      <Navigation links={$navLinks} />
      <main>
        <Suspense fallback={<Loader visible={true} />}>
          <AppRoutes />
        </Suspense>
      </main>
    </>
  );
}

export default App;
