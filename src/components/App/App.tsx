import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieModal from "../../components/MovieModal/MovieModal";
import toast, {Toaster} from "react-hot-toast";


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchMovies({ query });
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(data.results);
    } catch (err) {
      setError("Не вдалося завантажити фільми");
    } finally {
      setLoading(false);
    }
  };
    

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
   {loading && <Loader />}
{error ? (
  <ErrorMessage message={error} />
) : (
  <MovieGrid movies={movies} onSelect={setSelectedMovie} />
)}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />

        )}
    </div>
 );
}

