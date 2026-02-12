import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesParams {
  query: string;
}

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(
  params: FetchMoviesParams
): Promise<FetchMoviesResponse> {
  const { query } = params;
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const response = await axios.get<FetchMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

