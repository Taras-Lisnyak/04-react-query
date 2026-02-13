import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieModal from "../../components/MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";


export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    placeholderData: (prevData) => prevData, 
      });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error("No movies found for your request");
    }
  }, [data, query]);
    
  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" />
      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage message={error instanceof Error ? error.message : "Не вдалося завантажити фільми"} />
      )}

      
      {data?.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

            
      {data && (
  <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
)}

              {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />

      )}
    </div>
 );
}
