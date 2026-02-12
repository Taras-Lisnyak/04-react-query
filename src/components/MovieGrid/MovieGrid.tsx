import React from "react";
import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
    if (movies.length === 0) {
        return null;
    }

    return (
        <ul className={styles.grid}>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <div
                        className={styles.card}
                        onClick={() => onSelect(movie)} // обробка кліку
                    >
                        <img
                            className={styles.image}
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : "https://placehold.co/500x750?text=No+Image"

                            }
                            alt={movie.title}
                            loading="lazy"
                        />
                        <h2 className={styles.title}>{movie.title}</h2>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MovieGrid;