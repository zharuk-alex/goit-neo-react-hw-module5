import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovie } from "api/tmdb";
import SearchInput from "components/SearchInput/SearchInput";
import PageLayout from "components/PageLayout/PageLayout";
import MovieList from "components/MovieList/MovieList";
import Pagination from "components/Pagination/Pagination";
import Alert from "components/Alert/Alert";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [emptyResult, setEmptyResult] = useState(false);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });

  const searchValue = searchParams.get("query") || "";

  const handleSubmitSearch = (value) => {
    setPagination({
      ...pagination,
      page: 1,
    });
    setSearchParams({ ...searchParams, query: value });
    setMovies([]);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ query: searchValue, page: newPage });
    setPagination({
      ...pagination,
      page: newPage,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await searchMovie({
          query: searchValue,
          page: pagination.page,
        });

        const { results = [], page, total_pages: total } = result;
        setMovies(results);
        setPagination({
          ...pagination,
          total,
        });

        setEmptyResult(!results?.length);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setEmptyResult(false);
        }, 5000);
      }
    };

    if (searchValue) {
      fetchData();
    }
  }, [searchValue, pagination.page]);

  return (
    <PageLayout>
      <SearchInput value={searchValue} onSubmit={handleSubmitSearch} />
      {!!movies.length ? (
        <>
          <MovieList movies={movies} />
          {pagination.total > 1 && (
            <Pagination {...pagination} onChange={handlePageChange} />
          )}
        </>
      ) : (
        emptyResult && <Alert>No movies found!</Alert>
      )}
      {!!error && (
        <Alert>
          <div>Ups, something went wrong!</div>
          <Link to="/">visit main page</Link>
        </Alert>
      )}
    </PageLayout>
  );
}

export default MoviesPage;
